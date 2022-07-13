async function getDetailView() {
    
    const itemId = location.href.split('?')[1]

    // 백엔드에서 데이터 받아옴
    let data = await DetailViewApi(itemId)

    // 아이템 섹션
    // 아이템 사진
    const picture = document.getElementsByClassName('post-section-picture')
    picture[0].setAttribute('src', data.images)

    // 포스트 유저 프로필이미지
    const postUserImage = document.getElementById('post-user-image')
    postUserImage.setAttribute('src', data.user.image)

    // 포스트 유저 닉네임
    const postNickname = document.getElementById('post-nickname')
    postNickname.innerText = data.user.nickname

    // 포스트 유저 주소
    const address = document.getElementById('address')
    address.innerText = data.user.address

    // 포스트 유저 스코어
    const score = document.getElementsByClassName('user-container-score')
    
    if (data.user.score == null) {
        score[0].innerText = '유저점수 없음'
    }
    else {
        score[0].innerText = data.user.score
    }

    // 대여 상태
    const status = document.getElementById('status')
    status.innerText = data.status
    if (data.status == '대여 중') {
        status.style.backgroundColor = '#D8D8D8'
        const remainTime = document.createElement('span')
        remainTime.style.cssText = `margin: 0 20px; color: gray;`
        remainTime.innerText = data.remain_time
        const itemBoxStatus = document.getElementsByClassName('item-box-status')
        itemBoxStatus[0].append(remainTime)
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

    // 시간 당 대여료
    const price = document.getElementById('price')
    const timeUnit = document.getElementById('time-unit')
    price.innerText = `${data.price.toLocaleString('ko-KR')}원 /`
    timeUnit.innerText = data.time_unit

    // 내용
    const postContent = document.getElementById('post-content')
    postContent.innerText = data.content

    // 찜 카운트
    const bookmarks = document.getElementById('bookmarks')
    bookmarks.innerText = data.bookmark_length
    
    // 문의 카운트
    const inquiries = document.getElementById('inquiries')
    inquiries.innerText = data.inquiry_length


    // 리뷰 섹션
    const reviewSection = document.getElementsByClassName('review-section')
    
    // 리뷰가 없을 시
    if (data.reviews.length == 0) {
        const reviewContainer = document.createElement('div')
        reviewContainer.setAttribute('class', 'review-container')
        reviewSection[0].append(reviewContainer)

        const noReview = document.createElement('p')
        noReview.innerText = '아직 리뷰가 없습니다'
        noReview.style.cssText = 'font-size: 20px; border-bottom: 0; color: gray;'
        reviewContainer.append(noReview)
    }
    
    // 리뷰가 있을 시
    else {
        for (i = data.reviews.length - 1; i >= 0; i--) {
            console.log(data.reviews[i])

            const reviewContainer = document.createElement('div')
            reviewContainer.setAttribute('class', 'review-container')
            reviewSection[0].append(reviewContainer)

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