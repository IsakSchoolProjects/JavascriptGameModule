const delay = ms => new Promise(res => setTimeout(res, ms));

let currentScene = 0;

let game = document.querySelector("#game");
let player = document.querySelector("#player");
let hud = document.querySelector("#hud");

let scenes = [
    {
        id: 0,
        image: './media/img/Scene_1.jpg',
        video: null,
        videoLength: null,
        options: [['left', 1], ['right', 0]],
        hp: 100,
    },
    {
        id: 1,
        image: null,
        video: './media/video/Scene_1.mp4',
        videoLength: 5000,
        options: [['forward', 2], ['enter toilet', 3]],
        hp: 100,
        next: 2,
    },
    {
        id: 2,
        image: null,
        video: './media/video/Scene_2.mp4',
        videoLength: 5000,
        options: [['check window', 5], ['down stairs', 6]],
        hp: 100,
    },
    {
        id: 3,
        image: null,
        video: './media/video/Scene_3.mp4',
        videoLength: 5000,
        options: [['leave', 2], ['take key', 0]],
        hp: 100,
    },
    {
        id: 4,
        image: null,
        video: './media/video/Scene_4.mp4',
        videoLength: 5000,
        options: [['forward', 2], ['stop', 0]],
        hp: 100,
    },
    {
        id: 5,
        image: null,
        video: './media/video/Scene_5.mp4',
        videoLength: 5000,
        options: null,
        hp: 100,
    },
    {
        id: 6,
        image: null,
        video: './media/video/Scene_6.mp4',
        videoLength: 5000,
        options: 1,
        hp: 100,
    },
];

(async function() {
    
    RenderScene(currentScene);




})();

async function RenderScene(sceneNumber)
{
    hud.innerHTML = "";

    let scene = scenes[sceneNumber];

    if(scene.video !== null)
    {
        player.innerHTML = `
        <video id="video" width="100%" height="100%">
            <source src="${scene.video}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        `;

        let video = document.getElementById("video");

        video.play();

        console.log('The video that is playing is', scene.video);

        await delay(scene.videoLength);

        RenderButtons(sceneNumber);
    }
    else if(scene.image !== null)
    {
        player.innerHTML = "";

        game.style.backgroundImage = `url(${scene.image})`;

        RenderButtons(sceneNumber);
    }
}

function PreRender(sceneNumber)
{
    console.log('PreRender gets param', sceneNumber);

    currentScene = sceneNumber;

    RenderScene(currentScene);
}

function RenderButtons(sceneNumber)
{
    let scene = scenes[sceneNumber];

    if(scene.options == null)
    {
        return PreRender(0);
    }

    for (let i = 0; i < scene.options.length; i++)
    {
        hud.innerHTML += `<button onclick="PreRender(${scene.options[i][1]})" class="bg-gray-200 border-2 border-gray-400 shadow-lg rounded-md px-3 py-2 mx-12 transform hover:scale-105">${scene.options[i][0]}</button> `
    }
}