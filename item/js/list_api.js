// const backEndBaseUrl = "http://127.0.0.1:8000"
// const frontEndBaseUrl = "http://127.0.0.1:5500"
// const token = localStorage.getItem("access_token");


async function itemView() {

    const response = await fetch(`${backEndBaseUrl}/items`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            // 'Authorization': 'Bearer ' + token,
        }
    }
    )
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


// Query parameter로 카테고리별 아이템정보 조회
async function selectedItemView(category, section) {

    const response = await fetch(`${backEndBaseUrl}/items?category=${category}&section=${section}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            // 'Authorization': 'Bearer ' + token,
        }
    }
    )
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


// Query parameter로 카테고리별 아이템정보 조회
async function scrollItemView(url) {

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
            // 'Authorization': 'Bearer ' + token,
        }
    }
    )
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
