async function rentalApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
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

async function historyApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
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

async function bookmarkApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
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

async function uploadedApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
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

async function profileApiView(인자) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
    }else {
        const response = await fetch(`${backEndBaseUrl}/items?{인자}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            }
        }
        )
        return apiResponse(response)
    }
}

async function feedbackApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
    }else {
        const response = await fetch(`${backEndBaseUrl}/items`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
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
