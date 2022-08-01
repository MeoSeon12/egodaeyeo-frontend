// Element 생성 클래스
class CreateElement {

    // 채팅 모달 버튼 생성
    chatModalBtn() {
        const chatBtn = document.createElement('button')
        chatBtn.setAttribute('class', 'chat-btn')
        chatBtn.setAttribute('onclick', 'openChatModal()')
        chatBtn.innerHTML = `<i class="fa-solid fa-comment" id="chat-icon"></i>`
        const body = document.getElementsByTagName('body')[0]
        body.append(chatBtn)
    }

    // 채팅 모달 생성
    chatModal() {
        const chatBody = document.createElement('div')
        chatBody.setAttribute("class", "chat-modal-body")
        body.append(chatBody)

        const chatContainer = document.createElement('div')
        chatContainer.setAttribute("class", "chat-modal-container")
        chatContainer.setAttribute("id", "chat-modal-container")
        chatBody.append(chatContainer)

        const chatRoomsContainer = document.createElement('div')
        chatRoomsContainer.setAttribute("class", "chat-rooms-container")
        chatContainer.append(chatRoomsContainer)

        const chatAreaContainer = document.createElement('div')
        chatAreaContainer.setAttribute("class", "chat-area-container")
        chatContainer.append(chatAreaContainer)

        const chatAreaBox = document.createElement('div')
        chatAreaBox.setAttribute("class", "chat-area-box")
        chatAreaContainer.append(chatAreaBox)

        const selectSpan = document.createElement('div')
        selectSpan.setAttribute("class", "select-chat-room")
        selectSpan.innerText = "문의를 통해 채팅방을 생성해주세요"
        selectSpan.style.fontSize = "25px"
        chatAreaBox.append(selectSpan)
    }

    // 채팅방 생성
    chatRoom(data) {
        let authorId = data['author']['id']
        let authorNickname = data['author']['nickname']
        let inquirerNickname = data['inquirer']['nickname']

        const selectSpan = document.getElementsByClassName('select-chat-room')[0]
        selectSpan.innerText = "채팅방을 선택해주세요"

        const chatRoom = document.createElement('div')
        chatRoom.setAttribute("class", "chat-room")
        chatRoom.setAttribute("id", `chat-room-${data.id}`)
        chatRoom.setAttribute("onclick", `openChatRoom(${data.id})`)

        const chatRoomsContainer = document.getElementsByClassName('chat-rooms-container')[0]
        chatRoomsContainer.append(chatRoom)

        const spanNickname = document.createElement('span')
        spanNickname.setAttribute("class", "nickname")

        const chatRoomAlertEffect = document.createElement('section')
        chatRoomAlertEffect.setAttribute('class', 'chat-room-alert-effect')
        chatRoom.append(chatRoomAlertEffect)

        if (authorId == userId) {
            spanNickname.innerText = inquirerNickname
            chatRoom.style.backgroundColor = "rgb(255, 239, 194)"
            chatRoom.setAttribute("class", "chat-room lend-room")
            chatRoom.append(spanNickname)
        }
        else {
            spanNickname.innerText = authorNickname
            chatRoom.style.backgroundColor = "rgb(191, 255, 194)"
            chatRoom.setAttribute("class", "chat-room borrow-room")
            chatRoom.append(spanNickname)
        }
    }

    // 알람 모달 생성
    alertModal() {
        const navBtns = document.getElementsByClassName('nav-btns')[0]
        const chatAlertEffect = document.createElement('section')
        chatAlertEffect.setAttribute('class', 'chat-alert-effect')
        navBtns.append(chatAlertEffect)

        const chatAlertModalWrap = document.createElement('div')
        chatAlertModalWrap.setAttribute('class', 'chat-alert-modal-wrap')
        navBtns.append(chatAlertModalWrap)

        const chatAlertModalMessageNotting = document.createElement('section')
        chatAlertModalMessageNotting.setAttribute('class', 'chat-alert-modal-message-notting')
        chatAlertModalMessageNotting.innerText = '알람이 없습니다'
        chatAlertModalWrap.append(chatAlertModalMessageNotting)

        // 마우스 호버
        const mypage = document.getElementsByClassName('mypage')[0]
        mypage.addEventListener('mouseenter', function () {
            chatAlertModalWrap.style.display = 'flex'
            this.addEventListener('mouseleave', function () {
                chatAlertModalWrap.style.display = 'none'
            })
        })
        chatAlertModalWrap.addEventListener('mouseenter', function () {
            this.style.display = 'flex'
            this.addEventListener('mouseleave', function () {
                this.style.display = 'none'
            })
        })
    }

    // 알람 메세지 생성
    alertMessage(data) {
        if (document.getElementsByName(`chat-alert-modal-message-button-${data.room_id}`)[0] == null) {
            // 알람 메세지 생성
            const chatAlertModalMessageButton = document.createElement('p')
            chatAlertModalMessageButton.setAttribute('class', 'chat-alert-modal-message-button')
            chatAlertModalMessageButton.setAttribute('name', `chat-alert-modal-message-button-${data.room_id}`)
            chatAlertModalMessageButton.setAttribute('onclick', `openDirectChatRoom(${data.room_id})`)
            const chatAlertModalWrap = document.getElementsByClassName('chat-alert-modal-wrap')[0]
            chatAlertModalWrap.append(chatAlertModalMessageButton)
        }
    }
}


