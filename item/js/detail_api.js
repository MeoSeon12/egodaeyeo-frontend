const frontendBaseUrl = "http://127.0.0.1:5500"
const backendBaseUrl = "http://127.0.0.1:8000"

async function DetailViewApi(itemId) {

    const response = await fetch(`${backendBaseUrl}/items/details/${itemId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken
        }
    })

    //  요청 성공 (아이템 DB 존재함)
    if (response.status == 200) {
        data = await response.json()
        return data
    }

    // 요청 실패 (아이템 DB 없음)
    else if (response.status == 404) {
        return alert('아이템 정보가 존재하지 않습니다')
    }
}
