async function myPageApiView(param) {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
    }
    else {
        const response = await fetch(`${backEndBaseUrl}/users/mypages?tab=${param}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            }
        }
        )
        response_json = await response.json()
        
        if (response.status == 200) {
            data = response_json
            return data
        }
        else if (response.status == 204) {
            alert("컨텐츠가 존재하지 않습니다.")
            window.location.replace("../index.html")
        }
        else {
            alert("페이지를 불러오는데 실패했습니다. 다시 접속 해주세요.")
            window.location.replace("../index.html")
        }
    }
}

async function profileApiView() {
    const image = document.querySelector('input[type="file"]').files[0]
    const nickName = document.querySelector('#nickname-input').value
    const address = document.querySelector('#address-input').value
    const currentPassword = document.querySelector('#current-pw').value
    const newPassword = document.querySelector('#new-pw').value
    const checkPassword = document.querySelector('#check-pw').value

    //닉네임 형식 체크
    if (!checkID(nickName)) {
        alert("닉네임은 2~10자사이 한글, 영문, 숫자만 사용가능합니다.")
        $('#nickname-input').focus()
        $('#nickname-input').val('')
        return;
    }
    if (newPassword.length > 0) {
        //비밀번호 형식 체크
        if (!checkPW(newPassword)) {
            alert("비밀번호는 최소 8자리 대소문자, 특수문자 포함 입력해주세요.")
            $('#new-pw').focus()
            $('#new-pw').val('')
            $('#check-pw').val('')
            return;
        }
        else if (currentPassword == newPassword) {
            alert("현재 비밀번호와 새로운 비밀번호가 같습니다. 다르게 변경 해주세요.")
            $('#new-pw').focus()
            $('#new-pw').val('')
            $('#check-pw').val('')
        }
    }
    if (checkPassword != newPassword) {
        alert("재입력한 비밀번호가 일치하지 않습니다.")
    }
    else if (currentPassword.length > 0 && newPassword == "" && checkPassword == "") {
        alert("새로운 비밀번호를 입력해주세요.")
        $('#new-pw').focus()
    }
    else {
        formDataUser = new FormData();

        formDataUser.append('image', image)
        formDataUser.append('nickname', nickName)
        formDataUser.append('address', address)
        formDataUser.append('current_password', currentPassword)
        formDataUser.append('password', newPassword)

        console.log(formDataUser)
    
        const token = localStorage.getItem("access_token");
        if (token == null) {
            alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
        }
        else {
            const response = await fetch(`${backEndBaseUrl}/users/`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'X-CSRFToken': csrftoken,
                    'Authorization': 'Bearer ' + token,
                },
                body: formDataUser
            }
            )
            response_json = await response.json()
            
            if (response.status == 200) {
                alert("회원 정보가 수정되었습니다.")
                window.location.reload()

            }
            else if (response.status == 400) {
                console.log(response_json)
                if (response_json["nickname"]) {
                    alert("이미 사용중인 닉네임입니다.")
                    $('#nickname-input').focus()
                    $('#nickname-input').val('')
                }
                else if (response_json["msg"]) {
                    alert(response_json["msg"])
                    $('#current-pw').focus()
                    $('#current-pw').val('')

                }
                else if (response_json["social_error"]) {
                    alert(response_json["social_error"])
                    $('#current-pw').val('')
                    $('#new-pw').val('')
                    $('#check-pw').val('')
                }
            }
            else {
                alert("정보를 불러오는데 실패했습니다. 다시 접속 해주세요.")
                window.location.replace("../index.html")
            }
        }
    }
}

async function userDeleteApiView() {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
    }else {
        const response = await fetch(`${backEndBaseUrl}/users`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            }
        }
        )
        response_json = await response.json()

        if (response.status == 200) {
            alert(response_json['msg'])
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("payload")
            window.location.replace("../index.html")
        }else if (response.status == 400) {
            alert("지금은 회원 탈퇴가 불가능합니다. 다시 시도 해주세요.")
        }
    }
}

async function feedbackApiView() {
    const feedbackTitle = document.querySelector('.feedback-title').value
    const feedbackContent = document.querySelector('.feedback-textarea').value
    const token = localStorage.getItem("access_token");
    
    const feedbackData = {
        title: feedbackTitle,
        content: feedbackContent,
    }

    if (token == null) {
        alert("회원 인증에 실패했습니다. 잠시 후 다시 접속해주세요.")
    }else {
        const response = await fetch(`${backEndBaseUrl}/help/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(feedbackData)
        }
        )
        response_json = await response.json()

        if (response.status == 200) {
            alert("소중한 의견 감사합니다.")
            window.location.reload()
        }else if (response.status == 400) {
            alert("제목과 내용은 필수 입니다.")
        }
    }
}


