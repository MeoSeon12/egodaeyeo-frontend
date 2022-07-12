const body = document.getElementsByTagName('body')[0]
const modalBody = document.querySelector('.modal-body')
const loginContainer = document.querySelector('#login-modal-container')
const signupContainer = document.querySelector('#signup-modal-container')


function loginModalView(){
    body.style.overflow = 'hidden'
    modalBody.style.display = 'flex'
    loginContainer.style.display = 'flex'
    signupContainer.style.display = 'none'
    modalBody.style.animation = ''

    loginContainer.style.animation = 'scaleDown 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function signupContainerView(){
    loginContainer.style.display = 'none'
    signupContainer.style.display = 'flex'
    signupContainer.style.animation = ''

}

function loginContainerView(){
    loginContainer.style.display = 'flex'
    signupContainer.style.display = 'none'
    loginContainer.style.animation = ''
}

function modalUnview(){
    body.style.overflow = 'auto'
    modalBody.style.display = 'flex'
    loginContainer.style.animation = 'scaleUp 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    signupContainer.style.animation = 'scaleUp 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalBody.style.animation = 'wrapRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'

}

addEventListener('click', (e) => {
    if (e.target == modalBody) {
        modalUnview()
    }
})