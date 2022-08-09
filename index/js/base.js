// 상단바 생성
class CreateNavElement {

    constructor() {
        this.body = document.querySelector('body')
    }

    createNav() {
        const nav = document.createElement('nav')
        this.body.prepend(nav)

        const navWrap = document.createElement('div')
        navWrap.setAttribute('class', 'nav-wrap')
        nav.append(navWrap)

        const navContainer = document.createElement('div')
        navContainer.setAttribute('class', 'nav-container')
        navWrap.append(navContainer)

        const logo = document.createElement('div')
        logo.setAttribute('class', 'logo')
        navContainer.append(logo)

        const mainPageLink = document.createElement('a')
        mainPageLink.setAttribute('href', `${frontEndBaseUrl}`)
        mainPageLink.innerText = "이거대여."
        logo.append(mainPageLink)

        const searchContainer = document.createElement('div')
        searchContainer.setAttribute('class', 'search-container')
        navContainer.append(searchContainer)

        const searchInput = document.createElement('input')
        searchInput.setAttribute('class', 'search')
        searchInput.setAttribute('placeholder', '검색')
        searchContainer.append(searchInput)

        const searchIcon = document.createElement('span')
        searchIcon.setAttribute('class', 'material-symbols-outlined')
        searchIcon.setAttribute('id', 'search-icon')
        searchIcon.innerText = "search"
        searchContainer.append(searchIcon)


        // 검색창에서 엔터 누르면 검색 버튼 트리거
        $(".search").keyup(function (event) {
            if (event.keyCode === 13) {
                $("#search-icon").click();
            }
        });

        //검색 기능 트리거
        searchIcon.addEventListener('click', (e) => {
            const searchValue = document.querySelector('.search').value
            if (searchValue != '') {
                window.location.replace(`../item/search.html?query=${searchValue}`)
            }
        })

        const navBtns = document.createElement('div')
        navBtns.setAttribute('class', 'nav-btns')
        navContainer.append(navBtns)

        const myPageBtn = document.createElement('a')
        myPageBtn.setAttribute('class', 'mypage')
        myPageBtn.setAttribute('href', '../user/mypage.html')
        navBtns.append(myPageBtn)

        const myImage = document.createElement('img')
        myImage.setAttribute('class', 'mypage-image')
        myPageBtn.append(myImage)

        const chatAlarmIcon = document.createElement('span')
        chatAlarmIcon.setAttribute('class', 'material-symbols-outlined')
        chatAlarmIcon.setAttribute('id', 'alarm-icon')
        chatAlarmIcon.setAttribute('onclick', 'new Alert().showAlarmModal()')
        chatAlarmIcon.innerText = "notifications"
        navBtns.append(chatAlarmIcon)

        const itemUploadBtn = document.createElement('span')
        itemUploadBtn.setAttribute('class', 'material-symbols-outlined')
        itemUploadBtn.setAttribute('onclick', 'goUploadPage()')
        itemUploadBtn.setAttribute('title', '물품등록')
        itemUploadBtn.innerText = "file_upload"
        navBtns.append(itemUploadBtn)

        const loginLogoutBtn = document.createElement('span')
        loginLogoutBtn.setAttribute('class', 'material-symbols-outlined')
        loginLogoutBtn.setAttribute('id', 'login-logout-btn')
        loginLogoutBtn.innerText = "power_settings_new"
        navBtns.append(loginLogoutBtn)

        loginLogoutBtn.setAttribute('onclick', 'new NavModalView().loginSignupModalView()')
        loginLogoutBtn.style.color = 'green'

        loginLogoutBtn.setAttribute('onclick', 'onLogout()')
        loginLogoutBtn.style.color = 'red'


    }

