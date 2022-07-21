const profileInfoBox = document.getElementsByClassName('profile-info-box')[0];
const mypageTapWrap = document.getElementsByClassName('mypage-tap-wrap')[0];
const tabButtonClass = document.getElementsByClassName('category-tab-btn')[0];
const tabButtonBox = document.querySelector('.mypage-category-box')
const tabButton = document.querySelector('.mypage-category-box').getElementsByTagName('button');

for (let i = 0; i < tabButton.length; i++) {
    tabButton[i].addEventListener('click', (e) => {
        $('.mypage-category-box').find('button').attr('style', '')
        e.target.style.transform = "scale(1.1)"
    })
}

async function myInfo() {
    const userData = await getUserView();

    if (userData == undefined) {
        alert("회원 정보가 없어 메인페이지로 돌아갑니다.")
        window.location.replace("../index.html")
    }
    profileInfoBox.replaceChildren();

    //프로필 이미지
    const newProfileImage = document.createElement('img')
    newProfileImage.setAttribute('class', 'profile-info-image')
    newProfileImage.setAttribute('src', userData['image'])
    profileInfoBox.append(newProfileImage)

    const newProfileInfoText = document.createElement('div')
    newProfileInfoText.setAttribute('class', 'profile-info-text')
    profileInfoBox.append(newProfileInfoText)

    //닉네임
    const newMyNickname = document.createElement('div')
    newMyNickname.setAttribute('class', 'info-text-nickname')
    newMyNickname.innerText = userData['nickname']
    newProfileInfoText.append(newMyNickname)

    //유저 점수
    const newMyScore = document.createElement('div')
    newMyScore.setAttribute('class', 'info-text-score')

    if (userData['score'] == null) {
        newMyScore.innerText = "유저점수 없음"
        newProfileInfoText.append(newMyScore)
    }
    else {
        //유저 점수에 따른 색
        if (userData['score'] >= 80) {
            //초록색
            newMyScore.innerText = "유저점수 " + userData['score'] + " 😄"
            newMyScore.style.color = "rgb(6, 190, 0)"
        }
        else if (userData['score'] < 80 && userData['score'] >= 60) {
            //파란색
            newMyScore.innerText = "유저점수 " + userData['score'] + " 🙂"
            newMyScore.style.color = "rgb(0, 104, 190)"
        }
        else if (userData['score'] < 60 && userData['score'] > 30) {
            //주황색
            newMyScore.innerText = "유저점수 " + userData['score'] + " 😐"
            newMyScore.style.color = "rgb(255, 201, 101)"
        }
        else if (userData['score'] <= 30) {
            //빨간색
            newMyScore.innerText = "유저점수 " + userData['score'] + " 👿"
            newMyScore.style.color = "rgb(255, 0, 0)"
        }

        newMyScore.style.fontWeight = "bold"
        newProfileInfoText.append(newMyScore)
    }

    //페이지 로딩시 유저정보
    Profilecheck(userData)
}


