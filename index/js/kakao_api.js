window.Kakao.init("328675de434c7c0bdbf3c0eca65038c0");

const kakaoBtn = document.getElementsByClassName('kakao-btn')[0]
kakaoBtn.addEventListener("click", (e) => {
    kakaoLogin();
})

const kakaoAddressSubmitBtn = document.querySelector('.address-submit-btn')
kakaoAddressSubmitBtn.addEventListener("click", (e) => {
    console.log('workworkw???')
    onAddressEnter();
})

function kakaoLogin() {
    window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: function (authObj) {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res => {
                    kakaoAccount = res.kakao_account;
                    kakaoUserData = {
                        'email': kakaoAccount['email'], 
                        'nickname': kakaoAccount['profile']['nickname']
                    }
                    kakaoLoginApi(kakaoUserData)
                }
            });
        }
    });
}

// 소셜 유저 회원가입위해 카카오 유저 정보(이메일, 닉네임) 백엔드로 보내주기
async function kakaoLoginApi(kakaoUserData) {

    const response = await fetch(`${backEndBaseUrl}/users/api/kakao/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(kakaoUserData),
    }
    )
    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200) {
        setLocalStorageItems()
        alert(response_json['msg'])
        window.location.reload()

    }
    else if (response.status == 201) {
        setLocalStorageItems()
        alert("원활한 서비스 이용을 위해 주소를 입력해주세요.")
        addressModalView();
    }
    else {
        alert(response_json['error'])
    }
}

async function onAddressEnter() {

    const token = localStorage.getItem("access_token");
    const address = document.getElementById("address-kakao2").value;
    // const userId = JSON.parse(localStorage.getItem("payload")).user_id;

    const response = await fetch(`${backEndBaseUrl}/users/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
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