const addressModalBody = document.querySelector('.address-modal-body')
const loginContainer = document.querySelector('#login-modal-container')
const signupContainer = document.querySelector('#signup-modal-container')
const addressContainer = document.querySelector('#address-modal-container')

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

function addressModalUnview(){
    body.style.overflow = 'auto'
    addressModalBody.style.display = 'flex'
    addressModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
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

function loginModalUnview(){
    body.style.overflow = 'auto'
    loginModalBody.style.display = 'flex'
    loginContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    signupContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    loginModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

// modalUnviews
addEventListener('click', (e) => {
    if (e.target == loginModalBody) {
        loginModalUnview()
    }
    // 소셜유저 회원가입시 주소 입력을 안한 상태에서는 모달에서 나가는 것을 방지
    if (e.target == addressModalBody) {
        alert("주소를 입력해주세요.")
    }
})

// 로그인 모달 비밀번호 잇풋창에서 엔터 누르면 로그인 버튼 트리거 가능하게 하기
$("#loginPassword").keyup(function(event) {
    if (event.keyCode === 13) {
        $(".login-submit-btn").click();
    }
});