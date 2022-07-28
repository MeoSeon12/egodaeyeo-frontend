const body = document.getElementsByTagName('body')[0]
const addressModalBody = document.querySelector('.address-modal-body')
const reviewModalBody = document.querySelector('.review-modal-body')
const loginContainer = document.querySelector('#login-modal-container')
const signupContainer = document.querySelector('#signup-modal-container')
const addressContainer = document.querySelector('#address-modal-container')
const searchBtn = document.querySelector('#search-icon')


//대여신청하는 모달폼 
function rentalDateModalView(itemId, room_id){
    const rentalModalBody = document.querySelector('.rental-date-modal-body');
    console.log(rentalModalBody)
    if (rentalModalBody) {
        rentalModalBody.remove()
    }
    const rentalDateModalBody = document.createElement('div');
    rentalDateModalBody.setAttribute("class", "rental-date-modal-body");
    body.append(rentalDateModalBody)
    
    const rentalDateContainer = document.createElement('div');
    rentalDateContainer.setAttribute("class", "rental-date-modal-container");
    rentalDateContainer.setAttribute("id", "rental-date-modal-container");
    rentalDateModalBody.append(rentalDateContainer)
    
    const rentalApply = document.createElement('h2');
    rentalApply.setAttribute("class", "rental-apply");
    rentalApply.innerText = "대여신청"
    rentalDateContainer.append(rentalApply)

    const rentalStart = document.createElement('h5');
    rentalStart.innerText = "대여 시작일"
    rentalDateContainer.append(rentalStart)

    const startTime = document.createElement('input');
    startTime.setAttribute("type", "datetime-local");
    startTime.setAttribute("id", "rental-start-time");
    startTime.setAttribute("name", "rental-start-time");
    rentalDateContainer.append(startTime)
    
    const rentalEnd = document.createElement('h5');
    rentalEnd.innerText = "대여 종료일"
    rentalDateContainer.append(rentalEnd)
    
    const endTime = document.createElement('input');
    endTime.setAttribute("type", "datetime-local");
    endTime.setAttribute("id", "rental-end-time");
    endTime.setAttribute("name", "rental-end-time");
    rentalDateContainer.append(endTime)

    const rentalSubmitBtn = document.createElement('button');
    rentalSubmitBtn.setAttribute("class", "rental-date-submit-btn");
    rentalSubmitBtn.innerText = "신청하기"
    rentalDateContainer.append(rentalSubmitBtn)

    const askSign = document.createElement('div');
    askSign.setAttribute("class", "ask-sign");
    rentalDateContainer.append(askSign)

    const cancelRental = document.createElement('a');
    cancelRental.setAttribute("class", "cancel-rental");
    cancelRental.innerText = "취소"
    askSign.append(cancelRental)
    
    // 대여 시작일과 종료일 default값 현재 시간으로 지정
    // 대여 시작일과 종료일은 오늘 이후로만 설정 가능
    var now = new Date();
    var timezoneNow = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    startTime.value = now.toISOString().slice(0,16);
    endTime.value = now.toISOString().slice(0,16);
    startTime.min = now.toISOString().slice(0,16);
    endTime.min = now.toISOString().slice(0,16);

    body.style.overflow = 'hidden'
    rentalDateModalBody.style.display = 'flex'
    
    
    addEventListener('click', (e) => {
        if (e.target == rentalDateModalBody || e.target == cancelRental) {
            body.style.overflow = 'auto'
            rentalDateModalBody.style.display = 'none'
        }
    })

    rentalSubmitBtn.addEventListener('click', (e) => {
        onRentalSubmit(itemId)
        console.log(startTime.value, endTime.value)
        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'

        const senderId = data[0]['sender']['id']
        var receiverId = data[0]['receiver']['id']

        // 받는사람이 유저와 동일할 경우 받는사람을 sender로 수정
        if (receiverId == userId) {
            receiverId = senderId
        }
        
        chatSocket.send(JSON.stringify({
            'item_id': itemId,
            'message': "대여신청이 도착했습니다!!!!!",
            'sender': userId,
            'receiver': receiverId,
            'room_id': room_id,
        }))
    });
}