// 알람 관련 기능
class Alert {

    // 알람 효과 (알람 모달)
    navAlertEffect() {
        const chatAlertModalMessageNotting = document.getElementsByClassName('chat-alert-modal-message-notting')[0]
        chatAlertModalMessageNotting.style.display = 'none'
        const chatAlertEffect = document.getElementsByClassName('chat-alert-effect')[0]
        chatAlertEffect.style.display = 'block'
    }

    // 알람 효과 (채팅 모달)
    async chatModalAlertEffect() {
        // 알람 데이터 API
        const userId = JSON.parse(localStorage.getItem('payload')).user_id
        let unread_chatroom_list = await getUnreadMessageApi(userId)

        // 읽지않은 메세지 알람 표시
        for (let i = 0; i < unread_chatroom_list.length; i++) {
            const chatRoom = document.getElementById(`chat-room-${unread_chatroom_list[i].room_id}`)
            chatRoom.children[0].style.display = 'block'
        }
    }

    // 알람 효과 끄기
    offAlertEffect(roomId) {
        // 알람 모달 메세지 삭제
        const chatAlertModalMessageButton = document.getElementsByName(`chat-alert-modal-message-button-${roomId}`)[0]
        if (chatAlertModalMessageButton) {
            chatAlertModalMessageButton.remove()
        }
        // 알람 모달 알람 끄기
        const chatAlertModalMessageButton_list = document.getElementsByClassName('chat-alert-modal-message-button')
        if (chatAlertModalMessageButton_list.length == 0) {
            const chatAlertEffect = document.getElementsByClassName('chat-alert-effect')[0]
            const chatAlertModalMessageNotting = document.getElementsByClassName('chat-alert-modal-message-notting')[0]
            chatAlertEffect.style.display = 'none'
            chatAlertModalMessageNotting.style.display = 'block'
        }
        // 채팅방 알람 끄기
        const chatRoom = document.getElementById(`chat-room-${roomId}`)
        if (chatRoom) {
            chatRoom.children[0].style.display = 'none'
        }
    }

    // 알람 메세지 작성 (이전 메세지)
    alertPastMessage(data) {
        // 제목이 긴 경우 자름
        if (data.title.length > 5) {
            data.title = `${data.title.slice(0, 5)}...`
        }

        // 지난 시간 계산
        let pastTime = String((new Date - new Date(data.created_at)) / 1000 / 60).split('.')[0]
        if (pastTime < 1) {
            pastTime = '방금'
        }
        else if (1 <= pastTime < 60) {
            pastTime = `${pastTime}분 전`
        }
        else if (1 <= (pastTime / 60) < 24) {
            pastTime = `${pastTime / 60}시간 전`
        }
        else if (1 <= (pastTime / 60 / 24) < 31) {
            pastTime = `${pastTime / 60 / 24}일 전`
        }

        const chatAlertModalMessageButton = document.getElementsByName(`chat-alert-modal-message-button-${data.room_id}`)[0]
        // 채팅 메세지일 경우
        if (data.status == null) {
            chatAlertModalMessageButton.innerText =
                `[${data.title}]에서 ${data.sender}님이
                        ${pastTime} 채팅을 보냈습니다`
        }
        // 거래 상태 업데이트일 경우
        else {
            chatAlertModalMessageButton.innerText =
                `[${data.title}]에서 ${data.sender}님이
                        ${pastTime} 거래상태를 업데이트했습니다`
        }
    }

    // 알람 메세지 작성 (실시간 알람)
    alertNewMessage(data) {
        if (data.title.length > 5) {
            data.title = `${data.title.slice(0, 5)}...`
        }

        const chatAlertModalMessageButton = document.getElementsByName(`chat-alert-modal-message-button-${data.room_id}`)[0]
        // 채팅 메세지일 경우
        if (data.status == null) {
            chatAlertModalMessageButton.innerText =
                `[${data.title}]에서 ${data.sender}님이
                방금 채팅을 보냈습니다`
        }
        // 거래 상태 업데이트일 경우
        else {
            chatAlertModalMessageButton.innerText =
                `[${data.title}]에서 ${data.sender}님이
                방금 거래상태를 업데이트했습니다`
        }
    }

    // 알람 메세지 삭제 및 채팅방 열기
    async alertMessageClick(roomId) {

        // 알람 메세지 삭제
        const chatAlertModalMessageButton = document.getElementsByName(`chat-alert-modal-message-button-${roomId}`)[0]
        chatAlertModalMessageButton.remove()

        // 채팅방 열기
        const chatBody = document.querySelector('.chat-modal-body')
        if (chatBody == null) {
            await chatModalView()
            chatRoomSelectAndWebSocket(roomId)
        }
        else {
            chatRoomSelectAndWebSocket(roomId)
        }

        // 알람 효과 끄기
        const chatAlertModalMessageButton_list = document.getElementsByClassName('chat-alert-modal-message-button')
        if (chatAlertModalMessageButton_list.length == 0) {
            const chatAlertEffect = document.getElementsByClassName('chat-alert-effect')[0]
            const chatAlertModalMessageNotting = document.getElementsByClassName('chat-alert-modal-message-notting')[0]
            chatAlertEffect.style.display = 'none'
            chatAlertModalMessageNotting.style.display = 'block'
        }
    }
}


