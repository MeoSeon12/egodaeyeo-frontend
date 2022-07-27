const body = document.getElementsByTagName('body')[0]
const loginModalBody = document.querySelector('.login-modal-body')
const addressModalBody = document.querySelector('.address-modal-body')
const reviewModalBody = document.querySelector('.review-modal-body')
const rentalDateModalBody = document.querySelector('.rental-date-modal-body')

const loginContainer = document.querySelector('#login-modal-container')
const signupContainer = document.querySelector('#signup-modal-container')
const addressContainer = document.querySelector('#address-modal-container')
const reviewContainer = document.querySelector('#review-modal-container')
const rentalDateContainer = document.querySelector('#rental-date-modal-container')

const signUpBtn = document.querySelector('.signup-submit-btn')
const loginSubmitBtn = document.querySelector('.login-submit-btn')
const reviewSubmitBtn = document.querySelector('.review-submit-btn')
const requestContractBtn = document.querySelector('.request-contract-btn')
const endContractBtn = document.querySelector('.request-contract-btn')
const rentalDateSubmitBtn = document.querySelector('.rental-date-submit-btn')
const searchBtn = document.querySelector('#search-icon')
const loginBtn = document.querySelector('.login-btn')
const logoutBtn = document.querySelector('.logout-btn')

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
    const chatBody = document.querySelector('.chat-modal-body')

    if (chatBtnCount % 2 === 0){
        chatBody.style.display = 'flex'
        chatBody.style.animation = 'moveUp 0.5s'
        chatBtnCount ++; 
    }
    else {
        body.style.overflow = 'auto'
        chatBody.style.animation = 'moveDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
        chatBtnCount ++;
    }
}

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


// 로그인, 비로그인에 따라 로그인, 로그아웃 채팅 모달 버튼 display 여부
function appendChatAndLoginBtns() {

    if (localStorage.payload !== undefined) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";

        const chatBtn = document.createElement('button')
        chatBtn.setAttribute('class', 'chat-btn')
        chatBtn.setAttribute('onclick', 'chatModalView()')
        chatBtn.innerHTML = `<i class="fa-solid fa-comment" id="chat-icon"></i>`
        body.append(chatBtn)
    
        appendChatModal()
    }
    else {
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
    }    
}


//채팅 모달 JS
async function appendChatModal() {

    data = await chatModalApi()
    const userId = JSON.parse(localStorage.getItem('payload')).user_id
    
    const chatBody = document.createElement('div');
    chatBody.setAttribute("class", "chat-modal-body");
    body.append(chatBody)
    
    const chatContainer = document.createElement('div');
    chatContainer.setAttribute("class", "chat-modal-container");
    chatContainer.setAttribute("id", "chat-modal-container");
    chatBody.append(chatContainer)
    
    const chatRoomsContainer = document.createElement('div');
    chatRoomsContainer.setAttribute("class", "chat-rooms-container");
    chatContainer.append(chatRoomsContainer)
    
    // for chatRoom in headers..채팅방 수 에 따라 생성
    for (let i = 0; i < data.length; i++) {
        let receiverId = data[i]['receiver']['id']
        let receiverNickname = data[i]['receiver']['nickname']
        let senderNickname = data[i]['sender']['nickname']

        const chatRoom = document.createElement('div');
        chatRoom.setAttribute("class", "chat-room");
        chatRoom.setAttribute("onclick", `chatRoomSelect(${data[i].id})`);
        chatRoomsContainer.append(chatRoom)

        const spanNickname = document.createElement('span');
        spanNickname.setAttribute("class", "nickname");
        
        if (receiverId == userId) {
            spanNickname.innerText = senderNickname
            chatRoom.style.backgroundColor = "rgb(255, 239, 194)"
            chatRoom.append(spanNickname)
        }
        else {
            spanNickname.innerText = receiverNickname
            chatRoom.style.backgroundColor = "rgb(191, 255, 194)"
            chatRoom.append(spanNickname)
        }
    }

    const chatAreaContainer = document.createElement('div');
    chatAreaContainer.setAttribute("class", "chat-area-container");
    chatContainer.append(chatAreaContainer)
    
    const chatAreaBox = document.createElement('div');
    chatAreaBox.setAttribute("class", "chat-area-box");
    chatAreaContainer.append(chatAreaBox)
    
    // 채팅방 선택하기 전
    const selectSpan = document.createElement('div');
    selectSpan.setAttribute("class", "select-chat-room")
    selectSpan.innerText = "채팅방을 선택해주세요"
    chatAreaBox.append(selectSpan)
}

