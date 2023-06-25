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
    # image = image / 255.0

    return image


def sign_predict(model, image: np.ndarray):
    # Preprocess the image (example: resizing to 32x32 and normalizing pixel values)
    preprocessed_image = preprocess_image(image)

    # Make the prediction
    prediction = model.predict(preprocessed_image)

    # Post-process the prediction (example: finding the class with the highest probability)
    sign_class = np.argmax(prediction)

    return sign_class


app = Flask(__name__)

# load model
model = keras.models.load_model(
    "detection-service\models\mobileNetV2+10.h5", compile=False
)
model.compile()


@app.route("/classify", methods=["POST"])
def classify():
    image_data_base64 = request.json["image"]
    # convert base64 to image
    image = base64_to_image(image_data_base64)

    # show image
    # cv2.imshow("image from base64", image)
    # cv2.waitKey(0)

    # classify image
    sign = sign_predict(model, image)
    print("prediction: ", sign)
    
    return str(sign)


if __name__ == "__main__":
    app.run()
