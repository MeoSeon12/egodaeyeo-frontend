// window.Kakao.init("328675de434c7c0bdbf3c0eca65038c0");

// function kakaoLogin() {
//     window.Kakao.Auth.login({
//         scope: 'profile_nickname, account_email',
//         success: function (authObj) {
//             console.log(authObj);
//             window.Kakao.API.request({
//                 url: '/v2/user/me',
//                 success: res => {
//                     const kakao_account = res.kakao_account;
//                     console.log(kakao_account['email']);
//                     console.log(kakao_account['profile']['nickname']);
//                 }
//             });
//         }
//     });
// }

<<<<<<< HEAD

function kakaoLogin() {
   location.href = `${backEndBaseUrl}/users/kakao/login`
}
=======
const kakaoBtn = document.getElementsByClassName('kakao-btn')[0]
kakaoBtn.addEventListener("click", (e) => {
    window.location.href = `${backEndBaseUrl}/users/kakao/login`
}
)
>>>>>>> develop