async function chatRoomSelect(room_id) {

    const data = await chatRoomApi(room_id)
    const chatData = data['chat_messages']
    console.log(data)
    const chatAreaContainer = document.querySelector('.chat-area-container')

    chatAreaContainer.replaceChildren();
    
    const chatAreaBox = document.createElement('div');
    chatAreaBox.setAttribute("class", "chat-area-box");
    chatAreaBox.style.justifyContent = 'normal';
    chatAreaContainer.append(chatAreaBox)
    
    //물품 제목 append
    const titleSpan = document.createElement('span');
    titleSpan.innerText = data.title
    chatAreaBox.append(titleSpan)
    
    const contractBtnContainer = document.createElement('div');
    contractBtnContainer.setAttribute("class", "contract-btn-container");
    chatAreaBox.append(contractBtnContainer)
    
    //if 문으로 sender면, request receiver면 end
    if (data.sender.id == userId) {
        const requestContractBtn = document.createElement('button');
        requestContractBtn.setAttribute("class", "request-contract-btn");
        requestContractBtn.innerText = "대여신청"
        contractBtnContainer.append(requestContractBtn)

        requestContractBtn.addEventListener('click', (e) => {
            rentalDateModalView()
        })
    }

    // const endContractBtn = document.createElement('button');
    // endContractBtn.setAttribute("class", "end-contract-btn");
    // endContractBtn.innerText = "대여종료"
    // contractBtnContainer.append(endContractBtn)

    const chatAreaWrap = document.createElement('div');
    chatAreaWrap.setAttribute("class", "chat-area-wrap");
    chatAreaWrap.setAttribute("id", "messages");
    chatAreaBox.append(chatAreaWrap)
    
    for (let i = 0; i < chatData.length; i++) {
        if (chatData[i]['user'] == userId) {
            const myChatWrap = document.createElement('div');
            myChatWrap.setAttribute("class", "my-chat-wrap");
            myChatWrap.innerHTML = `<div class="chat-time-stamp">${chatData[i].time}</div>
                                    <div class="my-chat">${chatData[i].content}</div>`
            chatAreaWrap.append(myChatWrap)
        }
        else {
            const otherChatWrap = document.createElement('div');
            otherChatWrap.setAttribute("class", "other-chat-wrap");
            otherChatWrap.innerHTML = `<div class="other-chat">${chatData[i].content}</div>
                                        <div class="chat-time-stamp">${chatData[i].time}</div>`
            chatAreaWrap.append(otherChatWrap)
        }
    }
    chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight;

    const chatSendContainer = document.createElement('div');
    chatSendContainer.setAttribute("class", "chat-send-container");
    chatAreaContainer.append(chatSendContainer)
    
    const chatInput = document.createElement('textarea');
    chatInput.setAttribute("class", "chat-text");
    chatInput.setAttribute("type", "text");
    chatInput.setAttribute("name", "message");
    chatInput.setAttribute("rows", "1");
    chatInput.setAttribute("oninput", "calcTextareaHeight(this)");
    chatInput.setAttribute("placeholder", "채팅을 입력해주세요.");
    chatSendContainer.append(chatInput)

    const chatSendBtn = document.createElement('button');
    chatSendBtn.setAttribute("class", "chat-send-btn");
    chatSendBtn.innerHTML = `<i class="fa-solid fa-comment"></i>`
    chatSendContainer.append(chatSendBtn)

    //채팅 기능 트리거
    chatSendBtn.addEventListener('click', (e) => {
        const chatInput = document.querySelector('.chat-text')
        const senderId = data['sender']['id']
        var receiverId = data['receiver']['id']

        // 받는사람이 유저와 동일할 경우 받는사람을 sender로 수정
        if (receiverId == userId) {
            receiverId = senderId
        }

        if (chatInput.value != '') {
            const message = chatInput.value
            chatSocket.send(JSON.stringify({
                'message': message,
                'sender' : userId,
                'receiver': receiverId,
                'room_id' : room_id
            }))
            chatInput.value = ''
            chatInput.focus();
        }
    });

    // 채팅창에서 엔터 누르면 채팅 버튼 트리거
    $(".chat-text").keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $(".chat-send-btn").click();
        }
    });
}

// 대여 시작일과 종료일 default값 현재 시간으로 지정
// 대여 시작일과 종료일은 오늘 이후로만 설정 가능
var now = new Date();
var timezoneNow = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

rentalStartTime.value = now.toISOString().slice(0,16);
rentalEndTime.value = now.toISOString().slice(0,16);
rentalStartTime.min = now.toISOString().slice(0,16);
rentalEndTime.min = now.toISOString().slice(0,16);


// 채팅 입력 길이에 맞춰서 높이 조절
function calcTextareaHeight(e) {
    e.style.height = 'auto'
    e.style.height = `${e.scrollHeight}px`
}


// 검색창에서 엔터 누르면 검색 버튼 트리거
$(".search").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-icon").click();
    }
});

//검색 기능 트리거
searchBtn.addEventListener('click', (e) => {
    const searchValue = document.querySelector('.search').value
    if (searchValue != '') {
        window.location.replace(`../item/search.html?query=${searchValue}`)
    }
})


appendChatAndLoginBtns();