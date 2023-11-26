let sendBtn = document.getElementsByClassName('send_btn')[0];
let input = document.getElementsByClassName('input')[0];
let chat = document.getElementsByClassName('chat')[0];





setInterval(function () {
    let messages = document.getElementsByClassName('message')
    let lastId = messages[messages.length - 1].dataset.id;
    fetch('/updateMessages/' + lastId)
    .then(data => (data.json()))
    .then(json=> {
        console.log(json) // status: ok
    })
}, 500 )



function findInputText() {
    sendBtn.addEventListener('click', function () {
        let inputText = input.value;
        let name = 'Incognito'
        let icon = 'icon.svg'
        fetch('/save/' + icon + '/' + name+ '/' + inputText)
        .then(data => (data.json()))
        .then(json=> {
            console.log(json) // status: ok
        })
        if (inputText.trim() !== '') {
            input.value = '';
            cloneMessages(inputText);
            scrollToBottom();
        }
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            let inputText = input.value;
            let name = 'Incognito'
            let icon = 'icon.svg'
            fetch('/save/' + icon + '/' + name+ '/' + inputText)
            .then(data => (data.json()))
            .then(json=> {
                console.log(json) // status: ok
            })
            if (inputText.trim() !== '') {
                input.value = '';
                cloneMessages(inputText);
                scrollToBottom();
            }
        }
    });
}

function cloneMessages(text) {
    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `
        <img src="question_mark.png" alt="" class="icon">
        <div class="message_text">${text}</div>
    `;
    chat.appendChild(messageDiv);
}

function scrollToBottom() {
    chat.scrollTop = chat.scrollHeight;
}

findInputText();




let icons = document.getElementsByClassName('avatar')

for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', function () {
        alert(icons[i].src)
    })
}