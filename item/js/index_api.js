async function itemApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        const response = await fetch(`${backEndBaseUrl}/items`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }
        )
        return apiResponse(response)
    }
    else {
        const response = await fetch(`${backEndBaseUrl}/items`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            }
        }
        )
        return apiResponse(response)
    }
}

// Query parameter로 카테고리별 아이템정보 조회 - ItemListView
async function selectedItemApiView(category, section) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        const response = await fetch(`${backEndBaseUrl}/items/?category=${category}&section=${section}`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }
        )
        return apiResponse(response)
    }
    else {
        const response = await fetch(`${backEndBaseUrl}/items/?category=${category}&section=${section}`, {
            method: 'GET',
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
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }
        )
        return apiResponse(response)
    }
    else {
        const response = await fetch(url, {
            method: 'GET',
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
    }
    else if (response.status == 401) {
        customAlert("로그인 인증에 실패했습니다. 새로고침 해주세요")
    }
    else {
        customAlert("페이지를 불러오는데 실패했습니다. 메인 페이지로 돌아갑니다")
        window.location.replace(`${frontEndBaseUrl}`)
    }
}

function customAlert(text) {
    Swal.fire({
        icon: 'error',
        text: text
    });
}
