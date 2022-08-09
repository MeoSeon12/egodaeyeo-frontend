// 물품 & 유저 ID 정보 가져오기
const itemId = location.href.split('?')[1]


// 물품, 리뷰 데이터 레이아웃 생성 & 입력
async function getDetailView() {

    // API 기능 호출
    let data = await DetailViewGetApi()

    if (data.error_msg) {
        const itemWrap = document.getElementsByClassName('item-wrap')[0]
        itemWrap.style.display = 'none'
        return
    }

    // 물품 섹션
    // 물품 이미지
    const slider = document.getElementsByClassName('slider')[0]

    // 이미지가 없는 경우
    if (data.images.length == 0) {
        let sliderLi = document.createElement('li')
        let sliderPicture = document.createElement('img')
        sliderPicture.setAttribute('src', 'https://egodaeyeo.s3.amazonaws.com/static/default_item.jpg')
        sliderLi.append(sliderPicture)
    }
    // 이미지가 있는 경우
    else {
        for (i = 0; i < data.images.length; i++) {
            let sliderLi = document.createElement('li')
            slider.append(sliderLi)
            let sliderPicture = document.createElement('img')
            sliderPicture.setAttribute('src', `${data.images[i]}`)
            sliderLi.append(sliderPicture)
        }
    }

    // 물품 이미지 슬라이드
    $(document).ready(function () {
        $('.slider').bxSlider({
            touchEnabled: false
        })
    });

    // 포스트 유저 프로필이미지
    const postUserImage = document.getElementById('post-user-image')
    postUserImage.setAttribute('src', data.user.image)

    // 포스트 유저 닉네임
    const postNickname = document.getElementById('post-nickname')
    postNickname.innerText = data.user.nickname

    // 포스트 유저 주소
    const address = document.getElementById('address')
    address.innerText = data.user.address

    // 포스트 유저 점수
    const score = document.getElementsByClassName('user-container-score')[0]

    if (data.user.score == null) {
        score.innerText = '유저점수 없음'
        score.style.color = 'gray'
    }
    else {
        //유저 점수에 따른 색
        if (data.user.score >= 80) {
            //초록색
            score.innerText = "유저점수 " + data.user.score + " 😄"
            score.style.color = "rgb(6, 190, 0)"
        }
        else if (data.user.score < 80 && data.user.score >= 60) {
            //파란색
            score.innerText = "유저점수 " + data.user.score + " 🙂"
            score.style.color = "rgb(0, 104, 190)"
        }
        else if (data.user.score < 60 && data.user.score > 30) {
            //주황색
            score.innerText = "유저점수 " + data.user.score + " 😐"
            score.style.color = "rgb(255, 201, 101)"
        }
        else if (data.user.score <= 30) {
            //빨간색
            score.innerText = "유저점수 " + data.user.score + " 👿"
            score.style.color = "rgb(255, 0, 0)"
        }
        score.style.fontWeight = 'bold'
    }

    // 대여 상태
    const status = document.getElementById('status')
    status.innerText = data.status
    if (data.status == '대여 중') {
        status.style.backgroundColor = '#D8D8D8'
        const remainTime = document.createElement('span')
        remainTime.style.cssText = `margin: 0 20px; color: gray;`
        remainTime.innerText = data.remain_time
        const itemBoxStatus = document.getElementsByClassName('item-box-status')[0]
        itemBoxStatus.append(remainTime)
    }
    else if (data.status == '대여 가능') {
        status.style.backgroundColor = 'rgb(191, 255, 194)'
    }
    else if (data.status == '대여 종료') {
        status.style.backgroundColor = '#F28686'
    }

    // 제목
    const title = document.getElementById('title')
    title.innerText = data.title

    // 작성 시간
    const createdAt = document.getElementById('created-at')
    createdAt.innerText = data.created_at

    // 카테고리
    const category = document.getElementById('category')
    category.innerText = data.category

    // 시간 당 대여료 (가격 설정이 되어있지않으면 숨김)
    const price = document.getElementById('price')
    const timeUnit = document.getElementById('time-unit')
    if (data.price == null) {
        price.style.display = 'none'
    }
    else if (data.price == 0) {
        price.innerText = '무료 대여'
    }
    else {
        price.innerText = `${data.price.toLocaleString('ko-KR')}원 /`
        timeUnit.innerText = data.time_unit
    }

    // 내용
    const postContent = document.getElementById('post-content')
    postContent.innerText = data.content

    // 찜 카운트
    const bookmarks = document.getElementById('bookmarks')
    bookmarks.innerText = data.bookmark_length

    // 문의하기 카운트
    const inquiries = document.getElementById('inquiries')
    inquiries.innerText = data.chatroom_length

    // 상호작용 버튼들
    const communicationContainer = document.getElementsByClassName('communication-container')[0]
    const communicationLeftBtn = document.createElement('button')
    const communicationRightBtn = document.createElement('button')
    communicationLeftBtn.setAttribute('class', 'communication-left-btn')
    communicationRightBtn.setAttribute('class', 'communication-right-btn')
    communicationContainer.append(communicationLeftBtn, communicationRightBtn)

    // 본인 게시글이 아닐 경우
    if (payload == null || data.user.id != payload['user_id']) {

        // 찜 하기 버튼
        communicationLeftBtn.setAttribute('onclick', 'bookmark()')

        // 이미 찜한 경우
        if (data.is_bookmark == true) {
            communicationLeftBtn.style.backgroundColor = '#ffe398'
            communicationLeftBtn.innerText = '찜 취소하기'
        }
        // 찜하지 않은 경우
        else if (data.is_bookmark == false) {
            communicationLeftBtn.style.backgroundColor = '#c4c4c4'
            communicationLeftBtn.innerText = '찜 하기'
        }

        // 문의하기 버튼
        communicationRightBtn.setAttribute('onclick', 'inquiry()')
        communicationRightBtn.innerText = '문의하기'
    }
    // 본인 게시글일 경우
    else {
        // 수정하기 버튼
        communicationLeftBtn.setAttribute('onclick', `location.href='update.html?item=${data.id}?user=${data.user.id}'`)
        communicationLeftBtn.innerText = '수정하기'

        // 삭제하기 버튼
        communicationRightBtn.setAttribute('onclick', 'showDeleteCheckModal()')
        communicationRightBtn.innerText = '삭제하기'
        // 마우스 오버 시
        communicationRightBtn.addEventListener('mouseover', function () {
            this.style.backgroundColor = 'rgb(253, 125, 125)'
        })
        // 마우스 아웃 시
        communicationRightBtn.addEventListener('mouseout', function () {
            this.style.backgroundColor = 'rgb(196, 196, 196)'
        })
    }


    // 리뷰 섹션
    const reviewSection = document.getElementsByClassName('review-section')[0]

    // 리뷰가 없을 시
    if (data.reviews.length == 0) {
        const reviewContainer = document.createElement('div')
        reviewContainer.setAttribute('class', 'review-container')
        reviewSection.append(reviewContainer)

        const noReview = document.createElement('p')
        noReview.innerText = '아직 리뷰가 없습니다'
        noReview.style.cssText = 'font-size: 20px; border-bottom: 0; color: gray;'
        reviewContainer.append(noReview)
    }
    // 리뷰가 있을 시
    else {
        for (i = data.reviews.length - 1; i >= 0; i--) {

            const reviewContainer = document.createElement('div')
            reviewContainer.setAttribute('class', 'review-container')
            reviewSection.append(reviewContainer)

            const reviewUserBox = document.createElement('div')
            reviewUserBox.setAttribute('class', 'review-user-box')
            reviewContainer.append(reviewUserBox)

            const reviewContentBox = document.createElement('div')
            reviewContentBox.setAttribute('class', 'review-content-box')
            reviewContainer.append(reviewContentBox)

            // 리뷰어 프로필 이미지
            const reviewUserImage = document.createElement('img')
            reviewUserImage.setAttribute('src', data.reviews[i].image)

            // 리뷰어 닉네임
            const reviewUserNickname = document.createElement('span')
            reviewUserNickname.innerText = data.reviews[i].nickname

            reviewUserBox.append(reviewUserImage, reviewUserNickname)

            // 리뷰어 내용
            const reviewContent = document.createElement('span')
            reviewContent.innerText = data.reviews[i].content

            // 작성 시간
            const reviewCreatedAt = document.createElement('span')
            reviewCreatedAt.innerText = data.reviews[i].created_at

            reviewContentBox.append(reviewContent, reviewCreatedAt)

            // 대여 기간
            const period = document.createElement('p')
            period.innerText = data.reviews[i].period
            reviewContainer.append(period)
        }
    }
}
getDetailView()


