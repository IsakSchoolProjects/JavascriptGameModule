const delay = ms => new Promise(res => setTimeout(res, ms));

let game = document.querySelector("#game");
let player = document.querySelector("#player");
let options = document.querySelector("#hud");

let hasKey = true;

let scenes = [];

(async function() {

    await fetch('./js/scenes.json').then(response => response.json()).then(data => {
        scenes = data;
    });

    RenderScene(0);
})();

async function RenderScene(sceneNumber)
{
    options.innerHTML = "";
    game.style.backgroundImage = "none";

    let scene = scenes[sceneNumber];

    if(scene.video !== null)
    {
        let video = scene.video;

        player.innerHTML = `
        <video id="video" width="100%" height="100%">
            <source src="${video}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        `;

        let videoElement = document.getElementById("video");

        // Video starts playing
        videoElement.play();

        //  Waiting for video to end
        await delay(scene.videoLength);

        if(scene.id === 6 && hasKey) {
            RenderScene(8);
        } else if(scene.id === 6 && !hasKey) {
            RenderScene(7)
        }

        // Video has ended, rendering buttons
        RenderButtons(sceneNumber);
    }
    else if(scene.image !== null)
    {
        // The scene is an image, we clear the player element so it doesn't contain a video
        player.innerHTML = "";

        // Since the scene is an image, we render the image as a background
        game.style.backgroundImage = `url(${scene.image})`;

        // Once the image has been rendered its time to show the options, we render the buttons
        RenderButtons(sceneNumber);
    }
}

function RenderButtons(sceneNumber)
{
    let scene = scenes[sceneNumber];

    // Render death screen
    if(scene.options == null)
    {
        return RenderScene(0);
    }

    // Loop buttons
    for (let i = 0; i < scene.options.length; i++)
    {
        options.innerHTML += `<button onclick="RenderScene(${scene.options[i][1]})" class="option mx-16 text-5xl text-red-700 transform hover:scale-105">${scene.options[i][0]}</button> `
    }
}