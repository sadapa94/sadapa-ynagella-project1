import { userInfo } from "../view/elements.js";
import { currentUser } from "./firebase_auth.js";
import { DEV } from "../model/constants.js";
import { updateWindow } from "../view/home_page.js";
import { addFirebaseGameRecord } from "./firestore_controller.js";
import { FirebaseGame } from "../model/firebase_game.js";

let newGamekey=Math.floor(Math.random() * 3);

export async function OnClickNewGame() {
    if (DEV) console.log('OnClickNewGame()');
    // Access the h3 element by its class name
    const h3Element = document.querySelector('.bg-success.text-white');
    // Change the text content of the h3 element
    h3Element.textContent = 'Bet on cards and press [PLAY]';


    const gameKeyValue = document.getElementById('game-key-value');
    if (gameKeyValue) {
        newGamekey=Math.floor(Math.random() * 3);
        gameKeyValue.innerHTML = newGamekey;
    } 

    // Access the buttons and paragraphs by their class names
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    const increaseButtons = document.querySelectorAll('.increase-btn');
    const valueParagraphs = document.querySelectorAll('p.text-center'); // Modify the selector to target only <p class="text-center"> elements

    // Call the updateWindow function to get the balanceValue and currentBetsValue
    const { balanceValue, currentBetsValue } = updateWindow();

    // console.log(balanceValue.innerHTML); // Output: ' 15'
    // console.log(currentBetsValue.innerHTML); // Output: ' 0'

    let sum = 0; // Declare and initialize the sum variable

    // Function to handle the click event for the [+] buttons
    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].onclick = function () {
            console.log('working');
            let value = parseInt(valueParagraphs[i].textContent);
            if (value < parseInt(balanceValue.innerHTML)) { // Check if value is less than the balance
                value++;
                valueParagraphs[i].textContent = value;
                updateCurrentBetsValue(); // Update the current bets value
            }
        };
    }


    // Function to handle the click event for the [-] buttons
    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].onclick = function () {
            let value = parseInt(valueParagraphs[i].textContent);
            if (value > 0) { // Check if value is greater than 0
                value--;
                valueParagraphs[i].textContent = value;
                updateCurrentBetsValue(); // Update the current bets value
            }
        };
    };

    // Function to update the current bets value
    function updateCurrentBetsValue(updatedBalanceValue, totalCoins) {
        // Get all the p.text-center elements
        const pTextCenterElements = document.querySelectorAll('p.text-center');

        // Reset the sum to 0 before calculating the new sum
        let sum = 0;

        // Loop through each p.text-center element
        for (let i = 0; i < pTextCenterElements.length; i++) {
            // Convert the textContent to a number and add it to the sum
            sum += parseInt(pTextCenterElements[i].textContent);
        }

        // Check if the sum is greater than the balance
        if (sum <= parseInt(balanceValue.innerHTML)) {
            // Set the sum as the textContent of currentBetsValue
            currentBetsValue.innerHTML = sum;
            // Enable the increaseButtons
            increaseButtons.forEach(button => {
                button.disabled = false;
            });
        } else {
            // Set the currentBetsValue to the balance
            currentBetsValue.innerHTML = balanceValue.innerHTML;
            // Disable the increaseButtons
            increaseButtons.forEach(button => {
                button.disabled = true;
            });
        }

        // Check if updated balance and current bets are less than or equal to 0
        if (updatedBalanceValue <= 0 || totalCoins <= 0) {
            // Disable both increase and decrease buttons
            increaseButtons.forEach(button => {
                button.disabled = true;
            });
            decreaseButtons.forEach(button => {
                button.disabled = true;
            });
        }
    }

    // In real-time update the current bets values
    updateCurrentBetsValue();

    // console.log(sum); // Output: 0 (initially, since all the values are 0)  

    // Set the sum as the textContent of #current-bets-value
    currentBetsValue.textContent = sum;

    // console.log(currentBetsValue.textContent); // Output: 0

}

