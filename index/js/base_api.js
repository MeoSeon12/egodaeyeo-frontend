const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


addEventListener('click', (e) => {
    if (e.target == signUpBtn) {
        onSignUp()
    }
    if (e.target == loginSubmitBtn) {
        onLogin()
    }
    if (e.target == logoutBtn) {
        onLogout()
    }
})

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
            mode: 'cors',
            headers: {
                Accept: "application/json",
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
            loginModalView()
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
        mode: 'cors',
        headers: {
            Accept: "application/json",
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

async function onReviewSubmit() {
    const reviewContent = document.querySelector('#review').value
    const starRating = document.querySelector('input[name="rating"]:checked').value
    const token = localStorage.getItem("access_token");

    const reviewData = {
        content: reviewContent,
        rating: starRating
    }
    const response = await fetch(`${backEndBaseUrl}/items/reviews/1`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(reviewData)
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        window.location.href = '../item/search.html'
    } else {
        console.log(response_json)
    }
}

function dhm(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    return days + "days: " + hours + "hr: " + minutes + "min"
}

async function onRentalSubmit(itemId) {
    const startTime = document.querySelector('#rental-start-time')
    const endTime = document.querySelector('#rental-end-time')

    const token = localStorage.getItem("access_token");

    if (startTime.value > endTime.value) {
        alert('대여 종료일을 대여 시작일 이전으로 설정할 수 없습니다.')
    }
    if (startTime.value === endTime.value) {
        alert('대여 종료일과 대여 시작일이 일치할 수 없습니다.')
    }
    else {
        const rentalSubmitData = {
            startTime: startTime.value,
            endTime: endTime.value,
        }

        const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(rentalSubmitData)
        }
        )
        response_json = await response.json()

        if (response.status == 200) {
            alert("대여신청 완료!")
            // window.location.reload()
        } else {
            console.log(response_json)
        }
    }
}

async function contractDetailApi(itemId) {

    const token = localStorage.getItem("access_token");

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        console.log(response_json)
        return response_json
    } else {
        console.log(response_json)
    }
}

async function contractAcceptEndApi(itemId, status) {

    const token = localStorage.getItem("access_token");

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            "status": status
        })
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        console.log(response_json)
        // return response_json
    } else {
        console.log(response_json)
    }
}

async function contractRefuseApi(itemId) {

    const token = localStorage.getItem("access_token");

    const response = await fetch(`${backEndBaseUrl}/contracts/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-CSRFToken': csrftoken,
        },
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        console.log(response_json)
        // return response_json
    } else {
        console.log(response_json)
    }
}

// 카카오 주소 API(일반유저)
document.getElementById("address-kakao").addEventListener("click", function () {
    new daum.Postcode({
        oncomplete: function (data) { //선택시 입력값 세팅
            document.getElementById("address-kakao").value = data.address;
            document.querySelector("#address-kakao").focus();
        }
    }).open();
});

// 카카오 주소 API(소셜유저)
document.getElementById("address-kakao2").addEventListener("click", function () {
    new daum.Postcode({
        oncomplete: function (data) { //선택시 입력값 세팅
            document.getElementById("address-kakao2").value = data.address;
            document.querySelector("#address-kakao2").focus();
        }
    }).open();
});

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
                        Accept: "application/json",
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

async function getUserView() {

    const mypageImage = document.getElementsByClassName('mypage-image')[0]

    try {
        userId = JSON.parse(localStorage.getItem('payload')).user_id

        const response = await fetch(`${backEndBaseUrl}/users/${userId}/`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrftoken,
            },
        })
        userData = await response.json()
        profileImage = userData['image']

        mypageImage.setAttribute('src', profileImage)

        return userData
    }
    catch {
        mypageImage.style.display = 'none'
    }

}
getUserView()


// 채팅 모달 데이터 요청
async function chatModalApi() {

    const token = localStorage.getItem('access_token')
    const userId = JSON.parse(localStorage.getItem('payload')).user_id

    const response = await fetch(`${backEndBaseUrl}/chats/`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        },
    })
    response_json = await response.json()
    
    if (response.status == 200) {
        return response_json
    }
    else {
        alert(response_json["error"])
    }
}

// 채팅 룸 선택
async function chatRoomApi(room_id) {

    const token = localStorage.getItem('access_token')
    const userId = JSON.parse(localStorage.getItem('payload')).user_id

    const response = await fetch(`${backEndBaseUrl}/chats/${room_id}`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
            'Authorization': 'Bearer ' + token
        },
    })
    response_json = await response.json()
    
    if (response.status == 200) {
        return response_json
    }
    else {
        alert(response_json["error"])
    }
}

// rentalSocket.onmessage = async function(e){
//     let data = JSON.parse(e.data)
    
//     const messages = document.getElementById('messages')
    
//     //대여신청 도착 html 이거 쓰면되여
//     // `<div class="contract-wrap">
//     // <div class="contract-look">대여신청이 도착했습니다</div>
//     // </div>`
//     if (data.sender == userId) {
//         messages.insertAdjacentHTML('beforeend', 
//         `<div class="contract-wrap">
//         <div class="contract-look">대여신청이 도착했습니다</div>
//         </div>`
//         )        
        
//     }
//     else {
//         messages.insertAdjacentHTML('beforeend', 
//         `<div class="contract-wrap">
//         <div class="contract-look">대여신청이 도착했습니다</div>
//         </div>`
//         )
//     }    
// }


