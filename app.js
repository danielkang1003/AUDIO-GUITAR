const modelParams = {
     flipHorizontal: true, // flip e.g for video
     imageScaleFactor: 0.7, // reduce input image size for gains in speed.
     maxNumBoxes: 2, // maximum number of boxes to detect
     iouThreshold: 0.5, // ioU threshold for non-max suppression
     scoreThreshold: 0.79 // confidence threshold for predictions.
};

navigator.getUserMedia =
     navigator.getUserMedia || //gen
     navigator.webkitGetUserMedia || //google, safari
     navigator.mozGetUserMedia || //firefox
     navigator.msGetUserMedia; //ms -> explore

//SELECT EVERYTHING FROM HTML
const video = document.querySelector("#video");
const audoi = document.querySelector("#audio");

let model; //from handtrack js that knows how to detect your hands

handTrack.startVideo(video).then(status => {
     if (status) {
          //if true, video is running
          navigator.getUserMedia(
               { video: {} },
               stream => {
                    video.srcObject = stream;
                    //Run our detection
                    setInterval(runDetection, 100);
               },
               err => console.log(err)
          );
     }
});

function runDetection() {
     model.detect(video).then(predictions => {
          //   console.log(predictions);
          if (predictions.length !== 0) {
               //length === 1, hand detected
               //predictions = true
               let hand1 = predictions[0].bbox;
               let x = hand1[0];
               let y = hand1[1];
               //console.log(x);
               if (y > 300) {
                    if (x < 200) {
                         audio.src = "a-chord.mp3";
                    } else if (x > 400) {
                         audio.src = "e-chord.mp3";
                    } else if (x > 300) {
                         audio.src = "c-chord.mp3";
                    } else if (x > 200) {
                         audio.src = "b-chord.mp3";
                    }
               }
               //play the sound
               audio.play();
          }
     });
     //  requestAnimationFrame(runDetection);    //not worth
}

handTrack.load(modelParams).then(lmodel => {
     model = lmodel;
});
