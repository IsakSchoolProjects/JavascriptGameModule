function PlayMusic(toggle)
{
    if(toggle) {
        document.getElementById('bg-music').play();
    } else {
        document.getElementById('bg-music').pause();
        document.getElementById('bg-music').currentTime = 0;
    }
}

function ShowTryAgain(toggle)
{
    if(toggle) {
        document.getElementById('dead').classList.remove('invisible');
    } else {
        document.getElementById('dead').classList.add('invisible');
    }
}

function ShowHud(toggle)
{
    if(toggle) {
        document.getElementById("hud").classList.remove("invisible");
    } else {
        document.getElementById("hud").classList.add("invisible");
    }
}

function ShowResetOptions(toggle)
{
    if(toggle) {
        document.getElementById("reset").classList.remove("hidden");
    } else {
        document.getElementById("reset").classList.add("hidden");
    }
}

function ShowPauseButton(toggle)
{
    if(toggle) {
        document.getElementById("pause").classList.remove("invisible");
    } else {
        document.getElementById("pause").classList.add("invisible");
    }
}

function ResetToStart()
{
    ShowHud(false);

    localStorage.setItem('scene', '0');

    RenderScene(0);
}

function ResumeToPreviousScene()
{
    ShowResetOptions(false);

    ShowHud(true);

    document.getElementById('bg-music').play();
    
    ShowPauseButton(true);

    RenderScene(localStorage.getItem('scene'));
}

function Pause()
{
    ShowHud(false);

    player.innerHTML = "";

    ShowResetOptions(true);

    PlayMusic(false);
}

function Die()
{
    // Remove the video so we can show the dead image
    player.innerHTML = "";

    // Render the dead background
    game.style.backgroundImage = "url(./media/img/Dead.jpg)";

    // Show the try again button
    ShowTryAgain(true);

    localStorage.setItem('scene', '0');
    
    PlayMusic(false);
}

/*
//      Utilities
*/

function Random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}