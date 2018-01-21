/*
===
Fast Style Transfer Webcam test
===
*/

let net
let outputImgData
let styles = ["wave", "la_muse", "rain_princess", "scream", "udnie", "wreck"]
let video

function setup() {
  createCanvas(300, 300).parent('outputContainer')
  video = createCapture(VIDEO)
  video.size(300,300)
  video.parent('canvasContainer')
  //video.hide()
}

function modelLoaded() {
  outputImgData = net.predict(video.elt);
  renderToCanvas(outputImgData)
}

/*
  @param typeNum: style number
   0 wave
   1 la_muse
   2 rain_princess
   3 scream
   4 udnie
   5 wrecl
*/
function applyStyle(typeNum) {
   net = new p5ml.TransformNet(modelLoaded, 'wave', 'models/' + styles[typeNum] + "/");  
}

// render image
function renderToCanvas(outputImgData) {
  const data = outputImgData.dataSync();
  let k = 0;
  loadPixels();
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