// 웹소켓 관련 기능
class Websocket {

    // 알람 웹소켓
    alertWebsocket() {
        // 알람 웹소켓 연결
        const chatAlertSocket = new WebSocket(`ws://127.0.0.1:8000/chats/alerts/${userId}`)

        // 알람 수신
        chatAlertSocket.onmessage = function (e) {
            // 알람 데이터
            let data = JSON.parse(e.data)
            // 알람 메세지 생성
            new CreateElement().alertMessage(data)
            new Alert().alertNewMessage(data)
        }
    }

    // 채팅 웹소켓
    chatWebsocket(roomId) {
        // 채팅 웹소켓 연결
        chatSocket = new WebSocket(`ws://127.0.0.1:8000/chats/${roomId}`)

        // 채팅 수신
        chatSocket.onmessage = function (e) {
            const messages = document.getElementById('messages')
            let data = JSON.parse(e.data)

            // 채팅 발신자 화면
            if (data.sender == userId) {
                messages.insertAdjacentHTML('beforeend',
                    `<div class="my-chat-wrap">
                <div class="chat-time-stamp">${data.time}</div>
                <div class="my-chat">${data.message}</div>
                </div>`
                )
            }
            // 채팅 수신자 화면
            else {
                messages.insertAdjacentHTML('beforeend',
                    `<div class="other-chat-wrap">
                <div class="other-chat">${data.message}</div>
                <div class="chat-time-stamp">${data.time}</div>
                </div>`
                )
            }
            // 스크롤 가장 아래로 내림
            const chatAreaWrap = document.querySelector('.chat-area-wrap')
            chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight;
        }
    }

    // 거래 웹소켓
    contractWebsocket(roomId, roomData) {
        // 거래 웹소켓 통신
        contractSocket = new WebSocket(`ws://127.0.0.1:8000/chats/contracts/${roomId}`)

        // 거래 웹소켓 수신
        contractSocket.onmessage = function (e) {

            const messages = document.getElementById('messages')
            const requestContractBtn = document.querySelector('.request-contract-btn')

            let data = JSON.parse(e.data)

            // 거래 상태에 따른 비동기 UI변경 로직
            switch (data.status) {
                case "대여 신청":
                    // 대여 신청 발신자
                    if (data.sender == userId) {
                        const contractWrap = document.createElement('div')
                        contractWrap.setAttribute('class', 'contract-wrap')
                        messages.append(contractWrap)

                        const contractLook = document.createElement('div')
                        contractLook.setAttribute('class', 'contract-look')
                        contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
                        contractLook.innerText = "대여 신청을 보냈습니다"
                        contractWrap.append(contractLook)

                        requestContractBtn.innerText = "대여 신청중"
                        requestContractBtn.style.cursor = 'auto'
                        requestContractBtn.style.backgroundColor = "#b6faf6"

                        requestContractBtn.removeEventListener("click", dateModalhandler)
                    }
                    // 대여 신청 수신자
                    else {
                        const contractWrap = document.createElement('div')
                        contractWrap.setAttribute('class', 'contract-wrap')
                        messages.append(contractWrap)

                        const contractLook = document.createElement('div')
                        contractLook.setAttribute('class', 'contract-look')
                        contractLook.setAttribute('onclick', `checkRentalDateModal(${data.item_id})`)
                        contractLook.innerText = "대여 신청이 도착했습니다"
                        contractWrap.append(contractLook)
                    }
                    break
                case "대여 수락":
                    if (data.sender != userId) {
                        requestContractBtn.innerText = "대여 중인 물품"
                        requestContractBtn.style.cursor = "auto"
                        requestContractBtn.style.backgroundColor = "#fcffb3"
                        contractBtnContainer.append(requestContractBtn)

                        // hover 색변경 기능해제
                        requestContractBtn.onmouseover = function () { }
                        requestContractBtn.onmouseout = function () { }

                        const contractWrap = document.createElement('div')
                        contractWrap.setAttribute('class', 'contract-wrap')
                        messages.append(contractWrap)

                        const contractLook = document.createElement('div')
                        contractLook.setAttribute('class', 'contract-look')
                        contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
                        contractLook.innerText = "대여 신청이 수락되었습니다"
                        contractWrap.append(contractLook)
                    }
                    break
                case "대여 거절":
                    if (data.sender != userId) {
                        requestContractBtn.innerText = "대여 신청"
                        requestContractBtn.style.cursor = "pointer"
                        requestContractBtn.style.backgroundColor = "rgb(153, 250, 158)"
                        contractBtnContainer.append(requestContractBtn)

                        // 대여 신청 버튼 클릭 이벤트
                        requestContractBtn.addEventListener('click', dateModalhandler = (e) => {
                            rentalDateModalView(roomData.item, roomId, roomData.inquirer.id, roomData.author.id)
                        })
                        //hover 색변경 기능
                        requestContractBtn.onmouseover = function () { requestContractBtn.style.backgroundColor = "rgb(191, 255, 194)" }
                        requestContractBtn.onmouseout = function () { requestContractBtn.style.backgroundColor = "rgb(153, 250, 158)" }

                        const contractWrap = document.createElement('div')
                        contractWrap.setAttribute('class', 'contract-wrap')
                        messages.append(contractWrap)

                        const contractLook = document.createElement('div')
                        contractLook.setAttribute('class', 'contract-look')
                        contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
                        contractLook.innerText = "대여 신청이 거절되었습니다"
                        contractWrap.append(contractLook)
                    }
                    break;
                case "대여 종료":
                    const contractWrap = document.createElement('div')
                    contractWrap.setAttribute('class', 'contract-wrap')
                    messages.append(contractWrap)

                    const contractLook = document.createElement('div')
                    contractLook.setAttribute('class', 'contract-look')
                    contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
                    contractLook.innerText = "대여가 종료되었습니다"
                    contractWrap.append(contractLook)

                    if (data.sender != userId) {
                        requestContractBtn.innerText = "리뷰 쓰기"
                        requestContractBtn.style.backgroundColor = "#bae1ff"
                        contractBtnContainer.append(requestContractBtn)

                        // hover 색변경 기능해제
                        requestContractBtn.onmouseover = function () { }
                        requestContractBtn.onmouseout = function () { }

                        // 리뷰 모달 열리는 함수 실행
                        requestContractBtn.addEventListener("click", reviewModalhandler = (e) => {
                            reviewModalView(roomData.item)
                        });
                    }
            }

            // 스크롤 가장 아래로 이동
            const chatAreaWrap = document.querySelector('.chat-area-wrap')
            chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight;
        }
    }
}