async function myPageTabInfo(tab) {
    let param = tab.id
    const data = await myPageApiView(param) //data 전부다

    mypageTapWrap.replaceChildren();
    if (data == "") {
        const noContent = document.createElement('div')
        noContent.setAttribute('class', 'no-content')
        mypageTapWrap.append(noContent)

        const noContentText = document.createElement('h2')
        noContentText.innerText = "해당하는 내역이 없습니다."
        noContent.append(noContentText)

    }
    else {
        for (let i = 0; i < data.length; i++) {
            const item = data[i]['item']
            const rentalDate = data[i]['rental_date']
            const timeRemaining = data[i]['time_remaining']
            const itemId = item['id']

            const newTabContainer = document.createElement('div')
            newTabContainer.setAttribute('class', 'tab-info-container')
            mypageTapWrap.append(newTabContainer)

            const newTabBox = document.createElement('div')
            newTabBox.setAttribute('class', 'tab-info-box')
            newTabBox.addEventListener('click', () => {
                location.href = `${frontEndBaseUrl}/item/detail.html?${itemId}`
            })
            newTabContainer.append(newTabBox)

            const newTabInner = document.createElement('div')
            newTabInner.setAttribute('class', 'tab-inner-box')
            newTabBox.append(newTabInner)

            //이미지
            const newTabImage = document.createElement('img')
            newTabImage.setAttribute('class', 'tab-info-image')
            newTabImage.setAttribute('src', item['image'])
            newTabInner.append(newTabImage)

            const newTabTextBox = document.createElement('div')
            newTabTextBox.setAttribute('class', 'tab-info-text')
            newTabInner.append(newTabTextBox)

            //섹션
            const newTextSection = document.createElement('div')
            newTextSection.setAttribute('class', 'info-text-section')
            newTextSection.innerText = item['section']
            newTabTextBox.append(newTextSection)

            if (item['section'] == "빌려요") {
                newTabBox.style.backgroundColor = "#FDE7C5"
                newTabBox.onmouseover = function() {
                    this.style.backgroundColor = "#fcdba7"
                }
                newTabBox.onmouseout = function() {
                    this.style.backgroundColor = "#FDE7C5"
                }
                newTextSection.style.backgroundColor = "#FDB288"
            }

            //아이템 제목
            const newTextTitle = document.createElement('div')
            newTextTitle.setAttribute('class', 'info-text-title')
            newTextTitle.innerText = item['title']
            newTabTextBox.append(newTextTitle)

            if (param == "ongoing") {
                //남은 기간
                const newInfoData = document.createElement('div')
                newInfoData.setAttribute('class', 'info-data')
                newInfoData.innerText = timeRemaining + " 남음"
                newInfoData.style.textAlign = "center"
                newTabBox.append(newInfoData)
            }
            else if (param == "closed") {
                //날짜
                const newInfoData = document.createElement('div')
                newInfoData.setAttribute('class', 'info-data')
                newInfoData.innerText = rentalDate
                newInfoData.style.textAlign = "left"
                newTabBox.append(newInfoData)
            }
            else {
                //스테이터스
                const newInfoData = document.createElement('div')
                newInfoData.setAttribute('class', 'info-data')
                newInfoData.innerText = item['status']
                newInfoData.style.fontSize = "16px"
                newInfoData.style.textAlign = "center"
                newTabBox.append(newInfoData)
            }
        }
    }

}

//이미지 업로드시, image-preview기능
function Reader(event) {
    let data = event.target
    let reader = new FileReader()
    reader.onload = function () {
        let dataURL = reader.result
        let offset = "tab-info-image"
        let output = document.getElementsByClassName(offset)[0]
        output.src = dataURL
    }
    reader.readAsDataURL(data.files[0])
}

