/*
채팅 모달 섹션
*/
// 채팅 모달 데이터 요청 API
async function chatModalApi() {

    const token = localStorage.getItem('access_token')

    const response = await fetch(`${backEndBaseUrl}/chats/`, {
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
    else {
        alert(response_json["error"])
    }
}


// 채팅룸 데이터 API (채팅룸 선택 시)
async function chatRoomApi(room_id) {

    const token = localStorage.getItem('access_token')

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
    else {
        alert(response_json["error"])
    }
}


/*
대여 신청 섹션
*/
// 대여 신청 API
async function rentalSubmitApi(itemId) {

    const startTime = document.querySelector('#rental-start-time')
    const endTime = document.querySelector('#rental-end-time')

    const token = localStorage.getItem("access_token");
    
    const rentalSubmitData = {
        startTime: startTime.value,
        endTime: endTime.value,
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
        console.log("대여신청 완료!")
    }
    else {
        console.log(response_json)
    }
}


// 대여 정보 조회 API (대여 신청 수신 버튼 클릭 시)
async function contractDetailApi(itemId) {

    const token = localStorage.getItem("access_token");

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
    })
    response_json = await response.json()

    if (response.status == 200) {
        console.log(response_json)
        return response_json
    } else {
        console.log(response_json)
    }
}


// 대여 상태 변경 API (대여 수락, 종료 버튼 클릭 시)
async function contractAcceptAndEndApi(itemId, status) {
    console.log(status)
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
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
        console.log(response_json)
    }
    else {
        console.log(response_json)
    }
}


// 대여 거절 API
async function contractRefuseApi(itemId) {

    const token = localStorage.getItem("access_token");

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
    })
    response_json = await response.json()

    if (response.status == 200) {
        console.log(response_json)
    }
    else {
        console.log(response_json)
    }
}


/*
리뷰 섹션
*/
async function onReviewSubmit() {
    const reviewContent = document.querySelector('#review').value
    const starRating = document.querySelector('input[name="rating"]:checked').value
    const token = localStorage.getItem("access_token");

    const reviewData = {
        content: reviewContent,
        rating: starRating
    }
    const response = await fetch(`${backEndBaseUrl}/items/reviews/1`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(reviewData)
    })
    response_json = await response.json()

    if (response.status == 200) {
        window.location.href = '../item/search.html'
    } else {
        console.log(response_json)
    }
}