// 페이지 로드 시 실행되는 기능
document.addEventListener("DOMContentLoaded", async function () {

    // 로그인 유저일 경우
    const payload = JSON.parse(localStorage.getItem('payload'))
    if (payload != null) {

        // 채팅 모달과 알람 모달 생성
        new CreateElement().chatModalBtn()
        new CreateElement().chatModal()
        new CreateElement().alertModal()

        // 채팅 모달 데이터 요청 API
        let data = await chatModalApi()

        // 채팅방 생성
        for (let i = 0; i < data.length; i++) {
            new CreateElement().chatRoom(data[i])
        }

        // 채팅방 알람 효과
        new Alert().chatModalAlertEffect()

        // 알람 웹소켓
        new Websocket().alertWebsocket(data)

        // 읽지 않은 메세지 API
        unread_chatroom_list = await getUnreadMessageApi(userId)
        if (unread_chatroom_list.length != 0) {
            new Alert().navAlertEffect()
        }

        for (let i = 0; i < unread_chatroom_list.length; i++) {
            new CreateElement().alertMessage(unread_chatroom_list[i])
            new Alert().alertPastMessage(unread_chatroom_list[i])
        }
    }
})


// 채팅 모달 열기
async function openChatModal() {
    const chatBody = document.getElementsByClassName('chat-modal-body')[0]
    chatBody.style.animation = 'moveUp 0.5s'
    chatBody.style.display = 'flex'
    const chatBtn = document.getElementsByClassName('chat-btn')[0]
    chatBtn.setAttribute('onclick', 'closeChatModal()')
}


// 채팅 모달 닫기
function closeChatModal() {
    const chatBody = document.getElementsByClassName('chat-modal-body')[0]
    chatBody.style.animation = 'moveDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    const chatBtn = document.getElementsByClassName('chat-btn')[0]
    chatBtn.setAttribute('onclick', 'openChatModal()')
}


// 알람 메세지 및 문의하기 확인 버튼 클릭
function openDirectChatRoom(roomId) {
    const chatBody = document.getElementsByClassName('chat-modal-body')[0]
    if (getComputedStyle(chatBody).display == 'none') {
        openChatModal()
        openChatRoom(roomId)
    }
    else {
        openChatRoom(roomId)
    }
}


