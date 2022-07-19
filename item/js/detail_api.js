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
        return alert('아이템 정보가 없습니다')
    }
}


// 백엔드로 북마크 저장 & 삭제
async function DetailViewPostApi() {

    const token = localStorage.getItem('access_token')
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
    else {
        alert('주소를 등록한 후 이용가능합니다')
    }
}
