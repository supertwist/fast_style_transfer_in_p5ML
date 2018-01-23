let net
let inputImg
let outputImgData
let img
let styles = ["wave", "la_muse", "rain_princess", "scream", "udnie", "wreck"]

function setup() {
  createCanvas(252, 252).parent('outputContainer')
  //upload button
  let uploadBtn = createFileInput(uploadImage).id('uploadBtn')
  uploadBtn.position(150, 400)
}

function modelLoaded() {
  outputImgData = net.predict(img.elt);
  renderToCanvas(outputImgData);
}

function applyStyle(typeNum) {
  net = new p5ml.TransformNet(modelLoaded, 'wave', 'models/' + styles[typeNum] + "/");  
}

// upload image
function uploadImage(file){
    if (file.type === 'image') { 
        img = createImg(file.data)
        img.parent('canvasContainer')
        img.width = 300;
        img.height = 300;
        image(img, 0, 0);
    }
 }

// render image
function renderToCanvas(outputImgData) {
  const data = outputImgData.dataSync();
  let k = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      k = (i + j * height) * 3;
      let r = Math.round(255 * data[k + 0]);
      let g = Math.round(255 * data[k + 1]);
      let b = Math.round(255 * data[k + 2]);
      let c = color(r, g, b);
      set(i, j, c);
    }
  }
  updatePixels();
}