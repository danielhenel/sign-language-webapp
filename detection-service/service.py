import base64
import io

import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request
from imageio import imread
from tensorflow import keras
from database import users, records, User, Record

from hand_truncation import HandSearch


def base64_to_image(base64_string: str) -> np.ndarray:
    # convert string of image data to uint8
    image = imread(io.BytesIO(base64.b64decode(base64_string)))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image


def load_model(model_path: str):
    # Load the model
    model = tf.keras.models.load_model(model_path)

    # Return the loaded model
    return model


def detect_hand(image: np.ndarray, debug=False):
    hand_search = HandSearch()
    hand_image = hand_search.get_hand_image(image, debug=debug)
    return hand_image


def preprocess_image(image: np.ndarray) -> np.ndarray:
    # # Resize the input image to the pre-trained model input size
    image = cv2.resize(image, (224, 224))

    # # Normalize the input image
    scaled = (image / np.max(image)).astype("float")

    # # Convert the input image to the shape the model expects
    scaled = scaled.reshape((1, 224, 224, 3))

    return scaled


def sign_predict(model, image: np.ndarray):
    # Make the prediction
    prediction = model.predict(image)

    # Post-process the prediction (example: finding the class with the highest probability)
    sign_class = np.argmax(prediction)
    probabiltiy = np.max(prediction)

    return sign_class, probabiltiy


def number_to_letter(number):
    labels = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
        'V', 'W', 'X', 'Y', 'Z', 'del', 'nothing', 'space'
    ]

    if 0 <= number < len(labels):
        return labels[number]
    else:
        return 'unknown'
    

# initialize our Flask application and the Keras model
app = Flask(__name__)

# load model
model = keras.models.load_model(
    "models/mobileNetV2+10.h5", compile=False
)
model.compile()


@app.route("/api/classify", methods=["POST"])
def classify():
    image_data_base64 = request.json["image"]
    # convert base64 to image
    image = base64_to_image(image_data_base64)

    # detect hand in image
    image = detect_hand(image, debug=False)

    # # show image
    # cv2.imshow("image from base64", image)
    # cv2.waitKey(0)

    # preprocess the image
    preprocessed_image = preprocess_image(image)

    # classify image
    pred, probability = sign_predict(model, preprocessed_image)
    pred_letter = number_to_letter(pred)
    print(f"prediction: {pred} ({probability}%) - {pred_letter}")
    
    return {"letter": pred_letter, "confidence": str(probability)}


@app.route("/api/create/user", methods=["POST"])
def register():
    new_user = User(request.json["username"],request.json["password"], request.json["email"])
    try:
        response = users.insert_one(new_user.to_json())
    except Exception as e:
        print(e)
        return { "acknowledged" : False, "error" : "The username is taken by another user"} 
    return { "acknowledged" : response.acknowledged } 


@app.route("/api/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    user = users.find({"_id" : username})
    user = next(user, None)
    if user:
        if password == user["password"]:
            return { "acknowledged" : True, "msg" : "Login successful."} 
        else:
            return { "acknowledged" : False, "msg" : "Wrong password. Try again."} 
    else:
        return { "acknowledged" : False, "msg" : "The user does not exist."} 

if __name__ == "__main__":
    app.run()