//대여신청이 도착했습니다. 클릭시 생기는 모달
async function checkRentalDateModal(itemId) {

    const data = await contractDetailApi(itemId)

    const startDate = timeFormat(data['start_date'])
    const endDate = timeFormat(data['end_date'])

    const rentalModalBody = document.querySelector('.rental-date-modal-body');
    
    if (rentalModalBody) {
        rentalModalBody.remove()
    }
    const rentalDateModalBody = document.createElement('div');
    rentalDateModalBody.setAttribute("class", "rental-date-modal-body");
    body.append(rentalDateModalBody)
    rentalDateModalBody.style.display = 'flex'
    
    const rentalDateContainer = document.createElement('div');
    rentalDateContainer.setAttribute("class", "rental-date-modal-container");
    rentalDateContainer.setAttribute("id", "rental-date-modal-container");
    rentalDateModalBody.append(rentalDateContainer)
    
    const rentalApply = document.createElement('h2');
    rentalApply.setAttribute("class", "rental-apply");
    rentalApply.innerText = "대여신청 확인"
    rentalDateContainer.append(rentalApply)

    const rentalStart = document.createElement('h5');
    rentalStart.innerText = "대여 시작일"
    rentalDateContainer.append(rentalStart)

    const startTime = document.createElement('p');
    startTime.innerText = startDate
    rentalDateContainer.append(startTime)
    
    const rentalEnd = document.createElement('h5');
    rentalEnd.innerText = "대여 종료일"
    rentalDateContainer.append(rentalEnd)
    
    const endTime = document.createElement('p');
    endTime.innerText = endDate
    rentalDateContainer.append(endTime)

    const rentalSubmitBtn = document.createElement('button');
    rentalSubmitBtn.setAttribute("class", "rental-date-submit-btn");
    rentalSubmitBtn.setAttribute("name", "대여 중");
    rentalSubmitBtn.innerText = "수락"
    rentalDateContainer.append(rentalSubmitBtn)

    const askSign = document.createElement('div');
    askSign.setAttribute("class", "ask-sign");
    rentalDateContainer.append(askSign)

    const cancelRental = document.createElement('a');
    cancelRental.setAttribute("class", "cancel-rental");
    cancelRental.innerText = "거절"
    askSign.append(cancelRental)

    addEventListener('click', (e) => {
        if (e.target == rentalDateModalBody) {
            body.style.overflow = 'auto'
            rentalDateModalBody.style.display = 'none'
        }
    })

    rentalSubmitBtn.addEventListener('click', (e) => {
        contractAcceptEndApi(itemId, "대여 중")
        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'

        const contractBtnContainer = document.querySelector('.contract-btn-container')
        contractBtnContainer.replaceChildren()

        const endContractBtn = document.createElement('button');
        endContractBtn.setAttribute("class", "end-contract-btn");
        endContractBtn.innerText = "대여종료"
        endContractBtn.addEventListener('click', (e) => {
            contractAcceptEndApi(itemId, "대여종료")
        
            const reviewModalBody = document.createElement('div');
            reviewModalBody.setAttribute("class", "review-modal-body");
            reviewModalBody.setAttribute("id", "review-modal-container");
            body.append(reviewModalBody)

            const reviewContainer = document.createElement('div');
            reviewContainer.setAttribute("class", "review-modal-body");
            reviewModalBody.append(reviewContainer)

            const reviewModalHeader = document.createElement('h2');
            reviewModalHeader.setAttribute("class", "review-write");
            reviewModalHeader.innerText = 리뷰작성
            reviewContainer.append(reviewModalHeader)

            const rating = document.createElement('div');
            rating.setAttribute("class", "rating");

            for (let i = 5; i > 0; i--) {
                const ratingSpan = document.createElement('span');
                const radioRating = document.createElement('input');
                
                radioRating.setAttribute("type", "radio");
                radioRating.setAttribute("id", `str${i}`);
                radioRating.setAttribute("value", `${i}`);
                ratingSpan.append(radioRating)

                const ratingLabel = document.createElement('label');
                ratingLabel.setAttribute("for", `str${i}`);
                ratingLabel.innerText = '★'
                radioRating.append(ratingLabel)
                reviewContainer.append(ratingSpan)
            }

            reviewContainer.append(rating)

            const reviewInput = document.createElement('textarea');
            reviewInput.setAttribute("id", "review");
            reviewInput.setAttribute("name", "review");
            reviewInput.setAttribute("rows", "5");
            reviewInput.setAttribute("cols", "33");
            reviewInput.setAttribute("placeholder", "리뷰를 작성해주세요.");
            reviewContainer.append(rating)

            const reviewSubmitBtn = document.createElement('button');
            reviewSubmitBtn.setAttribute("class", "review-submit-btn");
            reviewSubmitBtn.setAttribute("onclick", `onReviewSubmit(${itemId})`);
            reviewContainer.append(reviewSubmitBtn)

            const skipReview = document.createElement('div');
            skipReview.setAttribute("class", "ask-sign");
            // skipReview.setAttribute("onclick", "reviewModalUnview()");
            skipReview.innerText = '건너 뛰기'
            reviewContainer.append(skipReview)

        })
        contractBtnContainer.append(endContractBtn)

    })
    cancelRental.addEventListener('click', (e) => {
        contractRefuseApi(itemId)
        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'
    })
}


