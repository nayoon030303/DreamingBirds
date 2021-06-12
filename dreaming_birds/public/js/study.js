// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/g1PdVKZIH/";

let model, webcam, labelContainer, maxPredictions;

let second = 0;

let status = "basic";
let basic = false, focus_out = false, phone = false, leave = false;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

    timer();
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    
    if (prediction[0].probability >= 0.85) {
        status = prediction[0].className;
    } else if (prediction[1].probability >= 0.85) {
        status = prediction[1].className;
    } else if (prediction[2].probability >= 0.85) {
        status = prediction[2].className;
    } else if (prediction[3].probability >= 0.85) {
        status = prediction[3].className;
    }
    document.getElementById("test").innerHTML = status;
}

function timer() {
    var time;

    time = setInterval(function () {
        if(status == "focus_out" || status == "phone" || status == "leave") {
            second++;
        } else {
            second = 0;
        }

        document.getElementById("stopwatch").innerHTML = "딴 짓을 한 시간 : " + second + "초";

        if(second >= 5) {
            if(status == "focus_out") {
                document.getElementById("time").innerHTML = "공부에 집중하세요";
            } else if(status == "phone") {
                document.getElementById("time").innerHTML = "핸드폰 하지 마세요";
            } else if(status == "leave") {
                document.getElementById("time").innerHTML = "자리로 돌아오세요";
            }
            second = 0;
        } else {
            document.getElementById("time").innerHTML = "";
        }
    }, 1000);
}

init();