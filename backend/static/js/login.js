let reg = document.getElementsByClassName('reg-form')[0]
let login = document.getElementsByClassName('login-form')[0]
let option = document.getElementsByClassName('option')[0]

// if (login.style.display = 'flex') {
//     option.textContent = 'Register'
// }

// if (reg.style.display = 'flex') {
//     option.textContent = 'Login'
// }

let loginText = 'No account? Register'
let registerText = 'Have an account? Sign in'

option.addEventListener('click', function () {
    document.forms[0].classList.toggle('active-form')
    document.forms[1].classList.toggle('active-form')
    option.textContent = option.textContent == loginText ? registerText : loginText
    // alert(login.style.display)
    // if (login.style.display == 'flex') {
    //     reg.style.display = 'flex'
    //     login.style.display = 'none'
    // }
    // else if (reg.style.display == 'flex') {
    //     reg.style.display = 'none'
    //     login.style.display = 'flex'
    // }
})