const delay = ms => new Promise(res => setTimeout(res, ms));

let media = './media/';
let game = document.querySelector("#game");
let player = document.querySelector("#player");
let buttons = document.querySelector("#buttons");

let scenes = [
    {
        id: 1,
        image: media + 'img/Scene_1.jpg',
        options: ['l', 'r'],
        video: media + 'video/Scene_1.mp4',
        hp: 100,
    },
];

console.log(game.style);


(async function() {
    buttons.style.visibility = 'hidden';

    game.style.backgroundImage = `url(${scenes[0].image}`;

    await delay(5000);

    console.log("Play video...");

    player.innerHTML += `
    <video id="video" width="100%" height="100%">
        <source src="${scenes[0].video}" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>
    `;

    let video = document.getElementById("video");
    let duration = 0;

    video.addEventListener('loadedmetadata', function () {
        DisplayButtons(video)
    });

    await delay(2500)

    console.log(duration);

    buttons.style.visibility = 'visible';
})()

async function DisplayButtons(video)
{
    
}