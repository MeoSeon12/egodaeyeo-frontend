// 페이지 뷰 데이터 얻기 (카테고리)
async function getUploadPageViewData() {

    const token = localStorage.getItem('access_token')  // 비 로그인 유저는 null
    
    if (token == null) {
        alert('아이템 등록은 로그인 후 사용 가능합니다')
    }

    const response = await fetch(`${backEndBaseUrl}/items/upload`, {
        method: 'GET',
    })

    if (response.status == 200) {
    data = await response.json()
        return data
    }
}


// 폼 전송
async function submitForm() {
    
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