// 채팅방 열기
// 선택된 채팅방 웹소켓 주소 저장
var chatSocket = ''
var contractSocket = ''
async function openChatRoom(roomId) {

    // 이미 접속한 채팅, 거래 웹소켓이 있다면 종료
    if (chatSocket != '' && contractSocket != '') {
        chatSocket.close()
        contractSocket.close()
    }

    // 선택한 채팅방 스타일 효과
    $('.lend-room').attr('style', 'background-color: rgb(255, 239, 194)')
    $('.borrow-room').attr('style', 'background-color: rgb(191, 255, 194)')
    const selectedChatRoom = document.getElementById(`chat-room-${roomId}`)
    selectedChatRoom.style.boxShadow = '5px 5px 5px yellowgreen'

    // 선택한 채팅방 알람 효과 끄기
    new Alert().offAlertEffect(roomId)

    // 채팅룸 데이터 API
    const roomData = await chatRoomApi(roomId)

    // 채팅 웹소켓
    new Websocket().chatWebsocket(roomId)

    // 거래 웹소켓
    new Websocket().contractWebsocket(roomId, roomData)
    

    const chatAreaContainer = document.querySelector('.chat-area-container')

    // 채팅방 누를때 마다 안에 내용 삭제
    chatAreaContainer.replaceChildren();

    const chatAreaBox = document.createElement('div');
    chatAreaBox.setAttribute("class", "chat-area-box");
    chatAreaBox.style.justifyContent = 'normal';
    chatAreaContainer.append(chatAreaBox)

    // 물품 제목
    const titleSpan = document.createElement('span');
    titleSpan.innerText = roomData.title
    chatAreaBox.append(titleSpan)

    const contractBtnContainer = document.createElement('div');
    contractBtnContainer.setAttribute("class", "contract-btn-container");
    chatAreaBox.append(contractBtnContainer)

    // 문의자 화면
    if (roomData.inquirer.id == userId) {
        const requestContractBtn = document.createElement('button');
        requestContractBtn.setAttribute("class", "request-contract-btn");

        // contract status에 따른 문의자 버튼 텍스트,css 변경
        if (roomData.contract_status == null) {
            requestContractBtn.innerText = "대여 신청"
            contractBtnContainer.append(requestContractBtn)

            // 대여 신청 버튼 클릭 이벤트
            requestContractBtn.addEventListener('click', dateModalhandler = (e) => {
                rentalDateModalView(roomData.item, roomId, roomData.inquirer.id, roomData.author.id)
            })
        }
        else if (roomData.contract_status == "검토 중") {
            requestContractBtn.innerText = "대여 신청중"
            requestContractBtn.style.cursor = "auto"
            requestContractBtn.style.backgroundColor = "#b6faf6"
            contractBtnContainer.append(requestContractBtn)
        }
        else if (roomData.contract_status == "대여 중") {
            requestContractBtn.innerText = "대여 중인 물품"
            requestContractBtn.style.cursor = "auto"
            requestContractBtn.style.backgroundColor = "#fcffb3"
            contractBtnContainer.append(requestContractBtn)
        }
        else if (roomData.contract_status == "대여 종료") {
            if (roomData.is_reviewed == true) {
                requestContractBtn.innerText = "대여 종료된 물품"
                requestContractBtn.style.cursor = "auto"
                requestContractBtn.style.backgroundColor = "#fac7aa"
                contractBtnContainer.append(requestContractBtn)
            }
            else {
                requestContractBtn.innerText = "리뷰 쓰기"
                requestContractBtn.style.backgroundColor = "#bae1ff"
                contractBtnContainer.append(requestContractBtn)
                //리뷰 모달 열리는 함수 실행
                requestContractBtn.addEventListener("click", reviewModalhandler = (e) => {
                    reviewModalView(roomData.item)
                });
            }
        }
    }

    // 작성자 화면
    else {
        const endContractBtn = document.createElement('button');
        endContractBtn.setAttribute("class", "end-contract-btn");

        if (roomData.item_status == "대여 중") {
            endContractBtn.innerText = "대여 종료"
            contractBtnContainer.append(endContractBtn)

            // 대여 종료 버튼 클릭
            // 물품 상태를 대여 중 -> 대여 종료로 바꿈
            endContractBtn.addEventListener('click', (e) => {
                // 대여 상태 변경 API
                contractAcceptAndEndApi(itemId, "대여 종료")
                // 비동기로 버튼 바꿔줌
                endContractBtn.innerText = "대여 종료된 물품"
                endContractBtn.style.cursor = "auto"
                endContractBtn.style.backgroundColor = "#fac7aa"
            })
        }
        // 대여 종료 상태면 다시 등록하기 활성화
        else if (roomData.item_status == "대여 종료") {
            endContractBtn.innerText = "다시 등록 하기"
            endContractBtn.style.backgroundColor = "#a7fcf7"
            contractBtnContainer.append(endContractBtn)
            // 다시 등록하기 버튼을 누르면 물품 등록 페이지로 이동
            endContractBtn.addEventListener('click', (e) => {
                window.location.href = "../item/upload.html"
            })
        }
    }

    const chatAreaWrap = document.createElement('div');
    chatAreaWrap.setAttribute("class", "chat-area-wrap");
    chatAreaWrap.setAttribute("id", "messages");
    chatAreaBox.append(chatAreaWrap)
    
    const chatData = roomData['chat_messages']
    // 이전 채팅 메세지
    for (let i = 0; i < chatData.length; i++) {

        // 날짜가 다른 경우 날짜 표시
        if (i > 0 && chatData[i].date != chatData[i - 1].date) {
            const dateWrap = document.createElement('div');
            dateWrap.setAttribute("class", "date-wrap");
            dateWrap.innerHTML =
                `<div class="chat-date-stamp">
                <i class="fa-regular fa-calendar"></i>
                &nbsp;${chatData[i].date}
            </div>`
            chatAreaWrap.append(dateWrap)
        }

        // 대여 신청 메세지
        if (chatData[i].application == true && roomData.contract_status == '검토 중') {
            // 대여 신청 발신자
            if (chatData[i]['user'] == userId) {
                const contractWrap = document.createElement('div')
                contractWrap.setAttribute('class', 'contract-wrap')
                messages.append(contractWrap)

                const contractLook = document.createElement('div')
                contractLook.setAttribute('class', 'contract-look')
                contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
                contractLook.innerText = "대여 신청을 보냈습니다"
                contractWrap.append(contractLook)
            }
            // 대여 신청 수신자
            else {
                const contractWrap = document.createElement('div')
                contractWrap.setAttribute('class', 'contract-wrap')
                messages.append(contractWrap)

                const contractLook = document.createElement('div')
                contractLook.setAttribute('class', 'contract-look')
                contractLook.setAttribute('onclick', `checkRentalDateModal(${roomData.item})`)
                contractLook.innerText = "대여 신청이 도착했습니다"
                contractWrap.append(contractLook)

                // 대여 신청을 확인했습니다 메세지가 왜 필요한건가요???
                // if (roomData.item_status == "대여 중" || roomData.item_status == "대여 종료" || roomData.contract_status == null) {
                //     const contractLook = document.createElement('div')
                //     contractLook.setAttribute('class', 'contract-look')
                //     contractLook.innerText = "대여 신청을 확인했습니다"
                //     contractLook.style.backgroundColor = '#f0f0f0'
                //     contractLook.style.cursor = 'auto'
                //     contractWrap.append(contractLook)
                // }
            }
        }
        else if (chatData[i].application == true && roomData.contract_status == "대여 중") {
            //대여 수락 수신자
            if (chatData[i]['user'] != userId) {
                const contractWrap = document.createElement('div')
                contractWrap.setAttribute('class', 'contract-wrap')
                messages.append(contractWrap)

                const contractLook = document.createElement('div')
                contractLook.setAttribute('class', 'contract-look')
                contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
                contractLook.innerText = "대여 신청이 수락되었습니다"
                contractWrap.append(contractLook)
            }
        }
        else if (chatData[i].application == true && roomData.contract_status == "대여 가능") {
            //대여 거절 수신자
            if (chatData[i]['user'] != userId) {
                const contractWrap = document.createElement('div')
                contractWrap.setAttribute('class', 'contract-wrap')
                messages.append(contractWrap)

                const contractLook = document.createElement('div')
                contractLook.setAttribute('class', 'contract-look')
                contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
                contractLook.innerText = "대여 신청이 거절되었습니다"
                contractWrap.append(contractLook)
            }
        }
        else if (chatData[i].application == true && chatData[i].content == "대여 종료") {
            //대여 수락 수신자
            const contractWrap = document.createElement('div')
            contractWrap.setAttribute('class', 'contract-wrap')
            messages.append(contractWrap)

            const contractLook = document.createElement('div')
            contractLook.setAttribute('class', 'contract-look')
            contractLook.style.cssText = "background-color: #f0f0f0; cursor: auto;"
            contractLook.innerText = "대여가 종료되었습니다."
            contractWrap.append(contractLook)
        }
        // 채팅 메세지
        else if (chatData[i].application == false) {
            // 채팅 메세지 발신자
            if (chatData[i]['user'] == userId) {
                const myChatWrap = document.createElement('div');
                myChatWrap.setAttribute("class", "my-chat-wrap");
                myChatWrap.innerHTML = `<div class="chat-time-stamp">${chatData[i].time}</div>
                                        <div class="my-chat">${chatData[i].content}</div>`
                chatAreaWrap.append(myChatWrap)
            }
            // 채팅 메세지 수신자
            else {
                const otherChatWrap = document.createElement('div');
                otherChatWrap.setAttribute("class", "other-chat-wrap");
                otherChatWrap.innerHTML = `<div class="other-chat">${chatData[i].content}</div>
                                            <div class="chat-time-stamp">${chatData[i].time}</div>`
                chatAreaWrap.append(otherChatWrap)
            }
        }
    }

    const chatSendContainer = document.createElement('div')
    chatSendContainer.setAttribute("class", "chat-send-container")
    chatAreaContainer.append(chatSendContainer)

    const chatInput = document.createElement('textarea')
    chatInput.setAttribute("class", "chat-text")
    chatInput.setAttribute("type", "text")
    chatInput.setAttribute("name", "message")
    chatInput.setAttribute("rows", "1")
    chatInput.setAttribute("oninput", "calcTextareaHeight(this)")
    chatInput.setAttribute("placeholder", "채팅을 입력해주세요.")
    chatSendContainer.append(chatInput)

    const chatSendBtn = document.createElement('button')
    chatSendBtn.setAttribute("class", "chat-send-btn")
    chatSendBtn.innerHTML = `<i class="fa-solid fa-comment"></i>`
    chatSendContainer.append(chatSendBtn)

    chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight

    // 채팅 전송 버튼
    chatSendBtn.addEventListener('click', (e) => {
        const chatInput = document.querySelector('.chat-text')
        const inquirerId = roomData['inquirer']['id']
        let authorId = roomData['author']['id']

        // 채팅 발신하는 유저가 물품 등록자(author)일 경우,
        // 채팅 수신자를 문의자(inquirer)로 수정
        if (userId == authorId) {
            authorId = inquirerId
        }

        // 채팅 메세지 전송
        if (chatInput.value != '') {
            const message = chatInput.value
            chatSocket.send(JSON.stringify({
                'message': message,
                'sender': userId,
                'receiver': authorId,
                'room_id': roomId,
            }))
            chatInput.value = ''
            chatInput.focus()

            // 채팅 알림 웹소켓 통신
            chatAlertSocket = new WebSocket(`ws://127.0.0.1:8000/chats/alerts/${authorId}`)

            // 상대방에게 채팅 알람 보냄
            chatAlertSocket.onopen = function () {
                chatAlertSocket.send(JSON.stringify({
                    'room_id': roomId,
                    'sender': userId,
                    'receiver': authorId,
                    'title': roomData.title,
                    'status': null,
                }))
            }
        }
    })

    // 채팅 전송 엔터키 허용
    $(".chat-text").keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            $(".chat-send-btn").click()
        }
    })
}


