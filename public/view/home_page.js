import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { OnClickNewGame, OnClickRestartApp, onClickPlay } from "../controller/home_controller.js";

export const images = {
    joker: './view/images/joker.png',
    blank: './view/images/blank.png',
    firebase: './view/images/firebase.png',
}

let updateEnabled = false;

export async function homePageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }
    const response = await fetch('./view/templates/home_page_template.html',
        { cache: 'no-store' });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    const newGame = divWrapper.querySelector('#new-game');
    newGame.onclick = function () {
        updateEnabled = true; // Enable updateWindow() function
        OnClickNewGame();
    };

    root.innerHTML = '';
    root.appendChild(divWrapper);
}

export function updateWindow() {
    if (!updateEnabled) return; // Return early if updateWindow is not enabled

    const balanceValue = document.getElementById('balance-value');
    const currentBetsValue = document.getElementById('current-bets-value');
    if (currentBetsValue) {
        currentBetsValue.innerHTML = ' 0';
    }

    const play = document.getElementById('play');
    if (play) {
        play.onclick = onClickPlay;
        // Get all the img elements on the page
        const imgElements = document.querySelectorAll('img');
        const firebaseimgsrc = "../images/firebase.png";

    }

    const restartApp = document.getElementById('restart-app');
    if (restartApp) {
        restartApp.onclick = OnClickRestartApp;
    }

    return { balanceValue, currentBetsValue }; // Return balanceValue and currentBetsValue as an object
}