function Profilecheck(userData) {

    mypageTapWrap.replaceChildren();

    const newProfileContainer = document.createElement('div')
    newProfileContainer.setAttribute('class', 'myprofile-container')
    mypageTapWrap.append(newProfileContainer)

    const newProfileBox = document.createElement('div')
    newProfileBox.setAttribute('class', 'myprofile-top-box')
    newProfileContainer.append(newProfileBox)

    const newImageBox = document.createElement('div')
    newImageBox.setAttribute('class', 'myprofile-image-box')
    newProfileBox.append(newImageBox)

    //프로필 이미지
    const newTabImage = document.createElement('img')
    newTabImage.setAttribute('class', 'tab-info-image')
    newTabImage.setAttribute('src', userData['image'])
    newImageBox.append(newTabImage)

    const newInputLabel = document.createElement('label')
    newInputLabel.setAttribute('class', 'profile-upload-btn')
    newInputLabel.setAttribute('for', 'profile-input')
    newInputLabel.innerText = "프로필 사진 변경"
    newImageBox.append(newInputLabel)

    const newImageInput = document.createElement('input')
    newImageInput.setAttribute('type', 'file')
    newImageInput.setAttribute('onchange', 'Reader(event)')
    newImageInput.setAttribute('accept', 'image/*')
    newImageInput.setAttribute('id', 'profile-input')
    newImageBox.append(newImageInput)

    const newProfileInfoBox = document.createElement('div')
    newProfileInfoBox.setAttribute('class', 'myprofile-info-box')
    newProfileBox.append(newProfileInfoBox)

    const newNicknameBox = document.createElement('div')
    newNicknameBox.setAttribute('class', 'myprofile-nickname')
    newProfileInfoBox.append(newNicknameBox)

    //닉네임 인풋
    const newNicknameInput = document.createElement('input')
    newNicknameInput.setAttribute('class', 'profile-input')
    newNicknameInput.setAttribute('id', 'nickname-input')
    newNicknameInput.value = userData['nickname']
    newNicknameBox.append(newNicknameInput)

    const newPutNickname = document.createElement('div')
    newPutNickname.setAttribute('class', 'myprofile-nickname-btn')
    newNicknameBox.append(newPutNickname)

    const newNicknameText = document.createElement('p')
    newNicknameText.innerText = "닉네임 변경"
    newPutNickname.append(newNicknameText)

    const newPutAddress = document.createElement('div')
    newPutAddress.setAttribute('class', 'myprofile-address')
    newProfileInfoBox.append(newPutAddress)

    //인풋창 value 수정 주소
    const newAddressInput = document.createElement('input')
    newAddressInput.setAttribute('class', 'profile-input')
    newAddressInput.setAttribute('id', 'address-input')
    // 카카오 주소 API(일반유저)
    newAddressInput.addEventListener("click", function () {
        new daum.Postcode({
            oncomplete: function (data) { //선택시 입력값 세팅
                newAddressInput.value = data.address;
                newAddressInput.focus();
            }
        }).open();
    });
    newAddressInput.readOnly = true;
    newAddressInput.value = userData['address']
    newPutAddress.append(newAddressInput)

    const newAddressText = document.createElement('p')
    newAddressText.innerText = "주소 변경"
    newPutAddress.append(newAddressText)

    const newPutPassword = document.createElement('div')
    newPutPassword.setAttribute('class', 'myprofile-password')
    newProfileInfoBox.append(newPutPassword)

    const newPasswordBox = document.createElement('div')
    newPasswordBox.setAttribute('class', 'password-input')
    newPutPassword.append(newPasswordBox)

    //비밀번호 인풋
    const newCurrentPw = document.createElement('input')
    newCurrentPw.setAttribute('class', 'profile-input')
    newCurrentPw.setAttribute('placeholder', '현재 비밀번호')
    newCurrentPw.setAttribute('type', 'password')
    newCurrentPw.setAttribute('id', 'current-pw')
    newPasswordBox.append(newCurrentPw)


    const newChangedPw = document.createElement('input')
    newChangedPw.setAttribute('class', 'profile-input')
    newChangedPw.setAttribute('placeholder', '새 비밀번호')
    newChangedPw.setAttribute('type', 'password')
    newChangedPw.setAttribute('id', 'new-pw')
    newPasswordBox.append(newChangedPw)


    const newCheckPw = document.createElement('input')
    newCheckPw.setAttribute('class', 'profile-input')
    newCheckPw.setAttribute('placeholder', '새 비밀번호 재입력')
    newCheckPw.setAttribute('type', 'password')
    newCheckPw.setAttribute('id', 'check-pw')
    newPasswordBox.append(newCheckPw)

    const newPasswordText = document.createElement('p')
    newPasswordText.innerText = "비밀번호 변경"
    newPutPassword.append(newPasswordText)

    const newBottomBox = document.createElement('div')
    newBottomBox.setAttribute('class', 'myprofile-bottom-box')
    newProfileContainer.append(newBottomBox)

    const newSubmitBox = document.createElement('div')
    newSubmitBox.setAttribute('class', 'myprofile-submit-btn')
    newBottomBox.append(newSubmitBox)

    const newSubmitBtn = document.createElement('button')
    newSubmitBtn.setAttribute('class', 'submit-user-btn')
    newSubmitBtn.addEventListener('click', () => {
        profileApiView()
    })
    newSubmitBtn.innerText = "회원 수정"
    newSubmitBox.append(newSubmitBtn)

    const newDeleteBtn = document.createElement('button')
    newDeleteBtn.setAttribute('class', 'delete-user-btn')
    newDeleteBtn.addEventListener('click', () => {
        userDeleteModal()
    })
    newDeleteBtn.innerText = "회원 탈퇴"
    newSubmitBox.append(newDeleteBtn)
}