export  function onClickPlay(updateCurrentBetsValue) {
    if (DEV) console.log('onClickPlay()');

    console.log('currentBetsValue' + updateCurrentBetsValue);

    const gameKeyValue = document.getElementById('game-key-value');

    // Declare and initialize the gameKeyValue variable
    // window.onload = function(){
    //     try {
    //         toFlipImages();
    //     } catch (error) {
    //         console.log('error flipping images' + error)
    //     }
    // }
    toFlipImages();


    // Now updating the balance value from imageIndex
    // Access all the p.text-center elements
    const valueParagraphs = document.querySelectorAll('p.text-center');


    // Initialize variables to store coins won and lost
    let wonCoins = 0;
    let lostCoins = 0;
    let totalCoins = 0;

    for (let index = 0; index < valueParagraphs.length; index++) {
        const paragraph = valueParagraphs[index];
        const value = parseInt(paragraph.innerHTML);
        console.log("Game key value: " + gameKeyValue);
        console.log("Index: " + index);
        if (index === parseInt(gameKeyValue.innerHTML)) {
            wonCoins = value;
        } else {
            lostCoins += value;
        }
    }

    totalCoins = wonCoins + lostCoins;

    //console.log("Balance Value: "+balanceValue)

    console.log("Won coins: " + wonCoins * 3); // Output: 0, 1, or 2
    console.log("Lost coins: " + lostCoins); // Output: 0, 1, or 2
    console.log("Total coins: " + totalCoins); // Output: 0, 1, 2, or 3

    // Now you have wonCoins and lostCoins with the appropriate values

    // Access the h3 element by its class name
    const h3Element = document.querySelector('.bg-success.text-white');

    h3Element.innerHTML = `You won ${wonCoins * 3} by betting ${totalCoins} coins.<br>Bet on cards and press [PLAY]`;

    // Call the updateWindow function to get the balanceValue
    const { balanceValue } = updateWindow();
    //console.log(balanceValue.innerHTML); // Output: ' 15'
    //console.log(totalCoins); // Output: ' 0'

    // Update the balance value
    balanceValue.innerHTML = (parseInt(balanceValue.innerHTML) + (wonCoins * 3)) - totalCoins;

    const updatedBalanceValue = parseInt(balanceValue.innerHTML);
    console.log("Updated Balance: " + updatedBalanceValue); // Output: 15, 16, 17, 18, 19, or 20



    const playButton = document.getElementById('play');
    if (playButton) {
        // playButton.addEventListener('click', onClickPlay);
        playButton.onclick=()=>{
            console.log("clicked play button");
            onClickPlay;
            
        }
    }

    const newGameButton = document.getElementById('new-game');
    const restartApp = document.getElementById('restart-app');
    if (newGameButton) {
        
        newGameButton.addEventListener('click', RefreshApp(valueParagraphs));


        savePlayerData();
    }

    // now we need to update the balance, coins bet, coins won, timestamp, app restart (true/false), user's email to firestore
    async function savePlayerData() {
        // balance, coins bet, coins won, timestamp, app restart (true/false), user's email

        console.log("updatedBalanceValue: " + updatedBalanceValue);
        console.log("currentBetsValue: " + lostCoins);
        console.log("wonCoins: " + wonCoins);
        console.log("currentUser.email: " + currentUser.email);
        console.log("Date.now(): " + Date.now());

        const balance = updatedBalanceValue;
        const bets = totalCoins; // error
        const email = currentUser.email;
        const restart = false;
        const timestamp = Date.now();
        const won = wonCoins * 3;

        const gameRecord = { email, balance, bets, won, timestamp, restart };

        try {
            await addFirebaseGameRecord(gameRecord);
        }
        catch (err) {
            if (DEV) console.log("Failed to save game Record" + err);
            alert(`Failed to save game record: ${JSON.stringify(err)}`);
        }

    }

    /* // Add an event listener to the new game button if it exists
    const newGameButton = document.getElementById('new-game');
    if (newGameButton) {
        newGameButton.addEventListener('click', RefreshApp());

        newGameButton.onclick = RefreshApp();
        // Reset the p.text-center elements
        valueParagraphs.forEach(element => {
            element.textContent = '0';
        });
        // Reset the image sources
        imgElements.forEach(img => {
            img.src = '../images/joker.png';
        });
        // Reset the current bets value
        const currentBetsValue = document.getElementById('current-bets-value');
        if (currentBetsValue) {
            currentBetsValue.innerHTML = '0';
        }
    } */
}