    createLoginSignupModal() {
        const loginSignupModalBody = document.createElement('div')
        loginSignupModalBody.setAttribute('class', 'login-modal-body')
        loginSignupModalBody.addEventListener('mousedown', function (e) {
            if (e.target === loginSignupModalBody) {
                new NavModalView().loginSignupModalUnview()
            }
        })
        this.body.append(loginSignupModalBody)
        
        const loginContainer = document.createElement('div')
        loginContainer.setAttribute('class', 'modal-container')
        loginContainer.setAttribute('id', 'login-modal-container')
        loginSignupModalBody.append(loginContainer)
        
        const loginModalLogo = document.createElement('h2')
        loginModalLogo.innerText = "이거대여."
        loginContainer.append(loginModalLogo)

        const loginModalInputs = document.createElement('div')
        loginModalInputs.setAttribute('class', 'modal-inputs')
        loginContainer.append(loginModalInputs)

        const loginEmailInput = document.createElement('input')
        loginEmailInput.setAttribute('id', 'loginEmail')
        loginEmailInput.setAttribute('placeholder', '이메일')
        loginModalInputs.append(loginEmailInput)

        const loginPasswordInput = document.createElement('input')
        loginPasswordInput.setAttribute('id', 'loginPassword')
        loginPasswordInput.setAttribute('type', 'password')
        loginPasswordInput.setAttribute('placeholder', '비밀번호')
        loginModalInputs.append(loginPasswordInput)

        const loginWrap = document.createElement('div')
        loginWrap.setAttribute('class', 'wrap')
        loginWrap.setAttribute('id', 'login-wrap')
        loginContainer.append(loginWrap)

        const loginSubmitBtn = document.createElement('button')
        loginSubmitBtn.setAttribute('class', 'login-submit-btn')
        loginSubmitBtn.innerText = "로그인"
        loginWrap.append(loginSubmitBtn)

        loginSubmitBtn.addEventListener('click', () => {
            onLogin()
        })

        // 로그인 모달 비밀번호 잇풋창에서 엔터 누르면 로그인 버튼 트리거 가능하게 하기
        $("#loginPassword").keyup(function (event) {
            if (event.keyCode === 13) {
                onLogin()
            }
        });

        const loginModalAskSign = document.createElement('div')
        loginModalAskSign.setAttribute('class', 'ask-sign')
        loginModalAskSign.innerText = "계정이 없으신가요?"
        loginWrap.append(loginModalAskSign)

        const goToSignup = document.createElement('a')
        goToSignup.setAttribute('class', 'go-to-signup')
        goToSignup.setAttribute('onclick', 'new NavModalView().signupContainerView()')
        goToSignup.innerText = " 회원가입"
        loginModalAskSign.append(goToSignup)

        const kakaoLoginBtn = document.createElement('img')
        kakaoLoginBtn.setAttribute('class', 'kakao-btn')
        kakaoLoginBtn.setAttribute('src', '../media/kakao-btn.png')
        loginWrap.append(kakaoLoginBtn)

        kakaoLoginBtn.addEventListener("click", (e) => {
            kakaoLogin();
        })

        const signupContainer = document.createElement('div')
        signupContainer.setAttribute('class', 'modal-container')
        signupContainer.setAttribute('id', 'signup-modal-container')
        loginSignupModalBody.append(signupContainer)

        const signupModalLogo = document.createElement('h2')
        signupModalLogo.innerText = "이거대여."
        signupContainer.append(signupModalLogo)

        const signupModalInputs = document.createElement('div')
        signupModalInputs.setAttribute('class', 'modal-inputs')
        signupContainer.append(signupModalInputs)

        const signupEmailHeader = document.createElement('h5')
        signupEmailHeader.innerText = "이메일"
        signupModalInputs.append(signupEmailHeader)

        const signupEmailInput = document.createElement('input')
        signupEmailInput.setAttribute('id', 'inputEmail')
        signupModalInputs.append(signupEmailInput)

        const signupNicknameHeader = document.createElement('h5')
        signupNicknameHeader.innerText = "닉네임"
        signupModalInputs.append(signupNicknameHeader)

        const signupNicknameInput = document.createElement('input')
        signupNicknameInput.setAttribute('id', 'inputNickname')
        signupModalInputs.append(signupNicknameInput)

        const signupPasswordHeader = document.createElement('h5')
        signupPasswordHeader.innerText = "비밀번호"
        signupModalInputs.append(signupPasswordHeader)

        const signupPasswordInput = document.createElement('input')
        signupPasswordInput.setAttribute('id', 'inputPassword')
        signupPasswordInput.setAttribute('type', 'password')
        signupModalInputs.append(signupPasswordInput)

        const signupPasswordTwoHeader = document.createElement('h5')
        signupPasswordTwoHeader.innerText = "비밀번호 재입력"
        signupModalInputs.append(signupPasswordTwoHeader)

        const signupPasswordTwoInput = document.createElement('input')
        signupPasswordTwoInput.setAttribute('id', 'inputPassword2')
        signupPasswordTwoInput.setAttribute('type', 'password')
        signupModalInputs.append(signupPasswordTwoInput)

        const kakaoAddressHeader = document.createElement('h5')
        kakaoAddressHeader.innerText = "주소"
        signupModalInputs.append(kakaoAddressHeader)

        const kakaoAddress = document.createElement('input')
        kakaoAddress.setAttribute('name', 'address')
        kakaoAddress.setAttribute('id', 'address-kakao')
        kakaoAddress.setAttribute('placeholder', '주소 검색')
        kakaoAddress.setAttribute('readonly', '/')
        signupModalInputs.append(kakaoAddress)

        // 카카오 주소 API(일반유저)
        kakaoAddress.addEventListener("click", function () {
            new daum.Postcode({
                oncomplete: function (data) { //선택시 입력값 세팅
                    document.querySelector("#address-kakao").value = data.address;
                    document.querySelector("#address-kakao").focus();
                }
            }).open();
        });

        const signupSubmitBtn = document.createElement('button')
        signupSubmitBtn.setAttribute('class', 'signup-submit-btn')
        signupSubmitBtn.innerText = "회원가입"
        signupContainer.append(signupSubmitBtn)

        signupSubmitBtn.addEventListener('click', (e) => {
            onSignUp()
        })

        const signupModalAskSign = document.createElement('div')
        signupModalAskSign.setAttribute('class', 'ask-sign')
        signupModalAskSign.innerText = "이미 계정이 있으신가요?"
        signupContainer.append(signupModalAskSign)

        const goToLogin = document.createElement('a')
        goToLogin.setAttribute('class', 'ask-sign')
        goToLogin.setAttribute('onclick', 'new NavModalView().loginContainerView()')
        goToLogin.innerText = " 로그인"
        signupModalAskSign.append(goToLogin)
    }

