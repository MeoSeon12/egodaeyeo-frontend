async function itemApiView() {
    var userId = ""
    if (payload != null) {
        userId = payload.user_id
    }
    const response = await fetch(`${backEndBaseUrl}/items?user=${userId}`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
        }
    }
    )
    return apiResponse(response)
}

// Query parameter로 카테고리별 아이템정보 조회 - ItemListView
async function selectedItemApiView(category, section) {
    var userId = ""
    if (payload != null) {
        userId = payload.user_id
    }
    const response = await fetch(`${backEndBaseUrl}/items/?category=${category}&section=${section}`, {
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
    var userId = ""
    if (payload != null) {
        userId = payload.user_id
    }
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
}

function customAlert(text) {
    Swal.fire({
        icon: 'error',
        text: text
    });
}
