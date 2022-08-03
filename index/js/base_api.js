const frontEndBaseUrl = "https://egorental.com"
const backEndBaseUrl = "http://3.37.128.154"
const webSocketBaseUrl = "ws://3.37.128.154:8001"

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

//정규표현식 아이디 한글, 영문, 숫자
function checkID(asValue) {
    const regid = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/;
    return regid.test(asValue);
}

//정규표현식 비밀번호 8자리 대소문자, 특수문자포함
function checkPW(asValue) {
    const regPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regPW.test(asValue);
}

async function onSignUp() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const password2 = document.getElementById('inputPassword2').value;
    const nickname = document.getElementById('inputNickname').value;
    const address = document.getElementById('address-kakao').value;

    const signUpData = {
        "email": email,
        "password": password,
        "nickname": nickname,
        "address": address,
    }

    //닉네임 형식 체크
    if (!checkID(nickname)) {
        alert("닉네임은 2~10자사이 한글, 영문, 숫자만 사용가능합니다.")
        $('#inputNickname').focus()
        $('#inputNickname').val('')
        return;
    }
    //비밀번호 형식 체크
    if (!checkPW(password)) {
        alert('비밀번호는 최소 8자리 대소문자, 특수문자 포함 입력해주세요.')
        $('#inputPassword').focus()
        $('#inputPassword').val('')
        $('#inputPassword2').val('')
        return;
    }
    if (address === '') {
        alert('원활한 서비스 이용을 위해 주소를 입력해주세요.')
        $('#address-kakao').focus()
        return;
    }

    if (password == password2) {
        const response = await fetch(`${backEndBaseUrl}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(signUpData)
        }
        )
        response_json = await response.json()

        if (response.status == 200) { //회원가입 성공시
            $('#inputEmail').val('')
            $('#inputNickname').val('')
            $('#inputPassword').val('')
            $('#inputPassword2').val('')
            $('#address-kakao').val('')
            alert("회원가입 성공")
            new NavModalView().loginSignupModalView()
        } else {
            // 이메일 형식 체크 / 이메일 중복 체크 / 닉네임 중복 체크
            if (response_json["email"] == 'user의 이메일은/는 이미 존재합니다.') {
                alert("이미 사용중인 이메일입니다.")
                $('#inputEmail').focus()
                $('#inputEmail').val('')
            }
            if (response_json["email"] == '유효한 이메일 주소를 입력하십시오.') {
                alert(response_json["email"])
                $('#inputEmail').focus()
                $('#inputEmail').val('')
            }
            if (response_json["nickname"]) {
                alert("이미 사용중인 닉네임입니다.")
                $('#inputNickname').focus()
                $('#inputNickname').val('')
            }
        }
    } else {
        alert("재입력한 비밀번호가 일치하지 않습니다.")
    }
}

async function onLogin() {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    if (email === '') {
        alert('이메일을 입력해주세요')
        $('#loginEmail').focus()
        return
    }
    if (password === '') {
        alert('비밀번호를 입력해주세요')
        $('#loginPassword').focus()
        return
    }

    const loginData = {
        email: email,
        password: password
    }

    const response = await fetch(`${backEndBaseUrl}/users/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(loginData)
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        alert("로그인 성공!")
        setLocalStorageItems()
        window.location.reload()
    } else {
        alert('이메일 / 비밀번호가 일치하지 않습니다.')
    }
}


window.Kakao.init("328675de434c7c0bdbf3c0eca65038c0");

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
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(kakaoUserData),
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        setLocalStorageItems()
        window.location.reload()

    }
    else if (response.status == 201) {
        setLocalStorageItems()
        alert("원활한 서비스 이용을 위해 주소를 입력해주세요.")
        new NavModalView().addressModalView();
    }
    else {
        alert(response_json['error'])
    }
}

async function onAddressEnter() {

    const token = localStorage.getItem("access_token");
    const address = document.getElementById("address-kakao2").value;

    const response = await fetch(`${backEndBaseUrl}/users/`, {
        method: 'PUT',
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


// 페이지를 다시 로딩 하면 벌어지는 일들!
window.onload = () => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload != null) {
        // 아직 access 토큰의 인가 유효시간이 남은 경우
        if (payload.exp > (Date.now() / 1000)) {

        } else {
            // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
            const requestRefreshToken = async (url) => {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "refresh": localStorage.getItem("refresh_token")
                    })
                }
                );
                return response.json();
            };

            // 다시 인증 받은 accessToken을 localStorage에 저장하자.
            requestRefreshToken(`${backEndBaseUrl}/users/api/token/refresh`).then((data) => {
                // 새롭게 발급 받은 accessToken을 localStorage에 저장
                const accessToken = data.access;
                localStorage.setItem("access_token", accessToken);
            });
        }
    }
};


// 로컬 스트로지에 토근값들과 페이로드에 정보 담아주기
function setLocalStorageItems() {
    localStorage.setItem("access_token", response_json.access)
    localStorage.setItem("refresh_token", response_json.refresh)

    // 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
    // accessToken 에서 payload를 가져오는 코드-
    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
}


function onLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("payload")
    alert("로그아웃 하셨습니다.")
    window.location.reload()
}


async function getUserView(payload) {

    const response = await fetch(`${backEndBaseUrl}/users/${payload.user_id}/`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
        },
    })
    userData = await response.json()
    return userData
}