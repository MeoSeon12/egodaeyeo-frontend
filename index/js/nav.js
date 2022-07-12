const body = document.getElementsByTagName('body')[0]
const modalBody = document.querySelector('.modal-body')
const loginContainer = document.querySelector('#login-modal-container')
const signupContainer = document.querySelector('#signup-modal-container')


function loginModalView(){
    body.style.overflow = 'hidden'
    modalBody.style.display = 'flex'
    loginContainer.style.display = 'flex'
    signupContainer.style.display = 'none'
}

function signupContainerView(){
    loginContainer.style.display = 'none'
    signupContainer.style.display = 'flex'
}

function loginContainerView(){
    loginContainer.style.display = 'flex'
    signupContainer.style.display = 'none'
}

function modalUnview(){
    body.style.overflow = 'auto'
    modalBody.style.display = 'none'
}

addEventListener('click', (e) => {
    if (e.target == modalBody) {
        modalUnview()
    }
})