import base64
import io

import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request
from imageio import imread
from tensorflow import keras


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


def preprocess_image(image: np.ndarray) -> np.ndarray:
    # # Resize the input image to the pre-trained model input size
    image = cv2.resize(image, (224, 224))

    # # Convert the input image to the shape the model expects
    image = image.reshape((1, 224, 224, 3))

    # # Normalize the input image
    scaled = (image / np.max(image)).astype("float")

    return scaled


def sign_predict(model, image: np.ndarray):
    # Preprocess the image (example: resizing to 32x32 and normalizing pixel values)
    preprocessed_image = preprocess_image(image)

    # Make the prediction
    prediction = model.predict(preprocessed_image)

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
    



app = Flask(__name__)

# load model
model = keras.models.load_model(
    "detection-service\models\mobileNetV2+10.h5", compile=False
)
model.compile()


@app.route("/api/classify", methods=["POST"])
def classify():
    image_data_base64 = request.json["image"]
    # convert base64 to image
    image = base64_to_image(image_data_base64)

    # show image
    # cv2.imshow("image from base64", image)
    # cv2.waitKey(0)

    # classify image
    pred, probability = sign_predict(model, image)
    pred_letter = number_to_letter(pred)
    print(f"prediction: {pred} ({probability}%) - {pred_letter}")
    return pred_letter


if __name__ == "__main__":
    app.run()
