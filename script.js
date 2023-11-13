let sendBtn = document.getElementsByClassName('send_btn')[0];
let input = document.getElementsByClassName('input')[0];
let chat = document.getElementsByClassName('chat')[0];
let message = document.getElementsByClassName('message')[0];

function findInputText() {
    let inputText; // Declare inputText here

    sendBtn.addEventListener('click', function () {
        inputText = input.value;
        input.value = '';
        cloneMessages();
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            inputText = input.value;
            input.value = '';
            cloneMessages();
        }
    });
}

findInputText();

function cloneMessages() {
    chat.innerHTML += `<div class="message">
        <img src="question_mark.png" alt="" class="icon">
        <div class="message_text">${inputText}</div>
    </div>`;
}