function siteFeedback() {

    mypageTapWrap.replaceChildren();

    const newFeedbackBody = document.createElement('div')
    newFeedbackBody.setAttribute('class', 'feedback-body')
    mypageTapWrap.append(newFeedbackBody)

    const newFeedbackTitle = document.createElement('input')
    newFeedbackTitle.setAttribute('class', 'feedback-title')
    newFeedbackTitle.setAttribute('placeholder', '제목')
    newFeedbackBody.append(newFeedbackTitle)

    const newFeedbackText = document.createElement('textarea')
    newFeedbackText.setAttribute('class', 'feedback-textarea')
    newFeedbackText.setAttribute('placeholder', '내용')
    newFeedbackBody.append(newFeedbackText)

    const newThanks = document.createElement('div')
    newThanks.setAttribute('class', 'thanks-for-feedback')
    newThanks.innerText = "소중한 의견 감사합니다"
    newFeedbackBody.append(newThanks)

    const newSubmitBtnDiv = document.createElement('div')
    newSubmitBtnDiv.setAttribute('class', 'submit-btn')
    newFeedbackBody.append(newSubmitBtnDiv)

    const newSubmitBtn = document.createElement('button')
    newSubmitBtn.addEventListener('click', () => {
        feedbackApiView()
    })
    newSubmitBtn.innerText = "전달하기"
    newSubmitBtnDiv.append(newSubmitBtn)
}

// 문의하기 버튼 클릭
async function userDeleteModal() {

    // 모달 바디 추가
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'hidden' // 스크롤 히든

    const inquiryModalBody = document.createElement('div')
    inquiryModalBody.setAttribute('class', 'delete-modal-body')
    body.append(inquiryModalBody)

    // 모달 컨테이너 추가
    const inquiryModalContainer = document.createElement('div')
    inquiryModalContainer.setAttribute('class', 'delete-modal-container')
    inquiryModalBody.append(inquiryModalContainer)

    // 모달 텍스트 추가
    const inquiryModalText = document.createElement('p')
    inquiryModalText.innerText =
        `확인 버튼을 누르시면 회원 탈퇴가 진행됩니다. 
        탈퇴 진행 하시겠습니까?`
    inquiryModalContainer.append(inquiryModalText)

    // 모달 버튼 박스 추가
    const inquiryModalBtnBox = document.createElement('div')
    inquiryModalBtnBox.setAttribute('class', 'delete-modal-btn-box')
    inquiryModalContainer.append(inquiryModalBtnBox)

    // 모달 버튼 추가
    const inquiryModalEnterBtn = document.createElement('button')
    inquiryModalEnterBtn.innerText = '확인'
    const inquiryModalCancelBtn = document.createElement('button')
    inquiryModalCancelBtn.innerText = '취소'
    inquiryModalBtnBox.append(inquiryModalEnterBtn, inquiryModalCancelBtn)

    // 모달 확인 버튼 클릭시
    inquiryModalEnterBtn.addEventListener('click', function () {
        userDeleteApiView()
        body.style.overflow = 'auto'
        inquiryModalBody.style.display = 'none'
    })

    // 모달 취소 버튼 클릭시
    inquiryModalCancelBtn.addEventListener('click', function () {
        body.style.overflow = 'auto'
        inquiryModalBody.style.display = 'none'
    })

    // 모달 박스 바깥 클릭시
    inquiryModalBody.addEventListener('click', function (e) {
        if (e.target == inquiryModalBody) {
            body.style.overflow = 'auto'
            inquiryModalBody.style.display = 'none'
        }
    })
}

myInfo();