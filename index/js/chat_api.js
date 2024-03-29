// 읽지 않은 메세지 API
async function getUnreadMessageApi(userId) {
    const token = await refreshToken(payload)
    // views.py - ChatAlertView
    const response = await fetch(`${backEndBaseUrl}/chats/alerts/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        },
    })
    if (response.status == 200) {
        return response.json()
    }
    else if (response.status == 204) {
        return []
    }
    else {
        console.log(response.json()["error"])
    }
}


// 채팅 모달 데이터 요청 API - chat/ChatView
async function chatModalApi() {
    const token = await refreshToken(payload)

    const response = await fetch(`${backEndBaseUrl}/chats/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        },
    })
    response_json = await response.json()
    if (response.status == 200) {
        return response_json
    }
    else if(response_json.code == "token_not_valid"){
        onLogout()
    }
}


// 채팅룸 데이터 API (채팅룸 선택 시) - ChatRoomView
async function chatRoomApi(room_id) {

    const token = await refreshToken(payload)

    const response = await fetch(`${backEndBaseUrl}/chats/${room_id}`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        },
    })
    response_json = await response.json()

    if (response.status == 200) {
        return response_json
    }
    else if (response_json.code == "token_not_valid") {
        onLogout()
    }
    else {
        console.log(response_json["error"])
    }
}


// 실시간으로 바로 읽은 메세지 처리
async function liveReadApi(room_id) {
    const token = await refreshToken(payload)

    await fetch(`${backEndBaseUrl}/chats/${room_id}`, {
        method: 'PUT',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        },
    })
    if (response_json.code == "token_not_valid") {
        onLogout()
    }
}


// 대여 신청 API
async function rentalSubmitApi(itemId) {

    const startTime = document.querySelector('#rental-start-time')
    const endTime = document.querySelector('#rental-end-time')

    const token = await refreshToken(payload)

    const rentalSubmitData = {
        "startTime": startTime.value,
        "endTime": endTime.value,
        "status": "검토 중"
    }

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(rentalSubmitData)
    })
    response_json = await response.json()

    if (response.status == 200) {
        return response_json
    }
    else if (response.status == 400) {
        console.log(response_json)
    }
}


// 대여 정보 조회 API (대여 신청 수신 버튼 클릭 시)
async function contractDetailApi(itemId, roomId) {

    const token = await refreshToken(payload)

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}?room_id=${roomId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
    })
    response_json = await response.json()

    if (response.status == 200) {
        return response_json
    }
    else {
        console.log(response_json)
    }
}


// 대여 상태 변경 API (대여 수락, 종료 버튼 클릭 시)
async function contractAcceptAndEndApi(itemId, status, roomId) {
    const token = await refreshToken(payload)

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}?room_id=${roomId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            "status": status
        })
    })
    response_json = await response.json()

    if (response.status == 200) {
        return response_json
    }
    else {
        console.log(response_json)
    }
}


// 대여 거절 API 
async function contractRefuseApi(itemId, roomId) {
    
    const token = await refreshToken(payload)

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}?room_id=${roomId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
    })
    response_json = await response.json()

    if (response.status == 200) {
        return response_json
    }
    else {
        console.log(response_json)
    }
}

// 아이템 재등록 API
async function reUploadItemApi(itemId, status) {
    const token = await refreshToken(payload)

    const response = await fetch(`${backEndBaseUrl}/items/reupload/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            "status": status
        })
    })
    response_json = await response.json()

    if (response.status == 200) {
        alert(response_json.msg)
        location.href = `${frontEndBaseUrl}/item/detail.html?${itemId}`
    }
    else if (response.status == 208){
        alert(response_json.msg)
    }
    else if (response.status == 404){
        alert(response_json.msg)
    }
}


//리뷰 작성 API
async function onReviewSubmit(itemId) {
    const reviewContent = document.querySelector('#review').value
    const starRating = document.querySelector('input[name="rating"]:checked')
    const token = await refreshToken(payload)

    if (starRating == null) {
        alert('별점을 입력해주세요.')
        return
    }
    else if (reviewContent == '') {
        alert('내용을 입력해주세요.')
        return
    }

    const reviewData = {
        content: reviewContent,
        rating: starRating.value
    }
    const response = await fetch(`${backEndBaseUrl}/items/reviews/${itemId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(reviewData)
    })
    response_json = await response.json()

    if (response.status == 200) {
        alert('리뷰가 작성되었습니다.')
        reviewModalUnview()
    }
    else {
        console.log(response_json)
    }
}