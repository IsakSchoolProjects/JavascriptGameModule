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

    RenderScene(6);
})();

async function RenderScene(sceneNumber)
{
    options.innerHTML = "";
    game.style.backgroundImage = "none";

    let scene = scenes[sceneNumber];

    if(scene.video !== null)
    {
        let video = scene.video;

        // // Key mechanism 
        // if(scene.id === 7 && hasKey) {
        //     video = scene.video[1];
        // } else if(scene.id === 7 && !hasKey) {
        //     video = scene.video[0];
        // } else {
        //     video = scene.video;
        // }

        player.innerHTML = `
        <video id="video" width="100%" height="100%">
            <source src="${video}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        `;

        video = document.getElementById("video");

        // Video starts playing
        video.play();

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
        player.innerHTML = "";

        game.style.backgroundImage = `url(${scene.image})`;

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
        options.innerHTML += `<button onclick="RenderScene(${scene.options[i][1]})" class="bg-gray-200 border-2 border-gray-400 shadow-lg rounded-md px-3 py-2 mx-12 transform hover:scale-105">${scene.options[i][0]}</button> `
    }
}