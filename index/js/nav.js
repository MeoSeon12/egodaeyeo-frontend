const searchBtn = document.querySelector('#search-icon')
const loginBtn = document.querySelector('.login-btn')
const loginSubmitBtn = document.querySelector('.login-submit-btn')
const loginModalBody = document.querySelector('.login-modal-body')
const logoutBtn = document.querySelector('.logout-btn')
const signUpBtn = document.querySelector('.signup-submit-btn')
const body = document.getElementsByTagName('body')[0]


// 물품 목록 버튼
function goItemListPage() {
    location.href = '../item/list.html'
}

// 물품 등록 버튼
function goUploadPage() {

    // 비 로그인 유저일 경우
    if (localStorage.payload == undefined) {
        alert('로그인 후 이용 가능합니다')
    }
    
    // 로그인 유저일 경우
    else {
        location.href = '../item/upload.html'
    }
}

// 검색창에서 엔터 누르면 검색 버튼 트리거
$(".search").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#search-icon").click();
    }
});

//검색 기능 트리거
searchBtn.addEventListener('click', (e) => {
    const searchValue = document.querySelector('.search').value
    if (searchValue != '') {
        window.location.replace(`../item/search.html?query=${searchValue}`)
    }
})


// 로그인 유저는 로그아웃 버튼 display
function displayLoginLogoutBtn() {

    if (localStorage.payload !== undefined) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
    }
    else {
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
    }
}
displayLoginLogoutBtn();