// 찜 버튼 클릭
async function bookmark() {

    // 비로그인 유저일 경우
    if (payload == null) {
        alert('로그인 후 이용가능합니다')
    }

    // 로그인 유저일 경우
    else {
        // API 기능 호출
        let bookmarkData = await DetailViewPostApi()

        const bookmarkBtn = document.getElementsByClassName('communication-left-btn')[0]
        if (bookmarkData.is_bookmark == true) {
            bookmarkBtn.style.backgroundColor = '#ffe398'
            bookmarkBtn.innerText = '찜 취소하기'
        }
        else if (bookmarkData.is_bookmark == false) {
            bookmarkBtn.style.backgroundColor = '#c4c4c4'
            bookmarkBtn.innerText = '찜 하기'
        }

        const bookmarks = document.getElementById('bookmarks')
        bookmarks.innerText = bookmarkData.bookmark_length
    }
}


// 문의하기 버튼 클릭
async function inquiry() {

    // 비로그인 유저일 경우
    if (payload == null) {
        alert('로그인 후 이용가능합니다')
    }

    // 로그인 유저일 경우
    else {
        // 모달 바디 추가
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden' // 스크롤 히든

        const inquiryModalBody = document.createElement('div')
        inquiryModalBody.setAttribute('class', 'inquiry-modal-body')
        body.append(inquiryModalBody)

        // 모달 컨테이너 추가
        const inquiryModalContainer = document.createElement('div')
        inquiryModalContainer.setAttribute('class', 'inquiry-modal-container')
        inquiryModalBody.append(inquiryModalContainer)

        // 모달 텍스트 추가
        const inquiryModalText = document.createElement('p')
        inquiryModalText.innerText =
            `확인 버튼을 누르면 채팅으로 게시자와 연결됩니다
            문의하시겠습니까?`
        inquiryModalContainer.append(inquiryModalText)

        // 모달 버튼 박스 추가
        const inquiryModalBtnBox = document.createElement('div')
        inquiryModalBtnBox.setAttribute('class', 'inquiry-modal-btn-box')
        inquiryModalContainer.append(inquiryModalBtnBox)

        // 모달 버튼 추가
        const inquiryModalEnterBtn = document.createElement('button')
        inquiryModalEnterBtn.innerText = '확인'
        const inquiryModalCancelBtn = document.createElement('button')
        inquiryModalCancelBtn.innerText = '취소'
        inquiryModalBtnBox.append(inquiryModalEnterBtn, inquiryModalCancelBtn)

        // 모달 확인 버튼 클릭시
        inquiryModalEnterBtn.addEventListener('click', async function () {

            const data = await chatStartApi()
            body.style.overflow = 'auto'
            inquiryModalBody.style.display = 'none'

            if (data['status'] == '채팅방 생성됨') {
                // 채팅방 생성
                new CreateElement().chatRoom(data)
            }
            // 채팅방 이동
            openDirectChatRoom(data.id)
        })

        // 모달 취소 버튼 클릭시
        inquiryModalCancelBtn.addEventListener('click', function () {
            body.style.overflow = 'auto'
            inquiryModalBody.style.display = 'none'
        })

        // 모달 박스 바깥 클릭시
        inquiryModalBody.addEventListener('mousedown', function (e) {
            if (e.target == inquiryModalBody) {
                body.style.overflow = 'auto'
                inquiryModalBody.style.display = 'none'
            }
        })
    }
}


