const body = document.getElementsByTagName('body')[0]
const modalBody = document.querySelector('.modal-body')
const addressModalBody = document.querySelector('.address-modal-body')
const loginContainer = document.querySelector('#login-modal-container')
const signupContainer = document.querySelector('#signup-modal-container')
const addressContainer = document.querySelector('#address-modal-container')
const loginBtn = document.getElementsByClassName('login-btn')[0]
const logoutBtn = document.getElementsByClassName('logout-btn')[0]
const loginSubmitBtn = document.querySelector('.login-submit-btn')

function loginModalView(){
    body.style.overflow = 'hidden'
    modalBody.style.display = 'flex'
    loginContainer.style.display = 'flex'
    signupContainer.style.display = 'none'
    modalBody.style.animation = ''
    loginContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function addressModalView(){
    body.style.overflow = 'hidden'
    modalBody.style.display = 'none'
    addressModalBody.style.display = 'flex'
    addressModalBody.style.animation = ''
    addressContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function signupContainerView(){
    loginContainer.style.display = 'none'
    signupContainer.style.display = 'flex'
    addressContainer.style.display = 'none'
    signupContainer.style.animation = ''
}

function loginContainerView(){
    loginContainer.style.display = 'flex'
    signupContainer.style.display = 'none'
    addressContainer.style.display = 'none'
    loginContainer.style.animation = ''
}

function modalUnview(){
    body.style.overflow = 'auto'
    modalBody.style.display = 'flex'
    loginContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    signupContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function addressModalUnview(){
    body.style.overflow = 'auto'
    addressModalBody.style.display = 'flex'
    addressModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

addEventListener('click', (e) => {
    if (e.target == modalBody) {
        modalUnview()
    }
})

addEventListener('click', (e) => {
    if (e.target == addressModalBody) {
        alert("주소를 입력해주세요.")
    }
})

if (localStorage.payload !== undefined) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
}

else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
}
