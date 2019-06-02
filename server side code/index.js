const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
const app = express();
const port = process.env.PORT || 3000;
// const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const { Image, createCanvas } = require('canvas');


app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', async(req, res)=>{
    res.send("Root rout is ok");
});
app.get('/gettest', (req, res)=>{
    res.send("Get test is ok!!");
});
app.post('/upload', (req, res)=>{
    const imgBase = req.body.imageData;
    const h = req.body.imageHeight;
    const w = req.body.imageWidth;
    var preds = classifyImage(w,h,imgBase)
    .then(value =>{
      console.log(value);
      res.send(value);
    })
    .catch(error =>{
      console.log(error);
    })


});




var classifyImage = (async(w,h,imgBase)=>{
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0, w, h)
    img.onerror = err => { throw err }
    img.src = imgBase;

    const model = await mobilenet.load();
 
    // Classify the image.
    const predictions = await model.classify(canvas);
    
    console.log('Predictions: ');
    console.log(predictions[0].className);
    

    var myLog = {
      imageDimension: {width: w, height: h},
      imagedata: imgBase,
      predictionData:  predictions
    }

    return predictions;
    
})




app.listen(port, ()=> console.log(`Listening on port ${port}`));