    // 소셜 유저 회원가입시 주소 등록하는 모달
    createAddressModal() {
        const addressModalBody = document.createElement('div')
        addressModalBody.setAttribute('class', 'address-modal-body')
        this.body.append(addressModalBody)

        addEventListener('click', (e) => {
            if (e.target == addressModalBody) {
                alert("주소를 입력해주세요")
            }
        })

        const addressContainer = document.createElement('div')
        addressContainer.setAttribute('class', 'address-modal-container')
        addressContainer.setAttribute('id', 'address-modal-container')
        addressModalBody.append(addressContainer)

        const addressModalLogo = document.createElement('h2')
        addressModalLogo.innerText = "이거대여."
        addressContainer.append(addressModalLogo)

        const addressModalInputs = document.createElement('div')
        addressModalInputs.setAttribute('class', 'modal-inputs')
        addressContainer.append(addressModalInputs)

        const kakaoAddress2 = document.createElement('input')
        kakaoAddress2.setAttribute('name', 'address')
        kakaoAddress2.setAttribute('id', 'address-kakao2')
        kakaoAddress2.setAttribute('placeholder', '주소 검색')
        kakaoAddress2.setAttribute('readonly', '')
        addressModalInputs.append(kakaoAddress2)

        // 카카오 주소 API(소셜유저)
        kakaoAddress2.addEventListener("click", function () {
            new daum.Postcode({
                oncomplete: function (data) { //선택시 입력값 세팅
                    document.querySelector("#address-kakao2").value = data.address;
                    document.querySelector("#address-kakao2").focus();
                }
            }).open();
        });

        const kakaoAddressSubmitBtn = document.createElement('div')
        kakaoAddressSubmitBtn.setAttribute('class', 'address-submit-btn')
        kakaoAddressSubmitBtn.innerText = "주소 등록"
        addressModalInputs.append(kakaoAddressSubmitBtn)

        kakaoAddressSubmitBtn.addEventListener("click", (e) => {
            onAddressEnter();
        })
    }
}


