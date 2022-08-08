// 물품 수정 페이지 로드 데이터 얻기
async function getUpdatePageLoadData() {
    const token = await refreshToken(payload)

    const itemId = location.href.split('?')[1].split('=')[1]
    const itemUserId = location.href.split('?')[2].split('=')[1]

    // 비로그인 혹은 본인 게시글이 아닌 경우
    if (payload == null || itemUserId != payload.user_id) {
        alert('작성한 유저 본인만 수정 가능합니다')
        location.href = `detail.html?${itemId}`
    }
    
    // 본인 게시글인 경우
    else {
        // 데이터 얻기 위한 API 요청
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
    const token = await refreshToken(payload)
    
    // 비 로그인 유저
    if (token == undefined) {
        return alert('아이템 등록은 로그인 후 이용가능합니다')
    }

    // 데이터 가져오기
    const section = document.getElementById('section').value
    const category = document.getElementById('category').value
    const status = document.getElementById('status').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const price = document.getElementById('price').value
    const time = document.getElementById('time').value

    // 카테고리, 제목, 내용은 필수
    if (category == '-- 카테고리 --') {
        return alert('카테고리는 필수입니다')
    } else if (title == '') {
        return alert('제목은 필수입니다')
    } else if (content == '') {
        return alert('내용은 필수입니다')
    }

    // 폼데이터에 담기
    let formData = new FormData()
    formData.append('section', section)
    formData.append('category', category)
    formData.append('status', status)
    formData.append('time', time)
    formData.append('title', title)
    formData.append('content', content)
    formData.append('price', price)

    // 기존 이미지 중 삭제할 이미지와 새로 첨부한 이미지 중 삭제되지 않은 이미지만 남김
    filesArr = filesArr.filter(function(obj) {
        if (obj.go_delete == true || obj.is_delete == false) {
            return true
        }
    })

    for (let i = 0; i < filesArr.length; i++) {
        
        // 삭제할 이미지는 ID값만 보냄
        if (filesArr[i]['go_delete']) {
            formData.append('delete_image', filesArr[i]['id'])
        }
        // 저장할 이미지
        else {
            formData.append('save_image', filesArr[i])
        }
    }

    // 백엔드로 풋 요청
    const itemId = location.href.split('?')[1].split('=')[1]
    const response = await fetch(`${backEndBaseUrl}/items/update/${itemId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    
    //  요청 성공 (아이템 DB 존재함)
    if (response.status == 200) {
        alert('수정되었습니다')
        location.href = `../item/detail.html?${itemId}`
    }
}