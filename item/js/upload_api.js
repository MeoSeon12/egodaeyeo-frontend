// 페이지 뷰 데이터 얻기 (카테고리)
async function getUploadPageViewData() {
    const token = await refreshToken(payload)

    if (token == null) {
        alert('로그인 후 사용 가능합니다. 메인 페이지로 돌아갑니다')
        location.href = `${frontEndBaseUrl}`
    }

    const response = await fetch(`${backEndBaseUrl}/items/upload`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })

    if (response.status == 200) {
        data = await response.json()
        return data
    }
}


// 폼 전송
async function submitForm() {
    const token = await refreshToken(payload)

    // 비 로그인 유저
    if (token == undefined) {
        return alert('물품 등록은 로그인 후 이용가능합니다')
    }

    // 데이터 가져오기
    const section = document.getElementById('section').value
    const category = document.getElementById('category').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const price = document.getElementById('price').value
    const time = document.getElementById('time').value

    // 카테고리, 제목, 내용은 필수 / 가격은 0~천만원만 가능
    if (category == '-- 카테고리 --') {
        return alert('카테고리는 필수입니다')
    } else if (title == '') {
        return alert('제목은 필수입니다')
    } else if (content == '') {
        return alert('내용은 필수입니다')
    } else if (price < 0 || price > 10000000) {
        return alert('가격은 천만원을 넘을 수 없습니다')
    }

    // 폼데이터에 담기
    let formData = new FormData()
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
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })

    //  요청 성공
    if (response.status == 200) {
        itemId = await response.json()
        window.location.href = `detail.html?${itemId}`
    }
    // 요청 실패
    else if (response.status == 400) {
        error = await response.json()
        console.log(error.title)
    }
}