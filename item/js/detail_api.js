// 백엔드로 아이템, 리뷰 데이터 요청
async function DetailViewGetApi() {
    
    // 비로그인 유저일 경우
    if (payload == null) {
        var response = await fetch(`${backEndBaseUrl}/items/details/${itemId}`, {
            method: 'GET'
        })
    }
    
    // 로그인 유저일 경우
    else {
        var response = await fetch(`${backEndBaseUrl}/items/details/${itemId}?user_id=${payload['user_id']}`, {
            method: 'GET'
        })
    }

    //  요청 성공 (아이템 DB 존재함)
    if (response.status == 200) {
        data = await response.json()
        return data
    }

    // 요청 실패 (아이템 DB 없음)
    else if (response.status == 404) {
        return alert('아이템 정보가 없습니다.')
    }
}


// 백엔드로 북마크 저장 & 삭제 item/DetailView
async function DetailViewPostApi() {
    const token = await refreshToken(payload)
    const response = await fetch(`${backEndBaseUrl}/items/details/${itemId}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    
    //  요청 성공 (아이템 DB 존재함)
    if (response.status == 200 || response.status == 201) {
        bookmarkData = await response.json()
        return bookmarkData
    }
    else if (response.status == 401) {
        alert('로그인 후 이용 가능합니다.')
    }
}


// 게시글 삭제
async function deleteItem() {
    const token = await refreshToken(payload)
    const response = await fetch(`${backEndBaseUrl}/items/details/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    // 요청 성공 (아이템 DB 존재함)
    if (response.status == 200 || response.status == 201) {
        alert('게시글이 삭제되었습니다')
        location.href = `${frontEndBaseUrl}`
    }
}

// 채팅방 생성 및 이동 API
async function chatStartApi() {
    const token = await refreshToken(payload)
    const response = await fetch(`${backEndBaseUrl}/chats/rooms/${itemId}`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        }
    })
    
    // 요청 성공 (아이템 DB 존재함)
    if (response.status == 200) {
        data = await response.json()
        return data
    }
    else {
        alert('현재 대여 가능한 물품이 아닙니다.')
    }
}

async function onReportSubmit(itemId) {
    const token = await refreshToken(payload)
    const category = document.querySelector('.report-category').value
    const content = document.querySelector('#report').value
    if (category == "") {
        alert('신고 사유를 선택해 주세요.')
        return
    }
    if (category == "기타" && content == "") {
        alert('기타 사유는 내용을 입력해 주세요.')
        return
    }
    const reportSubmitData = {
        "category": category,
        "content": content
    }
    const response = await fetch(`${backEndBaseUrl}/help/report/${itemId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(reportSubmitData)
    })
    
    data = await response.json()
    //  요청 성공
    if (response.status == 200 || response.status == 201) {
        alert('신고 접수 완료')
        window.location.reload()
    }
    else if (response.status == 208) {
        alert(data['msg'])
    }
    else if (response.status == 401) {
        alert('로그인 후 이용 가능합니다.')
    }
}
