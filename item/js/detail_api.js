const frontendBaseUrl = "http://127.0.0.1:5500"
const backendBaseUrl = "http://127.0.0.1:8000"

async function DetailViewApi(itemId) {
    
    const response = await fetch(`${backendBaseUrl}/items/details/${itemId}`, {
        method: 'GET',
        mode: 'cors',
        header: {
            'X-CSRFToken': csrftoken
        }
    })

    //  요청 성공
    if (response.status == 200) {
        data = await response.json()
        return data
    }
    
    // 요청 실패
    else if (response.status == 404) {
        data = await response.json()
        return alert(data.msg)
    }
}