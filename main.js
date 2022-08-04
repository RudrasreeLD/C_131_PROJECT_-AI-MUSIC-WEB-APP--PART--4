ON_MY_WAY_song2 = "";
THE_SPECTRE_song1 = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";
song1_status = "";
song2_status = "";

function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function preload() {
    ON_MY_WAY_song2 = loadSound("ON MY WAY.mp3");
    THE_SPECTRE_song1 = loadSound("THE SPECTRE.mp3");
}

function draw() {
    image(video, 0, 0, 600, 530);

    song1_status = THE_SPECTRE_song1.isPlaying();
    song2_status = ON_MY_WAY_song2.isPlaying();
    console.log(song_name);

    if (scoreleftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20);
        ON_MY_WAY_song2.stop();
        if (song1_status == false) {
            THE_SPECTRE_song1.play();
            document.getElementById("song_id").innerHTML = "Song Name: THE SPECTRE";
        }
    }
    if (scorerightWrist > 0.2) {
        circle(rightWrist_x, rightWrist_y, 20);
        THE_SPECTRE_song1.stop();
        if (song2_status == false) {
            ON_MY_WAY_song2.play();
            document.getElementById("song_id").innerHTML = "Song Name: ON MY WAY";
        }
    }
}

function modelLoaded() {
    console.log("poseNet Is Initialized");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        scorerighttWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
}