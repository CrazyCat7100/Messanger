let sendBtn = document.getElementsByClassName('send_btn')[0];
let input = document.getElementsByClassName('input')[0];
let chat = document.getElementsByClassName('chat')[0];
let messagesContainer = document.getElementsByClassName('messages2')[0];
let icons = document.getElementsByClassName('avatar')
let icon = document.getElementsByClassName('icon-img')[0]
let chooseFile = document.getElementsByClassName('choose-file')[0]
let form = document.getElementsByTagName('form')[0]
let options = document.getElementsByClassName('options')[0]
let optionsDiv = document.getElementsByClassName('options-bar')[0]
let back = document.getElementsByClassName('back')[0]
let logout = document.getElementsByClassName('logout')[0]


let userName = 'guest'

fetch('/name')
.then(data => (data.json()))
.then(json=> {
    userName = json.username
    
        
    }
)



logout.addEventListener('click', function () {
    window.location.href = '/logout'
})

back.addEventListener('click', function () {
    optionsDiv.style.display = 'none'
    options.style.display = 'flex'
})

options.addEventListener('click', function () {
    optionsDiv.style.display = 'flex'
    options.style.display = 'none'
}) 

if (localStorage.getItem('ava') == null) {
    localStorage.setItem('ava', 'question_mark.png')
}


icon.src = '/img/avatars/' + localStorage.getItem('ava')

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
                <div class="message anim" data-id="${json.data[i]._id} ">
                    <div class="message-top">
                        <img src="/img/avatars/${json.data[i].icon}" alt="" class="icon">
                        <h2 class="name">${userName}</h2>
                    </div>
                    <div class="message_text"> ${json.data[i].message} </div>
                </div>
            `
            messagesContainer.innerHTML += newMessage
            setTimeout(() => {
                let allAnim = document.getElementsByClassName('anim')
                for (let i = 0; i < allAnim.length; i++ ){
                    allAnim[i].classList.remove('anim')
                }
            }, 1000);
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
    <div class='message-top'>   
        <img src="question_mark.png" alt="" class="icon">
        <h2 class="name"></h2>
    </div>
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
        // alert(icons[i].src)\
        
        icon.src = icons[i].src
        let nameImg = icons[i].src.lastIndexOf('/')
        localStorage.setItem('ava', icons[i].src.slice(nameImg + 1))
    })
}



scrollToBottom()

chooseFile.addEventListener('change', function () {
    // form.submit()
    fetch('/img/avatars/', {
        method: 'POST',
        body: new FormData(form)
        // headers: {
        //     enctype: 'multipart/form-data'
        // }
    }).then (data => (data.json())) .then (json => {
        icon.src = '/img/avatars/' + json.image
        localStorage.setItem('ava', json.image)
    })

})

