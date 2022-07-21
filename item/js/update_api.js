// 물품 수정 페이지 로드 데이터 얻기
async function getUpdatePageLoadData() {

    const itemId = location.href.split('?')[1].split('=')[1]
    const itemUserId = location.href.split('?')[2].split('=')[1]
    const payload = JSON.parse(localStorage.getItem('payload'))

    // 비로그인 혹은 본인 게시글이 아닌 경우
    if (payload == null || itemUserId != payload.user_id) {
        alert('작성한 유저 본인만 수정 가능합니다')
        location.href = `detail.html?${itemId}`
    }
    
    // 본인 게시글인 경우
    else {
        // 데이터 얻기 위한 API 요청
        const token = localStorage.getItem('access_token')
        const response = await fetch(`${backEndBaseUrl}/items/update/${itemId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })

        // 응답 성공
        if (response.status == 200) {
            return await response.json()
        }
    }
}


// 폼 전송
async function submitForm() {

    alert('기능 개발중')
    return
    
    const token = localStorage.getItem('access_token')
    
    // 비 로그인 유저
    if (token == undefined) {
        return alert('아이템 등록은 로그인 후 이용가능합니다')
    }

    // 데이터 가져오기
    const section = document.getElementById('section').value
    const category = document.getElementById('category').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const price = document.getElementById('price').value
    const time = document.getElementById('time').value

    // 카테고리, 제목, 내용은 필수
    if (category == '카테고리') {
        return alert('카테고리는 필수입니다')
    } else if (title == '') {
        return alert('제목은 필수입니다')
    } else if (content == '') {
        return alert('내용은 필수입니다')
    }

    // 폼데이터에 담기
    let form = document.querySelector("form")
    let formData = new FormData(form)
    formData.append('section', section)
    formData.append('category', category)
    formData.append('time', time)
    formData.append('title', title)
    formData.append('content', content)
    formData.append('price', price)

    for (let i = 0; i < filesArr.length; i++) {
        // 삭제되지 않은 파일만 폼데이터에 담기
        if (!filesArr[i].is_delete) {
            formData.append('image', filesArr[i])
        }
    }
    
    // 백엔드로 포스트 요청
    const response = await fetch(`${backEndBaseUrl}/items/upload`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    
    //  요청 성공 (아이템 DB 존재함)
    if (response.status == 200) {
        item_id = await response.json()
        window.location.href = `detail.html?${item_id}`
    }
}