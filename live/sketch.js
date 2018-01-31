let net;
let outputImgData;
let outputImg;
let outputImgContainer;
let video;
let modelReady = false;
let startPredict = false;
let styles = ["wave", "la_muse", "rain_princess", "scream", "udnie", "wreck", "khalo"]
let artists = ["Katsushika Hokusai", "Pablo Picasso", "Leonid Afremov", "Edvard Munch", "Francis Picabia", "J.M.W. Turner"]
let textInfo, styleInfo
//let firstTime = false;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(200, 200);
  video.hide();
  //net = new p5ml.TransformNet('models/rain_princess', modelLoaded);
  outputImgContainer = createImg('images/input.jpg', 'image');
  outputImgContainer.parent('outputContainer');
  textInfo = createDiv('Style Transfer Mirror!');
  textInfo.parent('#textInfo');
  styleInfo = createSpan('...'); 
  styleInfo.parent('#styleInfo'); 
}

function draw() {
  //console.log(startPredict + " : " + modelReady);
  if(!startPredict && modelReady) {
    setTimeout(()=>{
      startPredict = true;
    }, 3000)
  }

  if (startPredict && modelReady) {
    console.log("predict");
    predict();
  }
}


function getModel(typeNum) {
  setTimeout(() => {
    net = new p5ml.TransformNet('models/' + styles[typeNum], modelLoaded);
    startPredict = !startPredict
  }, 10000);
  
}

function modelLoaded() {
  console.log('model loaded');
  modelReady = true;
}

function applyStyle(typeNum) {
  startPredict = !startPredict;
  getModel(typeNum);
}

function predict() {
  outputImgData = net.predict(video.elt);
  outputImg = p5ml.array3DToImage(outputImgData);
  outputImgContainer.elt.src = outputImg.src;
}
