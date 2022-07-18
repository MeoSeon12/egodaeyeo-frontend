const profileInfoBox = document.getElementsByClassName('profile-info-box')[0];
const mypageTapWrap = document.getElementsByClassName('mypage-tap-wrap')[0]

async function myInfo() {
    profileInfoBox.replaceChildren();

    //프로필 이미지
    const newProfileImage = document.createElement('img')
    newProfileImage.setAttribute('class', 'profile-info-image')
    newProfileImage.setAttribute('src', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg')
    profileInfoBox.append(newProfileImage)

    const newProfileInfoText = document.createElement('div')
    newProfileInfoText.setAttribute('class', 'profile-info-text')
    profileInfoBox.append(newProfileInfoText)

    //닉네임
    const newMyNickname = document.createElement('div')
    newMyNickname.setAttribute('class', 'info-text-nickname')
    newMyNickname.innerText = "철순"
    newProfileInfoText.append(newMyNickname)

    //유저 점수
    const newMyScore = document.createElement('div')
    newMyScore.setAttribute('class', 'info-text-score')
    newMyScore.innerText = "유저점수 " + "50"
    newProfileInfoText.append(newMyScore)
}


async function rentalContinue() {
    const data = await rentalApiView() //data 전부다 

    mypageTapWrap.replaceChildren();

    const newTabContainer = document.createElement('div')
    newTabContainer.setAttribute('class', 'tab-info-container')
    mypageTapWrap.append(newTabContainer)

    const newTabBox = document.createElement('div')
    newTabBox.setAttribute('class', 'tab-info-box')
    newTabContainer.append(newTabBox)

    const newTabInner = document.createElement('div')
    newTabInner.setAttribute('class', 'tab-inner-box')
    newTabBox.append(newTabInner)

    //이미지
    const newTabImage = document.createElement('img')
    newTabImage.setAttribute('class', 'tab-info-image')
    newTabImage.setAttribute('src', 'https://static.hubzum.zumst.com/hubzum/2019/01/08/11/f6bd70a51fda4aafbf9563dadf2d82fd.jpg')
    newTabInner.append(newTabImage)

    const newTabTextBox = document.createElement('div')
    newTabTextBox.setAttribute('class', 'tab-info-text')
    newTabInner.append(newTabTextBox)
    
    // 섹션 if 문 걸어서 빌려드려요, 빌려요 ?
    const newTextSection = document.createElement('div')
    newTextSection.setAttribute('class', 'info-text-section')
    newTextSection.innerText = "빌려드려요"
    newTabTextBox.append(newTextSection)

    //아이템 제목
    const newTextTitle = document.createElement('div')
    newTextTitle.setAttribute('class', 'info-text-title')
    newTextTitle.innerText = "제목"
    newTabTextBox.append(newTextTitle)

    //시간, 스테이터스
    const newInfoData = document.createElement('div')
    newInfoData.setAttribute('class', 'info-data')
    newInfoData.innerText = "22.06.08 ~ 22.07.08"
    newTabBox.append(newInfoData)    
}


async function rentalHistory() {
    const data = await historyApiView()

}
async function bookmarkItem() {
    const data = await bookmarkApiView()

}
async function myUploadItem() {
    const data = await uploadedApiView()

}
async function Profilecheck() {
    // const data = await profileApiView()

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
    newTabImage.setAttribute('src', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg')
    newImageBox.append(newTabImage)

    const newImageText = document.createElement('p')
    newImageText.innerText = "프로필 이미지 변경"
    newImageBox.append(newImageText)

    const newProfileInfoBox = document.createElement('div')
    newProfileInfoBox.setAttribute('class', 'myprofile-info-box')
    newProfileBox.append(newProfileInfoBox)
    
    const newNicknameBox = document.createElement('div')
    newNicknameBox.setAttribute('class', 'myprofile-nickname')
    newProfileInfoBox.append(newNicknameBox)

    //인풋창 value 수정 닉네임
    const newNicknameInput = document.createElement('input')
    newNicknameInput.setAttribute('class', 'profile-input')
    newNicknameInput.value = "철순"
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
    newAddressInput.value = "경기도 파주시"
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
    newCurrentPw.setAttribute('id', 'current-pw')
    newPasswordBox.append(newCurrentPw)

   
    const newChangedPw = document.createElement('input')
    newChangedPw.setAttribute('class', 'profile-input')
    newChangedPw.setAttribute('placeholder', '새 비밀번호')
    newChangedPw.setAttribute('id', 'new-pw')
    newPasswordBox.append(newChangedPw)

    
    const newCheckPw = document.createElement('input')
    newCheckPw.setAttribute('class', 'profile-input')
    newCheckPw.setAttribute('placeholder', '새 비밀번호 재입력')
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
    newSubmitBtn.innerText = "회원 수정"
    newSubmitBox.append(newSubmitBtn)

    const newDeleteBtn = document.createElement('button')
    newDeleteBtn.setAttribute('class', 'delete-user-btn')
    newDeleteBtn.innerText = "회원 탈퇴"
    newSubmitBox.append(newDeleteBtn)
}
async function siteFeedback() {
    // const data = await feedbackApiView()

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
    newSubmitBtn.innerText = "전달하기"
    newSubmitBtnDiv.append(newSubmitBtn)
}

myInfo();
Profilecheck();