// 상단바 모달
class NavModalView {

    constructor() {
        this.body = document.querySelector('body')
        this.loginSignupModalBody = document.querySelector('.login-modal-body')
        this.addressModalBody = document.querySelector('.address-modal-body')
        this.loginContainer = document.querySelector('#login-modal-container')
        this.signupContainer = document.querySelector('#signup-modal-container')
        this.addressContainer = document.querySelector('#address-modal-container')
    }

    loginSignupModalView() {
        this.body.style.overflow = 'hidden'
        this.loginSignupModalBody.style.display = 'flex'
        this.loginContainer.style.display = 'flex'
        this.signupContainer.style.display = 'none'
        this.loginSignupModalBody.style.animation = ''
        this.loginContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    }

    addressModalView() {
        this.body.style.overflow = 'hidden'
        this.loginSignupModalBody.style.display = 'none'
        this.addressModalBody.style.display = 'flex'
        this.addressModalBody.style.animation = ''
        this.addressContainer.style.animation = 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    }

    addressModalUnview() {
        this.body.style.overflow = 'auto'
        this.addressModalBody.style.display = 'flex'
        this.addressModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    }

    signupContainerView() {
        this.loginContainer.style.display = 'none'
        this.signupContainer.style.display = 'flex'
        this.signupContainer.style.animation = ''
    }

    loginContainerView() {
        this.loginContainer.style.display = 'flex'
        this.signupContainer.style.display = 'none'
        this.loginContainer.style.animation = ''
    }

    loginSignupModalUnview() {
        this.body.style.overflow = 'auto'
        this.loginSignupModalBody.style.display = 'flex'
        this.loginContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
        this.signupContainer.style.animation = 'scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
        this.loginSignupModalBody.style.animation = 'bodyGoOut 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    }
}

var payload = JSON.parse(localStorage.getItem('payload'))

// 페이지 로드 시 실행되는 기능
async function baseLoad() {
    new CreateNavElement().createNav()
    new CreateNavElement().createLoginSignupModal()
    new CreateNavElement().createAddressModal()

    displayLoginLogoutBtn(payload)

    if (payload != null) {
        userData = await getUserView(payload)

        profileImage = userData['image']
        const mypageImage = document.querySelector('.mypage-image')
        mypageImage.setAttribute('src', profileImage)
        mypageImage.style.display = 'block'
    }
} baseLoad()


// 로그인 여부에 따라 알림, 로그인, 로그아웃 display
function displayLoginLogoutBtn(payload) {
    const loginLogoutBtn = document.querySelector('#login-logout-btn')
    const alarmBtn = document.querySelector('#alarm-icon')

    if (payload !== null) {
        loginLogoutBtn.setAttribute('onclick', 'onLogout()')
        loginLogoutBtn.setAttribute('title', '로그아웃')
        loginLogoutBtn.style.color = 'red'
    }
    else {
        loginLogoutBtn.setAttribute('onclick', 'new NavModalView().loginSignupModalView()')
        loginLogoutBtn.setAttribute('title', '로그인')
        loginLogoutBtn.style.color = 'green'
        alarmBtn.style.display = 'none'
    }
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