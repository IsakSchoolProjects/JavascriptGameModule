const delay = ms => new Promise(res => setTimeout(res, ms));

let game = document.querySelector("#game");
let player = document.querySelector("#player");
let options = document.querySelector("#options");
let hp = document.getElementById("playerHp");
let keyElement = document.getElementById("key");
let sodaElement = document.getElementById("soda");

let hasKey = false;
let hasSoda = false;
let currentHp = 100;

let scenes = [];

(async function() {

    await fetch('./js/scenes.json').then(response => response.json()).then(data => {
        scenes = data;
    });

    // If the player has a scene on going, we pause the game, and let the player choose to resume/reset. 
    if(localStorage.getItem('scene') === null || localStorage.getItem('scene') === "0")
    {
        RenderScene(0);
    }
    else
    {
        Pause();
    }
})();

async function RenderScene(sceneNumber)
{
    // Clear elements from old scene
    options.innerHTML = "";
    game.style.backgroundImage = "none";

    // Ready for a new scene
    let scene = scenes[sceneNumber];
    
    if(scene.id === 0)
    {
        currentHp = 100;
        hasKey = false;
        hasSoda = false;

        keyElement.classList.add("invisible");
        sodaElement.classList.add("invisible");

        ShowResetOptions(false);
        ShowTryAgain(false);
        ShowHud(false);
    }
    else if(scene.id !== 0)
    {
        localStorage.setItem('scene', scene.id);

        ShowHud(true);

        ShowPauseButton(true);
    }

    // PLay sound after first scenes
    if(scene.id === 1 || scene.id === 13)
    {
        PlayMusic(true);
    }

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

        if(scene.id === 6)
        {
            hasKey = true;
        }
        else if(scene.id === 18)
        {
            hasSoda = true;
        }
        // If the player has the key the key icon is visible.
        if(hasKey)
        {
            keyElement.classList.remove("invisible");
        }
        
        // If the player pick up the soda the icon is visible.
        if(hasSoda)
        {
            sodaElement.classList.remove("invisible");
        }

        // if the scenes are damaging get a value from 1-100 and update the hp
        if(scene.hp !== null)
        {
            if(scene.hp[0])
            {
                currentHp += Random(scene.hp[1], scene.hp[2]);
            } 
            else if(!scene.hp[0])
            {
                currentHp -= Random(scene.hp[1], scene.hp[2]);
            }

            hp.innerHTML = `${currentHp} HP`;
        }

        
        // Video has ended, rendering buttons
        RenderButtons(sceneNumber);

        if(currentHp === 0)
        {
            Die();
        }

        hp.innerHTML = `${currentHp} HP`;
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
        return currentHp = 0;
    }

    let nextScene = 0;
    
    // Loop buttons
    for (let i = 0; i < scene.options.length; i++)
    {
        nextScene = 0;

        if(i == 1 && (scene.id === 2 || scene.id === 7))    
        {
            if(hasKey) {
                nextScene = 8;
            } else{
                nextScene = 9;
            }
        }
        else
        {
            nextScene = scene.options[i][1]
        }

        options.innerHTML += '<button onclick="RenderScene(' + nextScene + ')" class="option mx-16 text-5xl text-red-700 transform hover:scale-105">' + scene.options[i][0] + '</button>';
    }
}