window.Kakao.init("328675de434c7c0bdbf3c0eca65038c0");

const kakaoBtn = document.getElementsByClassName('kakao-btn')[0]
kakaoBtn.addEventListener("click", (e) => {
    kakaoLogin();
})

function kakaoLogin() {
    window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: function (authObj) {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res => {
                    kakaoAccount = res.kakao_account;
                    accessToken = authObj['access_token'];
                    kakaoUserData = {
                        'email': kakaoAccount['email'], 
                        'nickname': kakaoAccount['profile']['nickname']
                    }
                    kakaoLoginApi(accessToken, kakaoUserData)
                }
            });
        }
    });
}

async function kakaoLoginApi(accessToken, kakaoUserData) {

    const response = await fetch(`${backEndBaseUrl}/users/api/kakao/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(kakaoUserData),
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        setLocalStorageItems()
        alert(response_json['msg'])
        window.location.reload()

    } else if (response.status == 201) {
        setLocalStorageItems()
        alert("원활한 서비스 이용을 위해 주소를 입력해주세요.")
        addressModalView();
    }
}

async function onAddressEnter() {

    const token = localStorage.getItem("access_token");
    const address = document.getElementById("address-kakao2").value;
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