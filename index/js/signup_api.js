const backEndBaseUrl = "http://127.0.0.1:8000"
const frontEndBaseUrl = "http://127.0.0.1:5500"

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
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

//닉네임 형식 함수
function checkId(asValue) {
    const regid = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regid.test(asValue);
}

async function onSignUp() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const password2 = document.getElementById('inputPassword2').value;
    const nickname = document.getElementById('inputNickname').value;

    //정규표현식 비밀번호 8자리 대소문자, 특수문자포함
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    //닉네임 형식 체크
    if (!checkId(nickname)) {
        alert("닉네임은 2~10자사이 영문, 숫자, 특수문자(._-)만 사용가능합니다.")
        $('#inputNickname').focus()
        $('#inputNickname').val('')
        return;
    }
    //비밀번호 형식 체크
    if (!password.match(regExp)) {
        alert('비밀번호는 최소8자리 대소문자,특수문자 포함 입력해주세요.')
        $('#inputPassword').focus()
        $('#inputPassword').val('')
        $('#inputPassword2').val('')
        return;
    }
    if (password == password2) {
        const response = await fetch(`${backEndBaseUrl}/users/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "nickname": nickname,
            })
        }
        )
        response_json = await response.json()

        if (response.status == 200){
            alert("회원가입 성공")
            loginModalView()
        }else {
            //유효하지 않은 이메일 도메인 사용시
            console.log(response_json)
            alert(response_json["error"])
            $('#inputEmail').focus()
            $('#inputEmail').val('')
            return;
        }
    }else{
        alert("재입력한 비밀번호가 일치하지 않습니다.")
    }
}