// 채팅 입력 길이에 맞춰서 높이 조절
function calcTextareaHeight(e) {
    e.style.height = 'auto'
    e.style.height = `${e.scrollHeight}px`
}


// 대여 신청 발신자 모달 뷰
function rentalDateModalView(itemId, roomId, inquirerId, authorId) {

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
    rentalApply.innerText = "대여 신청"
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
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

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
    rentalSubmitBtn.addEventListener('click', async (e) => {
        if ((new Date(endTime.value) - new Date(startTime.value)) / 3600000 < 1) {
            alert('대여 종료일을 대여 시작일로부터 1시간 이후로 설정해주세요')
        }
        else {
            // 대여 신청 API
            let data = await rentalSubmitApi(itemId)
            // 대여 신청 모달 unview
            body.style.overflow = 'auto'
            rentalDateModalBody.style.display = 'none'

            // 채팅 발신하는 유저가 물품 등록자(author)일 경우,
            // 채팅 수신자를 문의자(inquirer)로 수정
            if (userId == authorId) {
                authorId = inquirerId
            }

            // 대여 신청 웹소켓으로 보내기
            contractSocket.send(JSON.stringify({
                'room_id': roomId,
                'sender': userId,
                'receiver': authorId,
                'status': '대여 신청',
            }))

            // 채팅 알림 웹소켓 통신
            chatAlertSocket = new WebSocket(`ws://127.0.0.1:8000/chats/alerts/${authorId}`)

            // 메세지 작성 시간
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset())  // 한국시간으로

            // 상대방에게 알람 보냄
            chatAlertSocket.onopen = function () {
                chatAlertSocket.send(JSON.stringify({
                    'room_id': roomId,
                    'sender': userId,
                    'receiver': authorId,
                    'status': '대여 신청'
                }))
            }
            rentalSubmitBtn.remove();
        }
    });
}


