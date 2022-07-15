window.Kakao.init("328675de434c7c0bdbf3c0eca65038c0");

function kakaoLogin() {
    window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: function (authObj) {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res => {
                    kakao_account = res.kakao_account;
                    access_token = authObj['access_token'];
                    kakaoLoginApi(access_token)
                }
            });
        }
    });
}

async function kakaoLoginApi(access_token) {

    const response = await fetch(`${backEndBaseUrl}/users/api/kakao/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': access_token,
            'X-CSRFToken': csrftoken,
        },
        credentials: 'include'
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        alert(response_json['msg'])
        let access_token = response_json['access']
        let refresh_token = response_json['refresh']
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)

        // 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
        // accessToken 에서 payload를 가져오는 코드-
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        window.location.reload()

    } else if (response.status == 201) {
        let access_token = response_json['access']
        let refresh_token = response_json['refresh']
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)

        // 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
        // accessToken 에서 payload를 가져오는 코드-
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        alert("원활한 서비스 이용을 위해 주소를 입력해주세요.")
        addressContainerView();

    }
}



async function onAddressEnter() {

    const token = localStorage.getItem("access_token");
    const address = document.getElementById("address_kakao2").value;
    const userId = JSON.parse(localStorage.getItem("payload")).user_id;

    const response = await fetch(`${backEndBaseUrl}/users/${userId}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            "address": address
        })
    })

    response_json = await response.json()

    if (response.status == 200) {
        alert("주소 등록 완료.")
        window.location.reload()
    }
}


const kakaoBtn = document.getElementsByClassName('kakao-btn')[0]
kakaoBtn.addEventListener("click", (e) => {
    kakaoLogin();
})