async function toFlipImages() {
    

    // Declare and initialize the gameKeyValue variable
    //const gameKeyValue = document.getElementById('game-key-value');

    // image flip logic
    // get the game key
    //console.log(gameKeyValue.innerHTML);
    // import images from "./public/images/"

    // Get all the img elements on the page
    let imgElements = document.querySelectorAll('img');
    const firebaseimgsrc = "/images/firebase.png";

    if (onClickPlay) {
        if (imgElements) {
            const imageIndex = newGamekey;
            console.log("ImgElements" + imgElements.length);
            console.log("ImageIndex " + imageIndex);
            imgElements[imageIndex].src = firebaseimgsrc;
            console.log(imgElements[imageIndex]);
            if (imageIndex >= 0 && imageIndex < imgElements.length) {
                // Set the image source at the imageIndex to '../images/firebase.png'
                imgElements[imageIndex].src = firebaseimgsrc;
                // Set the image source of all other images to '../images/blank.png'
                for (let index = 0; index < imgElements.length; index++) {
                    let img = imgElements[index];
                    if (index !=imageIndex) {
                        //console.log(img.src);
                        console.log(imageIndex);
                        console.log("below is the non indexes")
                        console.log(img);
                        img.src = './images/blank.png';
                        document.querySelectorAll('img')[index].src="/images/blank.png";
                        console.log("after change");
                        console.log(img);
                        //console.log(img.src);
                    }
                }
            }
        }
    }

}




export  function RefreshApp(valueParagraphs) {

    if (DEV) console.log('RefreshApp()');

    // Get the necessary elements
    const balanceValue = document.getElementById('balance-value');
    const gameKeyValue = document.getElementById('game-key-value');
    const pTextCenterElements = document.querySelectorAll('p.text-center');
    const imgElements = document.querySelectorAll('img');

    /* // Reset the balance value
    if (balanceValue) {
        balanceValue.innerHTML = '15';
    } */

    // Reset the game key value
    if (gameKeyValue) {
        gameKeyValue.innerHTML = '0';
    }

    // Reset the p.text-center elements
    valueParagraphs.forEach(element => {
        element.textContent = '0';
    });

    // Reset the image sources
    imgElements.forEach(img => {
        img.src = '/images/joker.png';
        console.log("frst")
    });

    // Reset the current bets value
    const currentBetsValue = document.getElementById('current-bets-value');
    if (currentBetsValue) {
        currentBetsValue.innerHTML = '0';
    }

    // Call the updateWindow function to update the UI
    updateWindow();

}

export async function OnClickRestartApp() {
    // complete reset of the game
    // reset the balance to 15
    // reset the current bets to 0
    // simply call the updateWindow function

    if (DEV) console.log('OnClickRestartApp()');

    // now we need to update the balance, coins bet, coins won, timestamp, app restart (true/false), user's email to firestore
    const restartApp = document.getElementById('restart-app');
    if (restartApp) {
        SaveRestartData();
    }

    async function SaveRestartData() {
        // balance, coins bet, coins won, timestamp, app restart (true/false), user's email

        console.log("SaveRestartData")

        const balance = 15;
        const bets = 'App restart'; // error
        const email = currentUser.email;
        const restart = true;
        const timestamp = Date.now();
        const won = '';

        const gameRecord = { email, balance, bets, won, timestamp, restart };

        try {
            await addFirebaseGameRecord(gameRecord);
        }
        catch (err) {
            if (DEV) console.log("Failed to save game Record" + err);
            alert(`Failed to save game record: ${JSON.stringify(err)}`);
        }

    }


    // Get the necessary elements
    const balanceValue = document.getElementById('balance-value');
    const gameKeyValue = document.getElementById('game-key-value');
    const pTextCenterElements = document.querySelectorAll('p.text-center');
    const imgElements = document.querySelectorAll('img');

    // Reset the balance value
    if (balanceValue) {
        balanceValue.innerHTML = '15';
    }

    // Reset the game key value
    if (gameKeyValue) {
        gameKeyValue.innerHTML = '0';
    }

    // Reset the p.text-center elements
    pTextCenterElements.forEach(element => {
        element.textContent = '0';
    });

    // Reset the image sources
    imgElements.forEach(img => {
        img.src = '/images/joker.png';
        console.log("scd");
    });

    // Reset the current bets value
    const currentBetsValue = document.getElementById('current-bets-value');
    if (currentBetsValue) {
        currentBetsValue.innerHTML = '0';
    }

    // clear the console
    console.clear();

    // Call the updateWindow function to update the UI
    updateWindow();

}