// Element 생성 클래스
class CreateElement {
    constructor() {
        this.body = document.querySelector('body')
    }

    // 모달 박스 생성
    modalBtnBox() {
        const modalBtnBox = document.createElement('div')
        modalBtnBox.setAttribute('class', 'modal-btn-box')
        this.body.append(modalBtnBox)
    }

    // 채팅 모달 버튼, 등록 버튼 생성
    chatAndUploadBtn() {
        const modalBtnBox = document.querySelector('.modal-btn-box')
        const chatBtn = document.createElement('button')
        chatBtn.setAttribute('class', 'chat-btn')
        chatBtn.setAttribute('onclick', 'openChatModal()')
        chatBtn.innerHTML = `<i class="fa-solid fa-comment" id="chat-icon"></i>`
        modalBtnBox.append(chatBtn)
        const chatText = document.createElement('div')
        chatText.innerText = '채팅'
        chatBtn.append(chatText)
        const uploadBtn = document.createElement('button')
        uploadBtn.setAttribute('id', 'upload-btn')
        uploadBtn.setAttribute('class', 'material-symbols-outlined')
        uploadBtn.setAttribute('onclick', 'goUploadPage()')
        uploadBtn.innerText = 'add'
        modalBtnBox.append(uploadBtn)
        const uploadText = document.createElement('div')
        uploadText.innerText = '등록'
        uploadBtn.append(uploadText)

        const isDarkMode = localStorage.getItem('darkMode')
        if (isDarkMode) {
            chatBtn.classList.add('dark-mode')
            uploadBtn.classList.add('dark-mode')
        }
    }

    // 채팅 모달 생성
    chatModal() {
        const chatBody = document.createElement('div')
        chatBody.setAttribute("class", "chat-modal-body")
        this.body.append(chatBody)

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
        chatAreaBox.append(selectSpan)

        const isDarkMode = localStorage.getItem('darkMode')
        if (isDarkMode) {
            chatBody.classList.add('dark-mode')
            chatContainer.classList.add('dark-mode')
            chatRoomsContainer.classList.add('dark-mode')
            chatAreaContainer.classList.add('dark-mode')
        }
    }

    // 채팅방 생성
    chatRoom(data, userId) {
        let authorId = data.author.id
        let authorNickname = data.author.nickname
        let inquirerNickname = data.inquirer.nickname

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
            chatRoom.classList.add('lend-room')
            chatRoom.append(spanNickname)
        }
        else {
            spanNickname.innerText = authorNickname
            chatRoom.classList.add('borrow-room')
            chatRoom.append(spanNickname)
        }

