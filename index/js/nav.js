const body = document.getElementsByTagName('body')[0]
const loginModalBody = document.querySelector('.login-modal-body')
const addressModalBody = document.querySelector('.address-modal-body')
const reviewModalBody = document.querySelector('.review-modal-body')
const rentalDateModalBody = document.querySelector('.rental-date-modal-body')
const chatModalBody = document.querySelector('.chat-modal-body')

const loginContainer = document.querySelector('#login-modal-container')
const signupContainer = document.querySelector('#signup-modal-container')
const addressContainer = document.querySelector('#address-modal-container')
const reviewContainer = document.querySelector('#review-modal-container')
const rentalDateContainer = document.querySelector('#rental-date-modal-container')
const chatContainer = document.querySelector('#chat-modal-container')

const signUpBtn = document.querySelector('.signup-submit-btn')
const loginBtn = document.querySelector('.login-btn')
const logoutBtn = document.querySelector('.logout-btn')
const loginSubmitBtn = document.querySelector('.login-submit-btn')
const reviewSubmitBtn = document.querySelector('.review-submit-btn')
const requestContractBtn = document.querySelector('.request-contract-btn')
const endContractBtn = document.querySelector('.request-contract-btn')
const rentalDateSubmitBtn = document.querySelector('.rental-date-submit-btn')
const chatBtn = document.querySelector('.chat-btn')

const rentalStartTime = document.getElementById('rental-start-time')
const rentalEndTime = document.getElementById('rental-end-time')

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

function rentalDateModalView(){
    body.style.overflow = 'hidden'
    rentalDateModalBody.style.display = 'flex'
}

function reviewModalView(){
    body.style.overflow = 'hidden'
    loginModalBody.style.display = 'none'
    reviewModalBody.style.display = 'flex'
    reviewModalBody.style.animation = ''
    reviewContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
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

let chatBtnCount = 0
function chatModalView(){
    if (chatBtnCount % 2 === 0){
        body.style.overflow = 'hidden'
        chatModalBody.style.display = 'flex'
        chatBtn.style.backgroundColor = '#ffe398'
        chatBtnCount ++; 
    }
    else {
        body.style.overflow = 'auto'
        chatModalBody.style.display = 'none'
        chatBtn.style.backgroundColor = '#E6E6E6'
        chatBtnCount ++;
    }
}

requestContractBtn.addEventListener('click', (e) => {
    rentalDateModalView()
})

function loginModalUnview(){
    body.style.overflow = 'auto'
    loginModalBody.style.display = 'flex'
    loginContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    signupContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    loginModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function addressModalUnview(){
    body.style.overflow = 'auto'
    addressModalBody.style.display = 'flex'
    addressModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function reviewModalUnview(){
    body.style.overflow = 'auto'
    reviewModalBody.style.display = 'none'
    // reviewModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

function rentalDateModalUnview(){
    body.style.overflow = 'auto'
    rentalDateModalBody.style.display = 'none'
}

// 물품 목록 버튼
function goItemListPage() {
    location.href = '../item/list.html'
}

// 물품 등록 버튼
function goUploadPage() {

    // 비 로그인 유저일 경우
    if (localStorage.payload == undefined) {
        alert('로그인 후 이용 가능합니다')
    }
    
    // 로그인 유저일 경우
    else {
        location.href = '../item/upload.html'
    }
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
    if (e.target == reviewModalBody) {
        reviewModalUnview()
    }
    if (e.target == rentalDateModalBody) {
        rentalDateModalUnview()
    }
})

// 로그인 모달 비밀번호 잇풋창에서 엔터 누르면 로그인 버튼 트리거 가능하게 하기
$("#loginPassword").keyup(function(event) {
    if (event.keyCode === 13) {
        $(".login-submit-btn").click();
    }
});

// 로그인해서 로컬 스토리지에 json payload가 있을시
if (localStorage.payload !== undefined) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    chatBtn.style.display = "block";
    chatModalBody.style.animation = 'roadRunnerIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    chatContainer.style.animation = 'roadRunnerIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
}

else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    chatBtn.style.display = "none";
}


// 리뷰 평점 별점 핸들링
$(document).ready(function(){

    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    //별점 인풋을 누르면 값을 유저평점 변수에 저장
    $('input:radio').change(function() {
        var userRating = this.value;
    }); 
});


// 대여 시작일과 종료일 default값 현재 시간으로 지정
// 대여 시작일과 종료일은 오늘 이후로만 설정 가능
var now = new Date();
var timezoneNow = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

rentalStartTime.value = now.toISOString().slice(0,16);
rentalEndTime.value = now.toISOString().slice(0,16);
rentalStartTime.min = now.toISOString().slice(0,16);
rentalEndTime.min = now.toISOString().slice(0,16);