const loginModalBody = document.querySelector('.login-modal-body')
const loginBtn = document.querySelector('.login-btn')
const logoutBtn = document.querySelector('.logout-btn')
const signUpBtn = document.querySelector('.signup-submit-btn')
const loginSubmitBtn = document.querySelector('.login-submit-btn')

function loginModalView(){
    body.style.overflow = 'hidden'
    loginModalBody.style.display = 'flex'
    loginContainer.style.display = 'flex'
    signupContainer.style.display = 'none'
    loginModalBody.style.animation = ''
    loginContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function addressModalView(){
    body.style.overflow = 'hidden'
    loginModalBody.style.display = 'none'
    addressModalBody.style.display = 'flex'
    addressModalBody.style.animation = ''
    addressContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}