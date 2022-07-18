async function myPageApiView(param) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
    }else {
        const response = await fetch(`${backEndBaseUrl}/users/mypages?tab=${param}`, {
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

async function profileApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
    }else {
        const response = await fetch(`${backEndBaseUrl}/users`, {
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
        const response = await fetch(`${backEndBaseUrl}/help`, {
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
        data = response_json
        return data
    }else if (response.status == 204) {
        alert("컨텐츠가 존재하지 않습니다.")
        window.location.replace("../index.html")
    }else {
        alert("페이지를 불러오는데 실패했습니다. 다시 접속 해주세요.")
        window.location.replace("../index.html")
    }
}
