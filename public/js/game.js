const delay = ms => new Promise(res => setTimeout(res, ms));

let game = document.querySelector("#game");
let player = document.querySelector("#player");
let hud = document.querySelector("#hud");

let currentScene = 0;

let scenes = [
    {
        id: 0,
        image: './media/img/Scene_1.jpg',
        video: null,
        options: ['left', 'right'],
        hp: 100,
        next: 1,
    },
    {
        id: 1,
        image: 'https://i.imgur.com/Lnhfx0x.jpg',
        video: './media/video/Scene_1.mp4',
        options: ['left', 'right'],
        hp: 100,
    },
];

(async function() {
    RenderScene(scenes[0]);
})();

function PreRender(id)
{
    currentScene = id;

    RenderScene(scenes[currentScene]);

    hud.style.visibility = 'hidden';
}

async function RenderScene(scene)
{
    if(scene.video == null)
    {
        AddImage(scene.image, scene);
    }
    else
    {
        AddVideo(player, scene)
    }
}

function DisplayHud(scene)
{
    console.log(scene);

    for (let i = 0; i < scene.options.length; i++)
    {
        hud.innerHTML += `<button id="${i + 1}" onclick="PreRender(this.id)" class="bg-gray-200 border-2 border-gray-400 shadow-lg rounded-md px-3 py-2 mx-12 transform hover:scale-105">${scene.options[i]}</button> `
    }

    hud.style.visibility = 'visible';
}

async function AddVideo(player, scene)
{
    player.innerHTML += `
    <video id="video" width="100%" height="100%">
        <source src="${scene.video}" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>
    `;

    let video = document.getElementById("video");
    let duration = 0;

    video.addEventListener('loadedmetadata', function () {
        duration = video.duration;
    });

    video.play();

    await delay((video.duration * 1000) + 750);

    DisplayHud(scene);
}

function AddImage(image, scene)
{
    game.style.backgroundImage = `url(${image})`;

    DisplayHud(scene);
}