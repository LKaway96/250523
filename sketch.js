let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const leftEye1 = [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112];
const leftEye2 = [133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155];
const rightEye1 = [359, 467, 260, 259, 257, 258, 286, 414, 463, 341, 256, 252, 253, 254, 339, 255];
const rightEye2 = [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];
const mouth = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308];

function setup() {
  createCanvas(640, 480).position((windowWidth - 640) / 2, (windowHeight - 480) / 2);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);

  // Flip the canvas horizontally
  translate(width, 0);
  scale(-1, 1);

  image(video, 0, 0, width, height);

  strokeWeight(5); // Set line thickness to 5px
  noFill();

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // Draw main points
    stroke(255, 0, 0, 127); // Red stroke with 50% transparency
    beginShape();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = keypoints[points[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw left eye (first set)
    fill(255, 0, 0, 127); // Red fill with 50% transparency
    stroke(0, 255, 0, 127); // Green stroke with 50% transparency
    beginShape();
    for (let i = 0; i < leftEye1.length; i++) {
      const [x, y] = keypoints[leftEye1[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw left eye (second set)
    beginShape();
    for (let i = 0; i < leftEye2.length; i++) {
      const [x, y] = keypoints[leftEye2[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw right eye (first set)
    beginShape();
    for (let i = 0; i < rightEye1.length; i++) {
      const [x, y] = keypoints[rightEye1[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw right eye (second set)
    beginShape();
    for (let i = 0; i < rightEye2.length; i++) {
      const [x, y] = keypoints[rightEye2[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw mouth
    fill(255, 255, 0, 127); // Yellow fill with 50% transparency
    stroke(255, 0, 0, 127); // Red stroke with 50% transparency
    beginShape();
    for (let i = 0; i < mouth.length; i++) {
      const [x, y] = keypoints[mouth[i]];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