// 대여 신청 수신자 버튼 모달
async function checkRentalDateModal(itemId) {

    // 대여 정보 조회 API
    const contractDetailData = await contractDetailApi(itemId)

    const startDate = timeFormat(contractDetailData['start_date'])
    const endDate = timeFormat(contractDetailData['end_date'])

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
    rentalApply.innerText = "대여 신청 확인"
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

    const contractAcceptBtn = document.createElement('button');
    contractAcceptBtn.setAttribute("class", "rental-date-submit-btn");
    contractAcceptBtn.setAttribute("name", "대여 중");
    contractAcceptBtn.innerText = "수락"
    rentalDateContainer.append(contractAcceptBtn)

    const askSign = document.createElement('div');
    askSign.setAttribute("class", "ask-sign");
    rentalDateContainer.append(askSign)

    const cancelRental = document.createElement('a');
    cancelRental.setAttribute("class", "cancel-rental");
    cancelRental.innerText = "거절"
    askSign.append(cancelRental)

    const inquiryId = contractDetailData.user

    // 대여 신청 거절 버튼
    cancelRental.addEventListener('click', async (e) => {
        // 대여 거절 API
        let refuseData = await contractRefuseApi(itemId)
        let message = "대여 거절"
        // // 대여 거절 웹소켓 요청
        rentalSocket.send(JSON.stringify({
            'item_id': itemId,
            'message': message,
            'sender': userId,
            'receiver': inquiryId,
            'room_id': refuseData.room_id,
            'status': '대여 거절',
        }))

        const contractLook = document.getElementsByClassName('contract-look')
        // 대여 신청 수락시, 신청서 버튼 비활성화
        for (let i = 0; i < contractLook.length; i++) {
            contractLook[i].style.backgroundColor = '#f0f0f0'
            contractLook[i].style.cursor = 'auto'
            contractLook[i].setAttribute('onclick', "")
            contractLook[i].innerText = "대여 신청을 확인했습니다"
        }

        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'
    })

    // 대여 신청 수신 모달 unview
    addEventListener('click', (e) => {
        if (e.target == rentalDateModalBody) {
            body.style.overflow = 'auto'
            rentalDateModalBody.remove()
        }
    })

    // 대여 신청 수락 버튼
    contractAcceptBtn.addEventListener('click', async (e) => {

        // 대여 상태 변경 API
        // 물품 상태를 대여 가능 -> 대여 중으로 바꿈
        let acceptData = await contractAcceptAndEndApi(itemId, "대여 중")
        let message = "대여 수락"
        // 대여 거절 웹소켓 요청
        rentalSocket.send(JSON.stringify({
            'item_id': itemId,
            'message': message,
            'sender': userId,
            'receiver': inquiryId,
            'room_id': acceptData.room_id,
            'status': '대여 수락'
        }))

        const contractLook = document.getElementsByClassName('contract-look')
        // 대여 신청 수락시, 신청서 버튼 비활성화
        for (let i = 0; i < contractLook.length; i++) {
            contractLook[i].style.backgroundColor = '#f0f0f0'
            contractLook[i].style.cursor = 'auto'
            contractLook[i].setAttribute('onclick', "")
            contractLook[i].innerText = "대여 신청을 확인했습니다"
        }

        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'

        const contractBtnContainer = document.querySelector('.contract-btn-container')
        contractBtnContainer.replaceChildren()

        const endContractBtn = document.createElement('button');
        endContractBtn.setAttribute("class", "end-contract-btn");
        endContractBtn.innerText = "대여 종료"

        // 대여 종료 버튼 클릭
        // 물품 상태를 대여 중 -> 대여 종료로 바꿈
        endContractBtn.addEventListener('click', async (e) => {
            alert("대여가 종료 되었습니다.")
            // 대여 상태 변경 API
            let endData = await contractAcceptAndEndApi(itemId, "대여 종료")

            let message = "대여 종료"
            // 대여 거절 웹소켓 요청
            rentalSocket.send(JSON.stringify({
                'item_id': itemId,
                'message': message,
                'sender': userId,
                'receiver': inquiryId,
                'room_id': endData.room_id,
                'status': '대여 종료'
            }))
            endContractBtn.innerText = "대여 종료된 물품"
            endContractBtn.style.cursor = "auto"
            endContractBtn.style.backgroundColor = "#fac7aa"
        })
        contractBtnContainer.append(endContractBtn)
    })
}


