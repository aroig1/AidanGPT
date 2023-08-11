const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

async function chatResponse(message) {
    const apiKey = 'API_KEY';
    const apiURL = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: message }],
            max_tokens: 200
        })
    })

    const data = await response.json();
    return data.choices[0].message.content;
}

async function AddMessage() {
    if (inputBox.value === '') {
        alert("You must input a message.");
        inputBox.value = '';
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add("user");
        listContainer.appendChild(li);
        inputBox.value = '';
        let res = document.createElement("li");
        res.innerHTML = 'loading...'
        listContainer.appendChild(res);
        window.scrollTo(0, window.innerHeight);
        const response = await chatResponse(li.innerHTML);
        res.innerHTML = response;
        window.scrollTo(0, window.innerHeight);
    }
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        AddMessage();
    }
});