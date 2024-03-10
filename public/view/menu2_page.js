import { root } from "./elements.js"
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { DEV } from "../model/constants.js";
import { getAllGameRecords } from "../controller/firestore_controller.js";
import { clearPlayHistory } from "../controller/firestore_controller.js";

export async function Menu2PageView(){
    if(!currentUser){
        root.innerHTML = await protectedView();
        return;
    }
    root.innerHTML = '<h1>Game Play History Records</h1>';
    const response = await fetch('./view/templates/gamerecord_page_template.html',
    {cache: 'no-store'});
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');
    root.innerHTML = '';
    root.appendChild(divWrapper);


    let gameRecords;
    try {
        gameRecords = await getAllGameRecords(currentUser.email);
    } catch (e) {
        if (DEV) console.log('Failed to get game records', e);
        alert(`Failed to get game records: ${JSON.stringify(e)}`);
        return;
    }


    const tbody = divWrapper.querySelector('tbody');
    if (gameRecords.length == 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="5" class="text-left fs-3" style="color: red;">No Gameplay history found!</td>
        </tr>
        `;
    }
    else {
        if (gameRecords.length == 0) {
            tbody.innerHTML = `
            <tr>
            <td colspan="5" class="text-left fs-3" style="color: red;">No Gameplay history found!</td>
            </tr>
            `;
        } else {
            for (let i = 0; i < gameRecords.length; i++) {
                const record = gameRecords[i];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>
                ${i + 1}
                <td>
                ${record.bets}
                </td>
                <td>
                ${record.won}
                </td>
                <td>
                ${record.balance}
                <td>
                ${new Date(record.timestamp).toLocaleString()}
                </td>
                `;
                tbody.appendChild(tr);
            }
        }
    }

    function renderGameRecords(gameRecords, divWrapper) {
        const tbody = divWrapper.querySelector('tbody');
        tbody.innerHTML = '';

        if (gameRecords.length === 0) {
            tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-left fs-3" style="color: red;">No Gameplay history found!</td>
            </tr>
            `;
        } else {
            for (let i = 0; i < gameRecords.length; i++) {
                const record = gameRecords[i];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${record.bets}</td>
                    <td>${record.won}</td>
                    <td>${record.balance}</td>
                    <td>${new Date(record.timestamp).toLocaleString()}</td>
                `;
                tbody.appendChild(tr);
            }
        }
    }

    const clearHistoryButton = divWrapper.querySelector('#clearHistory');
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', async () => {
            try {
                await clearPlayHistory();
                gameRecords = [];
                renderGameRecords(gameRecords, divWrapper);
            } catch (error) {
                if (DEV) console.log('Failed to clear play history', error);
                alert(`Failed to clear play history: ${JSON.stringify(error)}`);
            }
        });
    }
}
