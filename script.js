const { generateResponse } = require('./chatgpt.js');
const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

function AddMessage() {
    if (inputBox.value === '') {
        alert("You must input a message.");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add("user");
        listContainer.appendChild(li);
        chatResponse(li.innerHTML);
    }
    inputBox.value = '';
}

async function chatResponse(message) {
    let response = await generateResponse(message);
    let li = document.createElement("li");
    li.innerHTML = response;
    listContainer.appendChild(li);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        AddMessage();
    }
});