function timeFormat(date) {
    const year = date.substring(0,4)
    const month = date.substring(5,7)
    const day = date.substring(8,10)
    const hour = date.substring(11,13)
    const minute = date.substring(14,16)
    const formatedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minute}`

    return formatedDate
}

function reviewModalView(){
    body.style.overflow = 'hidden'
    loginModalBody.style.display = 'none'
    reviewContainer.style.display = 'flex'
    reviewContainer.style.animation = ''
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
    reviewContainer.style.display = 'none'
    // reviewContainer.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
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
    // if (e.target == reviewContainer) {
    //     reviewModalUnview()
    // }
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


// 검색창에서 엔터 누르면 검색 버튼 트리거
$(".search").keyup(function (event) {
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


//채팅방 선택
let connectedChatSocket = ''
let connectedRentalSocket = ''
async function chatRoomSelect(room_id) {
    if (connectedChatSocket != '' && connectedRentalSocket != '') {
        connectedChatSocket.close()
        connectedRentalSocket.close()
    }

    const data = await chatRoomApi(room_id)
    const chatSocket = new WebSocket(`ws://127.0.0.1:8000/chats/${room_id}`)
    const rentalSocket = new WebSocket(`ws://127.0.0.1:8000/chats/contracts/${room_id}`)
    connectedChatSocket = chatSocket
    connectedRentalSocket = rentalSocket
    chatSocket.onmessage = async function(e){
        let data = JSON.parse(e.data)
        
        const messages = document.getElementById('messages')
        if (data.message == "대여신청이 도착했습니다!!!!!") {
            if (data.sender == userId) {
                messages.insertAdjacentHTML('beforeend', 
                `<div class="contract-wrap">
                <div class="contract-look" style="background-color: #f0f0f0;">대여신청을 보냈습니다</div>
                </div>`
                )
            }
            else {
                const contractWrap = document.createElement('div')
                contractWrap.setAttribute('class', 'contract-wrap')
                messages.append(contractWrap)
                const contractLook = document.createElement('div')
                contractLook.setAttribute('class', 'contract-look')
                contractLook.setAttribute('onclick', `checkRentalDateModal(${data.item_id})`)
                contractLook.innerText = "대여신청이 도착했습니다"
                contractWrap.append(contractLook)
            }
        }
        else{
            if (data.sender == userId) {
                messages.insertAdjacentHTML('beforeend', 
                `<div class="my-chat-wrap">
                <div class="chat-time-stamp">${data.time}</div>
                <div class="my-chat">${data.message}</div>
                </div>`
                )        
                
            }
            else {
                messages.insertAdjacentHTML('beforeend', 
                `<div class="other-chat-wrap">
                <div class="other-chat">${data.message}</div>
                <div class="chat-time-stamp">${data.time}</div>
                </div>`
                )
            }
        }
        const chatAreaWrap = document.querySelector('.chat-area-wrap')
        chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight;
    }
    
    const chatData = data['chat_messages']
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
        console.log(data)
        requestContractBtn.addEventListener('click', (e) => {
            rentalDateModalView(data.item, roomId, data.sender.id, data.receiver.id)
        })
    }

    const chatAreaWrap = document.createElement('div');
    chatAreaWrap.setAttribute("class", "chat-area-wrap");
    chatAreaWrap.setAttribute("id", "messages");
    chatAreaBox.append(chatAreaWrap)
    
    for (let i = 0; i < chatData.length; i++) {
        if (i > 0 && chatData[i].date != chatData[i-1].date) {
            const dateWrap = document.createElement('div');
            dateWrap.setAttribute("class", "date-wrap");
            dateWrap.innerHTML =
            `<div class="chat-date-stamp">
                <i class="fa-regular fa-calendar"></i>
                &nbsp;${chatData[i].date}
            </div>`

            chatAreaWrap.append(dateWrap)
        }
        if (chatData[i].content == "대여신청이 도착했습니다!!!!!") {
            if (chatData[i]['user'] == userId) {
                messages.insertAdjacentHTML('beforeend', 
                `<div class="contract-wrap">
                <div class="contract-look" style="background-color: #f0f0f0;">대여신청을 보냈습니다</div>
                </div>`
                )
            }
            else {
                const contractWrap = document.createElement('div')
                contractWrap.setAttribute('class', 'contract-wrap')
                messages.append(contractWrap)

                const contractLook = document.createElement('div')
                contractLook.setAttribute('class', 'contract-look')
                contractLook.setAttribute('onclick', `checkRentalDateModal(${data.item})`)
                contractLook.innerText = "대여신청이 도착했습니다"
                contractWrap.append(contractLook)
            }
        }
        else {
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
    }

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

    chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight;
    
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
                'room_id': roomId
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


// 대여 신청 발신자 모달 뷰
function rentalDateModalView(itemId, roomId, senderId, receiverId) {
    const rentalModalBody = document.querySelector('.rental-date-modal-body');
    if (rentalModalBody) {
        rentalModalBody.remove()
    }
    const rentalDateModalBody = document.createElement('div');
    rentalDateModalBody.setAttribute("class", "rental-date-modal-body");
    body.append(rentalDateModalBody)

    const rentalDateContainer = document.createElement('div');
    rentalDateContainer.setAttribute("class", "rental-date-modal-container");
    rentalDateContainer.setAttribute("id", "rental-date-modal-container");
    rentalDateModalBody.append(rentalDateContainer)

    const rentalApply = document.createElement('h2');
    rentalApply.setAttribute("class", "rental-apply");
    rentalApply.innerText = "대여신청"
    rentalDateContainer.append(rentalApply)

    const rentalStart = document.createElement('h5');
    rentalStart.innerText = "대여 시작일"
    rentalDateContainer.append(rentalStart)

    const startTime = document.createElement('input');
    startTime.setAttribute("type", "datetime-local");
    startTime.setAttribute("id", "rental-start-time");
    startTime.setAttribute("name", "rental-start-time");
    rentalDateContainer.append(startTime)

    const rentalEnd = document.createElement('h5');
    rentalEnd.innerText = "대여 종료일"
    rentalDateContainer.append(rentalEnd)

    const endTime = document.createElement('input');
    endTime.setAttribute("type", "datetime-local");
    endTime.setAttribute("id", "rental-end-time");
    endTime.setAttribute("name", "rental-end-time");
    rentalDateContainer.append(endTime)

    const rentalSubmitBtn = document.createElement('button');
    rentalSubmitBtn.setAttribute("class", "rental-date-submit-btn");
    rentalSubmitBtn.innerText = "신청하기"
    rentalDateContainer.append(rentalSubmitBtn)

    const askSign = document.createElement('div');
    askSign.setAttribute("class", "ask-sign");
    rentalDateContainer.append(askSign)

    const cancelRental = document.createElement('a');
    cancelRental.setAttribute("class", "cancel-rental");
    cancelRental.innerText = "취소"
    askSign.append(cancelRental)

    // 대여 시작일과 종료일 default값 현재 시간으로 지정
    // 대여 시작일과 종료일은 오늘 이후로만 설정 가능
    var now = new Date();
    var timezoneNow = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    startTime.value = now.toISOString().slice(0, 16);
    endTime.value = now.toISOString().slice(0, 16);
    startTime.min = now.toISOString().slice(0, 16);
    endTime.min = now.toISOString().slice(0, 16);

    body.style.overflow = 'hidden'
    rentalDateModalBody.style.display = 'flex'

    // 대여 신청 모달 unview
    addEventListener('click', (e) => {
        if (e.target == rentalDateModalBody || e.target == cancelRental) {
            body.style.overflow = 'auto'
            rentalDateModalBody.style.display = 'none'
        }
    })

    // 신청하기 버튼 클릭
    rentalSubmitBtn.addEventListener('click', (e) => {

        // 백엔드 포스트 요청
        onRentalSubmit(itemId)

        // 대여 신청 모달 unview
        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'

        // 받는사람이 유저와 동일할 경우 받는사람을 sender로 수정
        if (receiverId == userId) {
            receiverId = senderId
        }

        // 대여 신청 웹소켓 요청
        rentalSocket.send(JSON.stringify({
            'item_id': itemId,
            'message': "대여신청이 도착했습니다!!!!!",
            'sender': userId,
            'receiver': receiverId,
            'room_id': roomId,
        }))
    });
}


// 대여 신청 수신자 모달
async function checkRentalDateModal(itemId) {

    const data = await contractDetailApi(itemId)

    const startDate = timeFormat(data['start_date'])
    const endDate = timeFormat(data['end_date'])

    const rentalModalBody = document.querySelector('.rental-date-modal-body');

    if (rentalModalBody) {
        rentalModalBody.remove()
    }
    const rentalDateModalBody = document.createElement('div');
    rentalDateModalBody.setAttribute("class", "rental-date-modal-body");
    body.append(rentalDateModalBody)
    rentalDateModalBody.style.display = 'flex'

    const rentalDateContainer = document.createElement('div');
    rentalDateContainer.setAttribute("class", "rental-date-modal-container");
    rentalDateContainer.setAttribute("id", "rental-date-modal-container");
    rentalDateModalBody.append(rentalDateContainer)

    const rentalApply = document.createElement('h2');
    rentalApply.setAttribute("class", "rental-apply");
    rentalApply.innerText = "대여신청 확인"
    rentalDateContainer.append(rentalApply)

    const rentalStart = document.createElement('h5');
    rentalStart.innerText = "대여 시작일"
    rentalDateContainer.append(rentalStart)

    const startTime = document.createElement('p');
    startTime.innerText = startDate
    rentalDateContainer.append(startTime)

    const rentalEnd = document.createElement('h5');
    rentalEnd.innerText = "대여 종료일"
    rentalDateContainer.append(rentalEnd)

    const endTime = document.createElement('p');
    endTime.innerText = endDate
    rentalDateContainer.append(endTime)

    const rentalSubmitBtn = document.createElement('button');
    rentalSubmitBtn.setAttribute("class", "rental-date-submit-btn");
    rentalSubmitBtn.innerText = "수락"
    rentalDateContainer.append(rentalSubmitBtn)

    const askSign = document.createElement('div');
    askSign.setAttribute("class", "ask-sign");
    rentalDateContainer.append(askSign)

    const cancelRental = document.createElement('a');
    cancelRental.setAttribute("class", "cancel-rental");
    cancelRental.innerText = "거절"
    askSign.append(cancelRental)

    addEventListener('click', (e) => {
        if (e.target == rentalDateModalBody || e.target == cancelRental) {
            body.style.overflow = 'auto'
            rentalDateModalBody.style.display = 'none'
        }
    })

    rentalSubmitBtn.addEventListener('click', (e) => {
        // onRentalSubmit(itemId)
        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'
    })
}


// 채팅 입력 길이에 맞춰서 높이 조절
function calcTextareaHeight(e) {
    e.style.height = 'auto'
    e.style.height = `${e.scrollHeight}px`
}


appendChatAndLoginBtns();