        const isDarkMode = localStorage.getItem('darkMode')
        if (isDarkMode) {
            chatRoom.classList.add('dark-mode')
            spanNickname.classList.add('dark-mode')
        }
    }


    // 채팅방 내용 생성
    async chatRoomElements(roomId, roomData) {
        let userId = payload.user_id
        let itemTitle = roomData.title
        let itemId = roomData.item
        let inquirerId = roomData.inquirer.id
        let authorId = roomData.author.id
        let contractStatus = roomData.contract_status
        let isReviewed = roomData.is_reviewed

        const chatAreaContainer = document.querySelector('.chat-area-container')

        // 채팅방 누를때 마다 안에 내용 삭제
        chatAreaContainer.replaceChildren();

        const chatAreaBox = document.createElement('div');
        chatAreaBox.setAttribute("class", "chat-area-box");
        chatAreaBox.style.justifyContent = 'normal';
        chatAreaContainer.append(chatAreaBox)

        // 물품 제목
        const titleSpan = document.createElement('span');
        titleSpan.innerText = itemTitle
        chatAreaBox.append(titleSpan)

        const contractBtnContainer = document.createElement('div');
        contractBtnContainer.setAttribute("class", "contract-btn-container");
        chatAreaBox.append(contractBtnContainer)

        const isDarkMode = localStorage.getItem('darkMode')
        if (isDarkMode) {
            contractBtnContainer.classList.add('dark-mode')
        }

        // 문의자 화면
        if (inquirerId == userId) {
            const requestContractBtn = document.createElement('button');
            requestContractBtn.setAttribute("class", "request-contract-btn");

            // contract status에 따른 문의자 버튼 텍스트,css 변경
            switch (contractStatus) {
                case null:
                    if (itemTitle == '삭제된 물품입니다') {
                        requestContractBtn.style.display = 'none'
                    }
                    requestContractBtn.innerText = "대여 신청"
                    // 대여 신청 버튼 클릭 이벤트
                    requestContractBtn.setAttribute("onclick", `rentalDateModalView(${itemId}, ${roomId}, ${inquirerId}, ${authorId})`)
                    contractBtnContainer.append(requestContractBtn)
                    break

                case "검토 중":
                    requestContractBtn.innerText = "대여 신청중"
                    requestContractBtn.style.cssText = "background-color: #b6faf6; cursor: auto;"
                    contractBtnContainer.append(requestContractBtn)
                    break

                case "대여 중":
                    requestContractBtn.innerText = "대여 중인 물품"
                    requestContractBtn.style.cssText = "background-color: #fcffb3; cursor: auto;"
                    contractBtnContainer.append(requestContractBtn)
                    break

                case "대여 종료":
                    if (isReviewed == true) {
                        requestContractBtn.innerText = "대여 종료된 물품"
                        requestContractBtn.style.cssText = "background-color: #fac7aa; cursor: auto;"
                        contractBtnContainer.append(requestContractBtn)
                    }
                    else {
                        requestContractBtn.innerText = "리뷰 쓰기"
                        requestContractBtn.style.cssText = "background-color: #bae1ff; cursor: pointer;"
                        //리뷰 모달 열리는 함수 실행
                        requestContractBtn.setAttribute("onclick", `reviewModalView(${itemId})`)
                        contractBtnContainer.append(requestContractBtn)
                    }
            }
        }
        // 작성자 화면
        else {
            const endContractBtn = document.createElement('button');
            endContractBtn.setAttribute("class", "end-contract-btn");

            switch (contractStatus) {
                case "대여 중":
                    endContractBtn.innerText = "대여 종료하기"
                    contractBtnContainer.append(endContractBtn)
    
                    // 대여 종료 버튼 클릭
                    // 물품 상태를 대여 중 -> 대여 종료로 바꿈
                    endContractBtn.addEventListener('click', async (e) => {
                        alert("대여가 종료 되었습니다.")
                        // 대여 상태 변경 API
                        await contractAcceptAndEndApi(itemId, "대여 종료", roomId)

                        let contractType = "종료"
                        // 대여 거절 웹소켓 요청
                        contractSocket.send(JSON.stringify({
                            'item_id': itemId,
                            'sender': payload.user_id,
                            'receiver': inquirerId,
                            'room_id': roomId,
                            'contract_type': contractType
                        }))
                        endContractBtn.innerText = "대여 종료된 물품"
                        endContractBtn.style.cursor = "auto"
                        endContractBtn.style.backgroundColor = "#fac7aa"
                    })
                    break

                case "대여 종료":
                    // 대여 종료 상태면 다시 등록하기 활성화
                    endContractBtn.innerText = "다시 등록하기"
                    endContractBtn.style.backgroundColor = "#a7fcf7"
                    contractBtnContainer.append(endContractBtn)
                    // 다시 등록하기 버튼을 누르면 물품 등록 페이지로 이동
                    endContractBtn.addEventListener('click', (e) => {
                        reUploadItemApi(itemId, "대여 가능")
                    })
            }
        }

        const chatAreaWrap = document.createElement('div');
        chatAreaWrap.setAttribute("class", "chat-area-wrap");
        chatAreaWrap.setAttribute("id", "messages");
        chatAreaBox.append(chatAreaWrap)

        const messages = document.getElementById('messages')
        const chatMessages = roomData.chat_messages
        // 이전 채팅 메시지
        for (let i = 0; i < chatMessages.length; i++) {
            let isApplication = chatMessages[i].application
            let sender = chatMessages[i].user
            let message = chatMessages[i].content
            let timeStamp = chatMessages[i].time
            let contractType = chatMessages[i].contract_type

            // 날짜가 다른 경우 날짜 표시
            if (i > 0 && chatMessages[i].date != chatMessages[i - 1].date) {
                const dateWrap = document.createElement('div');
                dateWrap.setAttribute("class", "date-wrap");
                chatAreaWrap.append(dateWrap)

                const chatDateStamp = document.createElement('div');
                chatDateStamp.setAttribute("class", "chat-date-stamp");
                dateWrap.append(chatDateStamp);

                const calendarIcon = document.createElement('i');
                calendarIcon.setAttribute("class", "fa-regular fa-calendar");
                chatDateStamp.append(calendarIcon);

                chatDateStamp.innerText = chatMessages[i].date
            }

            // isApplication true = 거래 상태 메시지, false = 일반 채팅 메시지
            const cssText = "background-color: #f0f0f0; cursor: auto;"
            switch (isApplication) {
                //대여신청 메시지 일때,
                case true:
                    switch (contractType) {
                        case "신청":
                            // 대여 신청 [발신자]
                            if (sender == userId) {
                                new CreateElement().contractMessage(messages, "대여 신청을 보냈습니다", cssText)
                            }
                            // 대여 신청 [수신자]
                            else {
                                let contractLook = new CreateElement().contractMessage(messages, "대여 신청이 도착했습니다")
                                contractLook.setAttribute('onclick', `checkRentalDateModal(${itemId}, ${roomId})`)
                            }
                            break

                        case "확인":
                            // 대여 확인 [발신자]
                            if (sender == userId) {
                                new CreateElement().contractMessage(messages, "대여 신청을 보냈습니다", cssText)
                            }
                            else {
                                new CreateElement().contractMessage(messages, "대여 신청을 확인했습니다", cssText)
                            }
                            break

                        case "수락":
                            // 대여 수락 [수신자]
                            if (sender != userId) {
                                new CreateElement().contractMessage(messages, "대여 신청이 수락되었습니다", cssText)
                            }
                            // 대여 수락 [발신자]
                            else {
                                new CreateElement().contractMessage(messages, "대여 신청을 수락했습니다", cssText)
                            }
                            break

                        case "거절":
                            // 대여 거절 [수신자]
                            if (sender != userId) {
                                new CreateElement().contractMessage(messages, "대여 신청이 거절되었습니다", cssText)
                            }
                            // 대여 거절 [발신자]
                            else {
                                new CreateElement().contractMessage(messages, "대여 신청을 거절했습니다", cssText)
                            }
                            break

                        case "종료":
                            //대여 종료 [수신자, 발신자]
                            new CreateElement().contractMessage(messages, "대여가 종료되었습니다.", cssText)
                    }
                    break

                //일반 채팅 메시지일때
                case false:
                    // 채팅 메시지 발신자
                    if (sender == userId) {
                        const myChatWrap = document.createElement('div');
                        myChatWrap.setAttribute("class", "my-chat-wrap");
                        chatAreaWrap.append(myChatWrap)

                        //채팅 타임스탬프
                        const chatTimeStamp = document.createElement('div');
                        chatTimeStamp.setAttribute("class", "chat-time-stamp");
                        chatTimeStamp.innerText = timeStamp
                        myChatWrap.append(chatTimeStamp);

                        //채팅 메시지
                        const myChat = document.createElement('div');
                        myChat.setAttribute("class", "my-chat");
                        myChat.innerText = message
                        myChatWrap.append(myChat);

                        const isDarkMode = localStorage.getItem('darkMode')
                        if (isDarkMode) {
                            myChat.classList.add('dark-mode')
                        }
                    }
                    // 채팅 메시지 수신자
                    else {
                        const otherChatWrap = document.createElement('div');
                        otherChatWrap.setAttribute("class", "other-chat-wrap");
                        chatAreaWrap.append(otherChatWrap)
                        
                        //채팅 메시지
                        const otherChat = document.createElement('div');
                        otherChat.setAttribute("class", "other-chat");
                        otherChat.innerText = message
                        otherChatWrap.append(otherChat);

                        //채팅 타임스탬프
                        const chatTimeStamp = document.createElement('div');
                        chatTimeStamp.setAttribute("class", "chat-time-stamp");
                        chatTimeStamp.innerText = timeStamp
                        otherChatWrap.append(chatTimeStamp);

                        const isDarkMode = localStorage.getItem('darkMode')
                        if (isDarkMode) {
                            otherChat.classList.add('dark-mode')
                        }
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
        chatSendBtn.addEventListener('click', async (e) => {

            // 채팅 발신하는 유저가 물품 등록자(author)일 경우,
            // 채팅 수신자를 문의자(inquirer)로 수정
            if (userId == authorId) {
                authorId = inquirerId
            }

            // 채팅 메시지 전송
            if (chatInput.value != '') {
                // 채팅 웹소켓 보내기
                new Websocket().sendChat(chatSocket, userId, authorId, roomId)
                // 알림 웹소켓 보내기
                new Websocket().sendAlert(roomId, userId, authorId, null)
            }
        })

        // 채팅 전송 엔터키 허용
        $(".chat-text").keydown(function (e) {
            if (e.keyCode === 13) {
                e.preventDefault()
                $(".chat-send-btn").click()
            }
        })

        if (isDarkMode) {
            chatInput.style.backgroundColor = 'gainsboro'
            chatInput.style.color = 'black'
            chatSendBtn.classList.add('dark-mode')
        }
    }

    // 채팅방 거래 상태 메시지
    contractMessage(message, innerText, cssText) {
        const contractWrap = document.createElement('div')
        contractWrap.setAttribute('class', 'contract-wrap')
        message.append(contractWrap)

        const contractLook = document.createElement('div')
        contractLook.setAttribute('class', 'contract-look')
        contractWrap.append(contractLook)

        contractLook.style.cssText = cssText
        contractLook.innerText = innerText

        const isDarkMode = localStorage.getItem('darkMode')
        if (isDarkMode) {
            contractLook.style.backgroundColor = 'gainsboro'
            contractLook.style.color = 'black'
        }

        return contractLook
    }

    // 알림 모달 생성
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
        chatAlertModalMessageNotting.innerText = '알림이 없습니다'
        chatAlertModalWrap.append(chatAlertModalMessageNotting)

        const isDarkMode = localStorage.getItem('darkMode')
        if (isDarkMode) {
            chatAlertModalMessageNotting.style.backgroundColor = '#092c3e'
        }
    }
    // 알림 메시지 생성
    alertMessage(data) {
        if (document.getElementsByName(`chat-alert-modal-message-button-${data.room_id}`)[0] == null) {
            // 알림 메시지 생성
            const chatAlertModalMessageButton = document.createElement('p')
            chatAlertModalMessageButton.setAttribute('class', 'chat-alert-modal-message-button')
            chatAlertModalMessageButton.setAttribute('name', `chat-alert-modal-message-button-${data.room_id}`)
            chatAlertModalMessageButton.setAttribute('onclick', `openDirectChatRoom(${data.room_id})`)
            const chatAlertModalWrap = document.getElementsByClassName('chat-alert-modal-wrap')[0]
            chatAlertModalWrap.append(chatAlertModalMessageButton)
            new Alert().showAlarmModal()
        }
    }
}


// 알림 관련 기능
class Alert {

    // 알림 모달 show
    showAlarmModal() {
        const chatAlertModalWrap = document.querySelector('.chat-alert-modal-wrap')
        chatAlertModalWrap.style.display = 'flex'
        const alarmBtn = document.querySelector('#alarm-icon')
        alarmBtn.setAttribute('onclick', 'new Alert().hideAlarmModal()')
    }
    
    // 알림 모달 hide
    hideAlarmModal() {
        const chatAlertModalWrap = document.querySelector('.chat-alert-modal-wrap')
        chatAlertModalWrap.style.display = 'none'
        const alarmBtn = document.querySelector('#alarm-icon')
        alarmBtn.setAttribute('onclick', 'new Alert().showAlarmModal()')
    }

    // 알림 효과 (알림 모달)
    navAlertEffect() {
        const chatAlertModalMessageNotting = document.getElementsByClassName('chat-alert-modal-message-notting')[0]
        chatAlertModalMessageNotting.style.display = 'none'
        const chatAlertEffect = document.getElementsByClassName('chat-alert-effect')[0]
        chatAlertEffect.style.display = 'block'
        const alarmBtn = document.querySelector('#alarm-icon')
        alarmBtn.style.color = 'red'
    }

    // 알림 효과 (채팅 모달)
    chatModalAlertEffect(data) {
        const chatRoom = document.getElementById(`chat-room-${data.room_id}`)
        chatRoom.children[0].style.display = 'block'
    }

    // 알림 효과 끄기
    offAlertEffect(roomId) {
        // 알림창의 해당 채팅방 메시지 삭제
        const chatAlertModalMessageButton = document.getElementsByName(`chat-alert-modal-message-button-${roomId}`)[0]
        if (chatAlertModalMessageButton) {
            chatAlertModalMessageButton.remove()
        }
        // 모든 알림 확인 시
        const chatAlertModalMessageButton_list = document.getElementsByClassName('chat-alert-modal-message-button')
        if (chatAlertModalMessageButton_list.length == 0) {
            this.hideAlarmModal()
            const chatAlertEffect = document.getElementsByClassName('chat-alert-effect')[0]
            const chatAlertModalMessageNotting = document.getElementsByClassName('chat-alert-modal-message-notting')[0]
            const chatAlarmBtn = document.querySelector('#alarm-icon')
            chatAlertEffect.style.display = 'none'
            chatAlertModalMessageNotting.style.display = 'block'
            chatAlarmBtn.style.color = 'black'
        }
        // 채팅 모달의 채팅방 알림 끄기
        const chatRoom = document.getElementById(`chat-room-${roomId}`)
        if (chatRoom) {
            chatRoom.children[0].style.display = 'none'
        }
    }

    // 알림 메시지 작성 (이전 메시지)
    alertNotReadMessage(data) {
        // 제목이 긴 경우 자름
        if (data.title.length > 5) {
            data.title = `${data.title.slice(0, 5)}...`
        }

        // 지난 시간 계산
        let pastTime = parseInt((new Date - new Date(data.created_at)) / 1000 / 60)
        if (pastTime < 1) {
            pastTime = '방금'
        }
        else if (pastTime <= 60) {
            pastTime = `${pastTime}분 전`
        }
        else if ((pastTime / 60) <= 24) {
            pastTime = `${parseInt(pastTime / 60)}시간 전`
        }
        else {
            pastTime = `${parseInt(pastTime / 60 / 24)}일 전`
        }

        const chatAlertModalMessageButton = document.getElementsByName(`chat-alert-modal-message-button-${data.room_id}`)[0]
        // 채팅 메시지일 경우
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

    // 알림 메시지 작성 (실시간 알림)
    MessageInnerText(data) {
        if (data.title.length > 5) {
            data.title = `${data.title.slice(0, 5)}...`
        }

        const chatAlertModalMessageButton = document.getElementsByName(`chat-alert-modal-message-button-${data.room_id}`)[0]
        // 채팅 메시지일 경우
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

    // 알림 메시지 삭제 및 채팅방 열기
    async alertMessageClick(roomId) {

        // 알림 메시지 삭제
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

        // 알림 효과 끄기
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

    // 알림 웹소켓 연결 및 온메시지
    alertWebsocket(userId) {
        chatAlertSocket = new WebSocket(`${webSocketBaseUrl}/chats/alerts/${userId}`)
        // 알림 수신
        chatAlertSocket.onmessage = function (e) {
            // 알림 데이터
            let data = JSON.parse(e.data)
            if (chatSocket.url != `${webSocketBaseUrl}/chats/${data.room_id}`) {
                // 알림 메시지 및 효과생성
                new CreateElement().alertMessage(data)
                new Alert().alertNotReadMessage(data)
                new Alert().navAlertEffect()
                new Alert().chatModalAlertEffect(data)
                // 처음 온 채팅이면 채팅방을 새로 만듬
                const selectedChatRoom = document.querySelector(`#chat-room-${data.room_id}`)
                if (selectedChatRoom == null) {
                    const chatRoom = document.createElement('div')
                    chatRoom.setAttribute("class", "chat-room")
                    chatRoom.setAttribute("id", `chat-room-${data.room_id}`)
                    chatRoom.setAttribute("onclick", `openChatRoom(${data.room_id})`)

                    const chatRoomsContainer = document.getElementsByClassName('chat-rooms-container')[0]
                    chatRoomsContainer.append(chatRoom)

                    const spanNickname = document.createElement('span')
                    spanNickname.setAttribute("class", "nickname")

                    const chatRoomAlertEffect = document.createElement('section')
                    chatRoomAlertEffect.setAttribute('class', 'chat-room-alert-effect')
                    chatRoom.append(chatRoomAlertEffect)

                    spanNickname.innerText = data.sender
                    chatRoom.style.backgroundColor = "rgb(255, 239, 194)"
                    chatRoom.setAttribute("class", "chat-room lend-room")
                    chatRoom.append(spanNickname)
                }
            }
        }
    }

    // 알림 웹소켓 보내기
    sendAlert(roomId, senderId, receiverId, contractStatus) {
        // 상대방에게 채팅 알림 보냄
        chatAlertSocket.send(JSON.stringify({
            'room_id': roomId,
            'sender': senderId,
            'receiver': receiverId,
            'status': contractStatus,
            'created_at': Date.now(),
        }))
    }

    // 채팅 웹소켓 연결 및 온메시지
    chatWebsocket(roomId) {

        chatSocket = new WebSocket(`${webSocketBaseUrl}/chats/${roomId}`)

        // 채팅 수신
        chatSocket.onmessage = async function (e) {

            const messages = document.getElementById('messages')
            let chatData = JSON.parse(e.data)
            let chatSender = chatData.sender
            let message = chatData.message
            let timeStamp = chatData.time
            const isDarkMode = localStorage.getItem('darkMode')
            // 채팅 발신자 화면
            if (chatSender == payload.user_id) {
                const myChatWrap = document.createElement('div');
                myChatWrap.setAttribute('class', 'my-chat-wrap');
                messages.append(myChatWrap);

                const chatTimeStamp = document.createElement('div');
                chatTimeStamp.setAttribute('class', 'chat-time-stamp');
                chatTimeStamp.innerText = timeStamp
                myChatWrap.append(chatTimeStamp);

                const myChat = document.createElement('div');
                myChat.setAttribute('class', 'my-chat');
                myChat.innerText = message
                myChatWrap.append(myChat);

                if (isDarkMode) {
                    myChat.classList.add('dark-mode')
                }
            }
            // 채팅 수신자 화면
            else {
                // 백엔드에 통신해서 is_read = True 로 바꿈
                await liveReadApi(roomId)

                const otherChatWrap = document.createElement('div');
                otherChatWrap.setAttribute('class', 'my-chat-wrap');
                messages.append(otherChatWrap);

                const otherChat = document.createElement('div');
                otherChat.setAttribute('class', 'my-chat');
                otherChat.innerText = message
                otherChatWrap.append(otherChat);

                const chatTimeStamp = document.createElement('div');
                chatTimeStamp.setAttribute('class', 'chat-time-stamp');
                chatTimeStamp.innerText = timeStamp
                otherChatWrap.append(chatTimeStamp);

                if (isDarkMode) {
                    otherChat.classList.add('dark-mode')
                }

            }
            // 스크롤 가장 아래로 내림
            const chatAreaWrap = document.querySelector('.chat-area-wrap')
            chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight;
        }
    }

    // 채팅 웹소켓 보내기
    sendChat(chatSocket, userId, authorId, roomId) {
        const chatInput = document.querySelector('.chat-text')
        const message = chatInput.value
        chatSocket.send(JSON.stringify({
            'message': message,
            'sender': userId,
            'receiver': authorId,
            'room_id': roomId,
        }))
        chatInput.value = ''
        chatInput.focus()
    }

    // 거래 웹소켓 연결 및 온메시지
    contractWebsocket(roomId, roomData) {

        contractSocket = new WebSocket(`${webSocketBaseUrl}/chats/contracts/${roomId}`)

        // room데이터
        let itemId = roomData.item
        let inquirerId = roomData.inquirer.id
        let authorId = roomData.author.id
        let userId = JSON.parse(localStorage.getItem('payload')).user_id

        // 거래 웹소켓 수신
        contractSocket.onmessage = function (e) {

            const messages = document.getElementById('messages')

            const contractBtnContainer = document.querySelector('.contract-btn-container')

            // 채팅방 상단 제목아래 버튼
            const requestContractBtn = document.querySelector('.request-contract-btn')

            // 요청받은 데이터
            let contractData = JSON.parse(e.data)

            let contractType = contractData.contract_type
            let contractSender = contractData.sender
            let cssText = "background-color: #f0f0f0; cursor: auto;"

            // 거래 상태에 따른 비동기 UI변경 로직
            switch (contractType) {
                case "신청":
                    // 대여 신청 발신자
                    if (contractSender == userId) {
                        new CreateElement().contractMessage(messages, "대여 신청을 보냈습니다", cssText)

                        requestContractBtn.innerText = "대여 신청중"
                        requestContractBtn.style.cssText = "background-color: #b6faf6; cursor: auto;"
                        requestContractBtn.setAttribute("onclick", "")

                        // hover 색변경 기능해제
                        requestContractBtn.onmouseover = function () { }
                        requestContractBtn.onmouseout = function () { }
                    }
                    // 대여 신청 수신자
                    else {
                        let contractLook = new CreateElement().contractMessage(messages, "대여 신청이 도착했습니다")
                        contractLook.setAttribute('onclick', `checkRentalDateModal(${itemId}, ${roomId})`)
                    }
                    break
                case "수락":
                    //수신자
                    if (contractSender != userId) {
                        requestContractBtn.innerText = "대여 중인 물품"
                        requestContractBtn.style.cssText = "background-color: #fcffb3; cursor: auto;"
                        contractBtnContainer.append(requestContractBtn)

                        // hover 색변경 기능해제
                        requestContractBtn.onmouseover = function () { }
                        requestContractBtn.onmouseout = function () { }

                        new CreateElement().contractMessage(messages, "대여 신청이 수락되었습니다", cssText)
                    }
                    else {
                        new CreateElement().contractMessage(messages, "대여 신청을 수락했습니다", cssText)
                    }
                    break
                case "거절":
                    // 수신자
                    if (contractSender != userId) {
                        requestContractBtn.innerText = "대여 신청"
                        requestContractBtn.style.cssText = "background-color: rgb(153, 250, 158); cursor: pointer;"
                        contractBtnContainer.append(requestContractBtn)

                        // 대여 신청 버튼 클릭 이벤트
                        requestContractBtn.setAttribute("onclick", `rentalDateModalView(${itemId}, ${roomId}, ${inquirerId}, ${authorId})`)
                        //hover 색변경 기능
                        requestContractBtn.onmouseover = function () {
                            requestContractBtn.style.backgroundColor = "rgb(191, 255, 194)"
                        }
                        requestContractBtn.onmouseout = function () {
                            requestContractBtn.style.backgroundColor = "rgb(153, 250, 158)"
                        }

                        new CreateElement().contractMessage(messages, "대여 신청이 거절되었습니다", cssText)
                    }
                    else {
                        new CreateElement().contractMessage(messages, "대여 신청을 거절했습니다", cssText)
                    }
                    break;
                case "종료":
                    new CreateElement().contractMessage(messages, "대여가 종료되었습니다", cssText)

                    if (contractSender != userId) {
                        requestContractBtn.innerText = "리뷰 쓰기"
                        requestContractBtn.style.cssText = "background-color: #bae1ff; cursor: pointer;"
                        contractBtnContainer.append(requestContractBtn)

                        // hover 색변경 기능해제
                        requestContractBtn.onmouseover = function () { }
                        requestContractBtn.onmouseout = function () { }

                        // 리뷰 모달 열리는 함수 실행
                        requestContractBtn.setAttribute("onclick", `reviewModalView(${itemId})`)
                    }
            }

            // 스크롤 가장 아래로 이동
            const chatAreaWrap = document.querySelector('.chat-area-wrap')
            chatAreaWrap.scrollTop = chatAreaWrap.scrollHeight;
        }
    }
}


var chatAlertSocket = ''
// 페이지 로드 시 실행되는 기능
document.addEventListener("DOMContentLoaded", async function () {
    // 모달 버튼 생성
    new CreateElement().modalBtnBox()
    new CreateElement().chatAndUploadBtn()
    // 로그인 유저일 경우
    if (payload != null) {
        const userId = payload.user_id
        // 채팅 모달과 알림 모달 생성
        new CreateElement().chatModal()
        new CreateElement().alertModal()

        // 채팅 모달 데이터 요청 API
        let data = await chatModalApi()

        // 채팅방 생성
        for (let i = 0; i < data.length; i++) {
            new CreateElement().chatRoom(data[i], userId)
        }

        // 알림 웹소켓
        new Websocket().alertWebsocket(userId)

        // 읽지 않은 메시지 API
        unread_chatroom_list = await getUnreadMessageApi(userId)
        if (unread_chatroom_list.length != 0) {
            // 채팅방 알림 효과
            new Alert().navAlertEffect()
            for (let i = 0; i < unread_chatroom_list.length; i++) {
                new CreateElement().alertMessage(unread_chatroom_list[i])
                new Alert().alertNotReadMessage(unread_chatroom_list[i])
                new Alert().chatModalAlertEffect(unread_chatroom_list[i])
            }
        }
    }
})

// 채팅 모달 열기
function openChatModal() {
    if (payload == null) {
        new NavModalView().loginSignupModalView()
    }
    else {
        const chatBody = document.getElementsByClassName('chat-modal-body')[0]
        chatBody.style.animation = 'moveUp 0.5s'
        chatBody.style.display = 'flex'
        const chatBtn = document.getElementsByClassName('chat-btn')[0]
        chatBtn.setAttribute('onclick', 'closeChatModal()')
    }
}

// 채팅 모달 닫기
function closeChatModal() {
    const chatBody = document.getElementsByClassName('chat-modal-body')[0]
    chatBody.style.animation = 'moveDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    const chatBtn = document.getElementsByClassName('chat-btn')[0]
    chatBtn.setAttribute('onclick', 'openChatModal()')

    // 이미 접속한 채팅, 거래 웹소켓이 있다면 종료
    if (chatSocket != '' && contractSocket != '') {
        chatSocket.close()
        contractSocket.close()
        contractSocket = ''
        chatSocket = ''
    }
}

// 페이지 상단으로 보내기


// 알림 메시지 및 문의하기 확인 버튼 클릭
function openDirectChatRoom(roomId) {
    const chatBtn = document.querySelector('.chat-btn')
    if (chatBtn.attributes[1].value == 'openChatModal()') {
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
        chatSocket = ''
        contractSocket = ''
    }

    // 선택한 채팅방 스타일 효과
    const isDarkMode = localStorage.getItem('darkMode')
    if (isDarkMode) {
        $('.lend-room.dark-mode').attr('style', 'background-color: gainsboro')
        $('.borrow-room.dark-mode').attr('style', 'background-color: gray')
        const selectedChatRoom = document.getElementById(`chat-room-${roomId}`)
        selectedChatRoom.style.boxShadow = '4px 4px 4px #606060'
    }
    else {
        $('.lend-room').attr('style', 'background-color: rgb(255, 239, 194)')
        $('.borrow-room').attr('style', 'background-color: rgb(191, 255, 194)')
        const selectedChatRoom = document.getElementById(`chat-room-${roomId}`)
        selectedChatRoom.style.boxShadow = '4px 4px 4px yellowgreen'
    }

    // 선택한 채팅방 알림 효과 끄기
    new Alert().offAlertEffect(roomId)
    // 채팅 웹소켓
    new Websocket().chatWebsocket(roomId)
    // 채팅룸 데이터 API
    const roomData = await chatRoomApi(roomId)
    // 거래 웹소켓
    new Websocket().contractWebsocket(roomId, roomData)
    // 채팅방 내용 생성
    new CreateElement().chatRoomElements(roomId, roomData)
}


// 채팅 입력 길이에 맞춰서 높이 조절
function calcTextareaHeight(e) {
    e.style.height = 'auto'
    e.style.height = `${e.scrollHeight}px`
}


// 대여 신청 발신자 모달 뷰
function rentalDateModalView(itemId, roomId, inquirerId, authorId) {
    const body = document.querySelector('body')
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
    addEventListener('mousedown', (e) => {
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
            if (payload.user_id == authorId) {
                authorId = inquirerId
            }

            let contractType = "신청"
            // 거래 상태 웹소켓으로 보내기 (신청)
            contractSocket.send(JSON.stringify({
                'room_id': roomId,
                'sender': payload.user_id,
                'receiver': authorId,
                'contract_type': contractType,
            }))

            // 채팅 알림 웹소켓 통신
            chatAlertSocket = new WebSocket(`${webSocketBaseUrl}/chats/alerts/${authorId}`)

            // 메시지 작성 시간
            let now = new Date()
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset())  // 한국시간으로

            // 상대방에게 알림 보냄
            chatAlertSocket.onopen = function () {
                new Websocket().sendAlert(roomId, payload.user_id, authorId, '대여 신청')
            }
            rentalSubmitBtn.remove();
        }
    });

    const isDarkMode = localStorage.getItem('darkMode')
    if (isDarkMode) {
        rentalDateContainer.classList.add('dark-mode')
        startTime.classList.add('dark-mode')
        endTime.classList.add('dark-mode')
        rentalSubmitBtn.classList.add('dark-mode')
        askSign.classList.add('dark-mode')
    }
}


// 대여 신청 수신자 버튼 모달
async function checkRentalDateModal(itemId, roomId) {
    const body = document.querySelector('body')

    // 대여 정보 조회 API
    const contractDetailData = await contractDetailApi(itemId, roomId)

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

    const inquirerId = contractDetailData.user
    const contractLook = document.getElementsByClassName('contract-look')
    const LastcontractMessage = contractLook[contractLook.length - 1]

    // 대여 신청 거절 버튼
    cancelRental.addEventListener('click', async (e) => {
        // 대여 거절 API
        await contractRefuseApi(itemId, roomId)
        let contractType = "거절"
        // // 거래 상태 웹소켓 요청 (거절)
        contractSocket.send(JSON.stringify({
            'item_id': itemId,
            'sender': payload.user_id,
            'receiver': inquirerId,
            'room_id': roomId,
            'contract_type': contractType,
        }))

        // 대여 신청 수락시, 신청서 버튼 비활성화
        LastcontractMessage.style.backgroundColor = '#f0f0f0'
        LastcontractMessage.style.cursor = 'auto'
        LastcontractMessage.setAttribute('onclick', "")
        LastcontractMessage.innerText = "대여 신청을 확인했습니다"
        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'
    })

    // 대여 신청 수신 모달 unview
    addEventListener('mousedown', (e) => {
        if (e.target == rentalDateModalBody) {
            body.style.overflow = 'auto'
            rentalDateModalBody.remove()
        }
    })

    // 대여 신청 수락 버튼
    contractAcceptBtn.addEventListener('click', async (e) => {

        // 대여 상태 변경 API
        // 물품 상태를 대여 가능 -> 대여 중으로 바꿈
        await contractAcceptAndEndApi(itemId, "대여 중", roomId)
        let contractType = "수락"

        // 거래 상태 웹소켓 요청 (수락)
        contractSocket.send(JSON.stringify({
            'item_id': itemId,
            'sender': payload.user_id,
            'receiver': inquirerId,
            'room_id': roomId,
            'contract_type': contractType
        }))

        // 대여 신청 수락시, 신청서 버튼 비활성화
        LastcontractMessage.style.backgroundColor = '#f0f0f0'
        LastcontractMessage.style.cursor = 'auto'
        LastcontractMessage.setAttribute('onclick', "")
        LastcontractMessage.innerText = "대여 신청을 확인했습니다"
        body.style.overflow = 'auto'
        rentalDateModalBody.style.display = 'none'


        const contractBtnContainer = document.querySelector('.contract-btn-container')
        contractBtnContainer.replaceChildren()

        const endContractBtn = document.createElement('button');
        endContractBtn.setAttribute("class", "end-contract-btn");
        endContractBtn.innerText = "대여 종료하기"

        // 대여 종료 버튼 클릭
        // 물품 상태를 대여 중 -> 대여 종료로 바꿈
        endContractBtn.addEventListener('click', async (e) => {
            alert("대여가 종료 되었습니다.")
            // 대여 상태 변경 API
            await contractAcceptAndEndApi(itemId, "대여 종료", roomId)

            let contractType = "종료"
            // 거래 상태 웹소켓 요청 (종료)
            contractSocket.send(JSON.stringify({
                'item_id': itemId,
                'sender': payload.user_id,
                'receiver': inquirerId,
                'room_id': roomId,
                'contract_type': contractType
            }))
            endContractBtn.innerText = "대여 종료된 물품"
            endContractBtn.style.cursor = "auto"
            endContractBtn.style.backgroundColor = "#fac7aa"
        })
        contractBtnContainer.append(endContractBtn)
    })
    const isDarkMode = localStorage.getItem('darkMode')
    if (isDarkMode) {
        rentalDateContainer.classList.add('dark-mode')
    }
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

//리뷰 모달 생성과 동시에 모달 뷰
function reviewModalView(itemId) {
    const body = document.querySelector('body');

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

        // [채팅창] 리뷰 작성 하고, 리뷰 쓰기 버튼 -> 대여 종료된 물품으로 변경
        const requestContractBtn = document.querySelector('.request-contract-btn')
        if (requestContractBtn != null) {
            requestContractBtn.innerText = "대여 종료된 물품"
            requestContractBtn.style.cssText = "background-color: #fac7aa; cursor: auto;"
            requestContractBtn.setAttribute("onclick", "");
        }

        // [마이페이지] 리뷰 작성 후 버튼 display none
        const onReviewBtn = document.querySelector('.rental-end-btn')
        if (onReviewBtn != null) {
            onReviewBtn.style.display = "none"
        }
    })

    const askSign = document.createElement('div');
    askSign.setAttribute("class", "ask-sign");
    reviewContainer.append(askSign)

    const skipReview = document.createElement('a');
    skipReview.setAttribute("class", "skip-review");
    skipReview.innerText = '건너 뛰기'
    askSign.append(skipReview)

    addEventListener('mousedown', (e) => {
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

    const isDarkMode = localStorage.getItem('darkMode')
    if (isDarkMode) {
        reviewContainer.classList.add('dark-mode')
        reviewContent.classList.add('dark-mode')
        reviewSubmitBtn.classList.add('dark-mode')
        askSign.classList.add('dark-mode')
    }
}

function reviewModalUnview() {
    const body = document.querySelector('body');
    const reviewModalBody = document.querySelector('.review-modal-body');
    body.style.overflow = 'auto'
    reviewModalBody.remove()
}