// 대여 신청 수신 날짜 포맷팅
function timeFormat(date) {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8, 10)
    const hour = date.substring(11, 13)
    const minute = date.substring(14, 16)
    const formatedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minute}`

    return formatedDate
}


function reviewModalUnview() {
    const reviewModalBody = document.querySelector('.review-modal-body');
    body.style.overflow = 'auto'
    reviewModalBody.remove()
}

function reviewModalView(itemId) {

    const body = document.getElementsByTagName('body')[0]

    const reviewModalBody = document.createElement('div');
    reviewModalBody.setAttribute("class", "review-modal-body");
    body.append(reviewModalBody)

    const reviewContainer = document.createElement('div');
    reviewContainer.setAttribute("class", "review-modal-container");
    reviewContainer.setAttribute("id", "review-modal-container");
    reviewModalBody.append(reviewContainer)

    const reviewModalHeader = document.createElement('h2');
    reviewModalHeader.setAttribute("class", "review-write");
    reviewModalHeader.innerText = "리뷰작성"
    reviewContainer.append(reviewModalHeader)

    const rating = document.createElement('div');
    rating.setAttribute("class", "rating");

    for (let i = 5; i > 0; i--) {
        const ratingSpan = document.createElement('span');
        const radioRating = document.createElement('input');

        radioRating.setAttribute("type", "radio");
        radioRating.setAttribute("name", "rating");
        radioRating.setAttribute("id", `str${i}`);
        radioRating.setAttribute("value", `${i}`);
        ratingSpan.append(radioRating)

        const ratingLabel = document.createElement('label');
        ratingLabel.setAttribute("for", `str${i}`);
        ratingLabel.innerText = '★'
        ratingSpan.append(ratingLabel)
        rating.append(ratingSpan)
    }

    reviewContainer.append(rating)

    const reviewContent = document.createElement('textarea');
    reviewContent.setAttribute("id", "review");
    reviewContent.setAttribute("name", "review");
    reviewContent.setAttribute("rows", "5");
    reviewContent.setAttribute("cols", "33");
    reviewContent.setAttribute("placeholder", "리뷰를 작성해주세요.");
    reviewContainer.append(reviewContent)

    const reviewSubmitBtn = document.createElement('button');
    reviewSubmitBtn.setAttribute("class", "review-submit-btn");
    reviewSubmitBtn.innerText = "작성 하기"
    reviewContainer.append(reviewSubmitBtn)

    reviewSubmitBtn.addEventListener('click', (e) => {
        onReviewSubmit(itemId)

        //리뷰 작성 하고, 리뷰 쓰기 버튼 -> 대여 종료된 물품으로 변경
        const requestContractBtn = document.querySelector('.request-contract-btn')
        requestContractBtn.innerText = "대여 종료된 물품"
        requestContractBtn.style.cursor = "auto"
        requestContractBtn.style.backgroundColor = "#fac7aa"
        requestContractBtn.removeEventListener("click", reviewModalhandler);
    })

    const askSign = document.createElement('div');
    askSign.setAttribute("class", "ask-sign");
    reviewContainer.append(askSign)

    const skipReview = document.createElement('a');
    skipReview.setAttribute("class", "skip-review");
    skipReview.innerText = '건너 뛰기'
    askSign.append(skipReview)

    addEventListener('click', (e) => {
        if (e.target == reviewModalBody | e.target == skipReview) {
            reviewModalUnview()
        }
    })

    // 리뷰 평점 별점 핸들링
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    //별점 인풋을 누르면 값을 유저평점 변수에 저장
    $('input:radio').change(function () {
        var userRating = this.value;
    });

    body.style.overflow = 'hidden'
    reviewModalBody.style.display = 'flex'
    reviewContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}