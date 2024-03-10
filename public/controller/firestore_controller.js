import {
    getFirestore, collection, addDoc, query, where, orderBy, getDocs, deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { app } from "./firebase_core.js";
import { OnClickRestartApp } from "./home_controller.js";


const FireBaseGameCollection = 'firebase_game';
const db = getFirestore(app);

export async function addFirebaseGameRecord(gameRecord) {
    // gameRecord = {email, balance, bets, coinsWon, timestamp, restart}
    await addDoc(collection(db, FireBaseGameCollection), gameRecord);
}

export async function getAllGameRecords(email) {
    let history = [];
    const q = query(
        collection(db, FireBaseGameCollection),
        where('email', '==', email),
        orderBy('timestamp', 'desc'),
    );

    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        const { email, balance, bets, won, timestamp, restart } = doc.data();
        history.push({ email, balance, bets, won, timestamp, restart });
    });
    return history;
}

export async function clearPlayHistory() {
    // Confirm with the user before proceeding to delete
    const confirmation = confirm("Are you sure you want to clear your play history?");
    if (!confirmation) {
        return; // If user cancels, exit the function
    }

    try {
        // Query all documents in the 'firebase_game' collection
        const querySnapshot = query(collection(db, FireBaseGameCollection));

        // Iterate over each document and delete it
        const snapShot = await getDocs(querySnapshot);
        snapShot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        console.log('Play history cleared successfully.');
    } catch (error) {
        console.error('Error clearing play history:', error);
    }
}