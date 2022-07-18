async function itemApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        const response = await fetch(`${backEndBaseUrl}/items`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }
        )
        return apiResponse(response)
    }else {
        const response = await fetch(`${backEndBaseUrl}/items`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            }
        }
        )
        return apiResponse(response)
    }
}

// Query parameter로 카테고리별 아이템정보 조회
async function selectedItemApiView(category, section) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        const response = await fetch(`${backEndBaseUrl}/items?category=${category}&section=${section}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }
        )
        return apiResponse(response)
    }else {
        const response = await fetch(`${backEndBaseUrl}/items?category=${category}&section=${section}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            }
        }
        )
        return apiResponse(response)
    }
}

// Query parameter로 카테고리별 아이템정보 조회
async function scrollItemApiView(url) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }
        )
        return apiResponse(response)
    }else {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            }
        }
        )
        return apiResponse(response)
    }
}

async function apiResponse(response) {
    response_json = await response.json()
    if (response.status == 200) {
        items = response_json
        return items
    }else if (response.status == 401) {
        alert("인증 에러가 발생했습니다. 다시 로그인 해주세요.")
        window.location.replace("../index.html")
    }else {
        alert("페이지를 불러오는데 실패했습니다. 다시 접속 해주세요.")
        window.location.replace("../index.html")
    }
}
