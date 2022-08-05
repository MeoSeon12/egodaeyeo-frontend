async function onSearchApiView(search, section) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        const response = await fetch(`${backEndBaseUrl}/items/?search=${search}&section=${section}`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }
        )
        return apiResponse(response)
    }
    else {
        const response = await fetch(`${backEndBaseUrl}/items/?search=${search}&section=${section}`, {
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
        window.location.replace(`${frontEndBaseUrl}`)
    }
    else {
        window.location.replace(`${frontEndBaseUrl}`)
    }
}