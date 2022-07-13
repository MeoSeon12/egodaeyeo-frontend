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
        console.log(response_json)
        let access_token = response_json['access_token']
        localStorage.setItem("access_token", access_token)

        // 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
        // accessToken 에서 payload를 가져오는 코드-
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        window.location.reload()
    }else {
        console.log(response_json['error'])
        return response.status
    }
}

const kakaoBtn = document.getElementsByClassName('kakao-btn')[0]
kakaoBtn.addEventListener("click", (e) => {
    kakaoLogin();
}
)
