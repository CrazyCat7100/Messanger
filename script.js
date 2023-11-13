let sendBtn = document.getElementsByClassName('send_btn')[0];
let input = document.getElementsByClassName('input')[0];
let chat = document.getElementsByClassName('chat')[0];

function findInputText() {
    sendBtn.addEventListener('click', function () {
        let inputText = input.value;
        if (inputText.trim() !== '') {
            input.value = '';
            cloneMessages(inputText);
        }
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            let inputText = input.value;
            if (inputText.trim() !== '') {
                input.value = '';
                cloneMessages(inputText);
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

findInputText();
