async function onSearchApiView(search, section) {
    var userId = ""
    if (payload != null) {
        userId = payload.user_id
    }
    const response = await fetch(`${backEndBaseUrl}/items/?user=${userId}&search=${search}&section=${section}`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
        }
    }
    )
    return apiResponse(response)
}

// Query parameter로 카테고리별 아이템정보 조회
async function scrollItemApiView(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
        }
    }
    )
    return apiResponse(response)
}

async function apiResponse(response) {
    response_json = await response.json()
    if (response.status == 200) {
        items = response_json
        return items
    }
    else {
        window.location.replace(`${frontEndBaseUrl}`)
    }
}