// 삭제하기 버튼 클릭
function showDeleteCheckModal() {
    // 모달 바디 추가
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'hidden' // 스크롤 히든

    const inquiryModalBody = document.createElement('div')
    inquiryModalBody.setAttribute('class', 'inquiry-modal-body')
    body.append(inquiryModalBody)

    // 모달 컨테이너 추가
    const inquiryModalContainer = document.createElement('div')
    inquiryModalContainer.setAttribute('class', 'inquiry-modal-container')
    inquiryModalBody.append(inquiryModalContainer)

    // 모달 텍스트 추가
    const inquiryModalText = document.createElement('p')
    inquiryModalText.innerText =
        `확인 버튼을 누르면 게시글이 삭제됩니다
            삭제하시겠습니까?`
    inquiryModalContainer.append(inquiryModalText)

    // 모달 버튼 박스 추가
    const inquiryModalBtnBox = document.createElement('div')
    inquiryModalBtnBox.setAttribute('class', 'inquiry-modal-btn-box')
    inquiryModalContainer.append(inquiryModalBtnBox)

    // 모달 버튼 추가
    const inquiryModalEnterBtn = document.createElement('button')
    inquiryModalEnterBtn.setAttribute('class', 'delete-ok-btn')
    inquiryModalEnterBtn.setAttribute('onclick', 'deleteItem()')
    inquiryModalEnterBtn.innerText = '삭제'
    const inquiryModalCancelBtn = document.createElement('button')
    inquiryModalCancelBtn.setAttribute('class', 'cancel-ok-btn')
    inquiryModalCancelBtn.innerText = '취소'
    inquiryModalBtnBox.append(inquiryModalEnterBtn, inquiryModalCancelBtn)

    // 모달 확인 버튼 클릭시
    inquiryModalEnterBtn.addEventListener('click', function () {
        body.style.overflow = 'auto'
        inquiryModalBody.style.display = 'none'
    })

    // 모달 취소 버튼 클릭시
    inquiryModalCancelBtn.addEventListener('click', function () {
        body.style.overflow = 'auto'
        inquiryModalBody.style.display = 'none'
    })

    // 모달 박스 바깥 클릭시
    inquiryModalBody.addEventListener('mousedown', function (e) {
        if (e.target == inquiryModalBody) {
            body.style.overflow = 'auto'
            inquiryModalBody.style.display = 'none'
        }
    })
}