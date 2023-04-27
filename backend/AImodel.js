const tf = require('@tensorflow/tfjs-node');


async function load_model(){
    const model = await tf.loadLayersModel('/home/daniel/sign-language-webapp/backend/best.h5');
}