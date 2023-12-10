let sendBtn = document.getElementsByClassName('send_btn')[0];
let input = document.getElementsByClassName('input')[0];
let chat = document.getElementsByClassName('chat')[0];
let messagesContainer = document.getElementsByClassName('messages2')[0];
let icons = document.getElementsByClassName('avatar')
let icon = document.getElementsByClassName('icon-img')[0]


input.focus()


    setInterval(function () {
    let messages = document.getElementsByClassName('message')
    let lastId = messages[messages.length - 1].dataset.id;
    fetch('/updateMessages/' + lastId)
    .then(data => (data.json()))
    .then(json=> {
        console.log(json) // status: ok
        if (json.status) {
            for (let i = 0; i < json.data.length; i++) {
                let newMessage = `
                <div class="message" data-id="${json.data[i]._id} ">
                    <img src="/img/avatars/${json.data[i].icon}" alt="" class="icon">
                    <div class="message_text"> ${json.data[i].message} </div>
                </div>
            `
            messagesContainer.innerHTML += newMessage
            }
            scrollToBottom()
            
        }
    })
}, 500 )

function sendMsg (event) {
    if (!event || event.key === 'Enter') {
    let inputText = input.value;
    let name = 'Incognito'
    let userIcon = icon.src.slice(  icon.src.lastIndexOf('/')+1 )

    fetch('/save/' + userIcon + '/' + name+ '/' + inputText)
    .then(data => (data.json()))
    .then(json=> {
        console.log(json) // status: ok
    })
    if (inputText.trim() !== '') {
        input.value = '';
        // cloneMessages(inputText);
        scrollToBottom();
    }
}
}

function findInputText() {
    sendBtn.addEventListener('click', () => { sendMsg(false)  });

    input.addEventListener('keydown', () => { sendMsg(event)  });
}



// function (event) {
//     if (event.key === 'Enter') {
//         let inputText = input.value;
//         let name = 'Incognito'
//         let icon = 'icon.svg'
//         fetch('/save/' + icon + '/' + name+ '/' + inputText)
//         .then(data => (data.json()))
//         .then(json=> {
//             console.log(json) // status: ok
//         })
//         if (inputText.trim() !== '') {
//             input.value = '';
//             cloneMessages(inputText);
//             scrollToBottom();
//         }
//     }
// }


function cloneMessages(text) {
    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `
        <img src="question_mark.png" alt="" class="icon">
        <div class="message_text">${text}</div>
    `;
    messagesContainer.appendChild(messageDiv);
}

function scrollToBottom() {
    chat.scrollTop = 999999999999;
}

findInputText();

fetch('/date/year')
.then(data=>(data.json()))
.then(json=>{
    console.log(json)
})



for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', function () {
        // alert(icons[i].src)
        icon.src = icons[i].src
    })
}

scrollToBottom()