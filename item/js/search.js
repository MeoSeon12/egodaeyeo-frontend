const itemWrap = document.getElementsByClassName("item-wrap")[0];
const searchText = document.getElementsByClassName("list-search")[0];
const sectionText = document.getElementsByClassName("list-section")[0];
const addressText = document.getElementsByClassName("list-address")[0];
const baseText = document.getElementsByClassName("list-base")[0];
let pageUrl = ""
let selectedSection = ""

async function showSearchedItems(searchValue) {

    const items = await onSearchApiView(searchValue, selectedSection)
    const itemsInfo = items['items']['results']

    pageUrl = items['items']['next']

    itemWrap.replaceChildren();
    
    baseText.innerText = "#검색"
    //검색 값 # 태그
    searchText.innerText = "#" + searchValue
    //유저의 주소 #태그
    if (itemsInfo != "") {
        const userAddress = itemsInfo[0]['user_address']
        if (userAddress == null) {
            addressText.innerText = "";
        }
        else {
            addressText.innerText = "#" + userAddress
        }
    }
    //섹션 선택 #태그 붙이는 부분
    if (selectedSection == "undefined" || selectedSection == "") {
        sectionText.innerText = "";
    }
    else if (selectedSection == "빌려드려요") {
        sectionText.innerText = "#" + selectedSection;
        sectionText.style.color = '#85ff8a';
    }
    else if (selectedSection == "빌려요") {
        sectionText.innerText = "#" + selectedSection;
        sectionText.style.color = '#ffe18a';
    }
    //검색결과 없을때 예외처리
    if (items['items']['count'] == 0) {
        itemWrap.innerText = "검색 결과가 없습니다."
        itemWrap.style.justifyContent = "center";
        itemWrap.style.fontSize = "24px";
        itemWrap.style.marginTop = "100px";
    }
    else{
        itemWrap.style.justifyContent = "flex-start";
        itemWrap.style.marginTop = "20px";
        itemDataAppend(itemsInfo)
    }
}

//섹션 파라미터 저장을 위한 함수
function selectedSectionItems(e) {
    const query = location.href.split('query=')[1]
    
    //변수에 빌려드려요, 빌려요 저장
    selectedSection = e.innerText
    showSearchedItems(decodeURI(query))
    
    const borrowButton = document.getElementById('borrow-btn')
    const lendButton = document.getElementById('lend-btn')
    let borrowHover = 'borrow-btn:hover {background-color: #ffefc2}'
    let lendHover = 'lend-btn:hover {background-color: rgb(191, 255, 194)}'

    if (selectedSection == "빌려드려요") {
        e.style.backgroundColor = "#bfffc2";
        borrowButton.style.backgroundColor = "rgb(236, 236, 236)";
        borrowButton.style.cssText = borrowHover
    }
    else{
        e.style.backgroundColor = "#ffefc2";
        lendButton.style.backgroundColor = "rgb(236, 236, 236)";
        lendButton.style.cssText = lendHover
    }
}

//스크롤 이벤트 함수
window.onscroll = function () { 
    //스크롤이 바닥에 닿았을때
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        showScrollItems(); // 컨텐츠를 추가하는 함수를 불러온다.
    }
}

async function showScrollItems() {
    if (pageUrl != null) {
        const items = await scrollItemApiView(pageUrl)
        const itemsInfo = items['items']['results']
        pageUrl = items['items']['next']
        itemDataAppend(itemsInfo)
    }
}

//HTML 데이터 붙이는 함수
function itemDataAppend(itemsInfo) {
    //json item 데이터 뽑기
    for (let i = 0; i < itemsInfo.length; i++) {
        const item = itemsInfo[i]
        const itemId = item['id']
        const newItemLink = document.createElement('a')
        newItemLink.setAttribute("class", "item-link")
        newItemLink.addEventListener('click', () => {
            location.href = `${frontEndBaseUrl}/item/detail.html?${itemId}`
        })
        itemWrap.append(newItemLink)

        const newItemBox = document.createElement('div')
        newItemBox.setAttribute("class", "item-link-box")
        newItemLink.append(newItemBox)

        if (item['image'] == null) {
            //이미지 없을시
            const newItemImage = document.createElement('img')
            newItemImage.setAttribute("class", "item-image")
            newItemImage.setAttribute("src", "https://egodaeyeo.s3.amazonaws.com/static/default_item.jpg")
            newItemBox.append(newItemImage)
        }
        else {
            //이미지 있을시
            const newItemImage = document.createElement('img')
            newItemImage.setAttribute("class", "item-image")
            newItemImage.setAttribute("src", item['image'])
            newItemBox.append(newItemImage)
        }

        const newItemDesc = document.createElement('div')
        newItemDesc.setAttribute("class", "item-desc")
        newItemBox.append(newItemDesc)

        //제목
        const newItemTitle = document.createElement('div')
        newItemTitle.setAttribute("class", "item-title")
        newItemTitle.innerText = item['title']
        newItemDesc.append(newItemTitle)

        //가격
        const newItemPrice = document.createElement('div')
        newItemPrice.setAttribute("class", "item-price")
        if (item['price'] == null) {
            newItemPrice.innerText = "가격 협의"
            newItemDesc.append(newItemPrice)
        }else {
            newItemPrice.innerText = item['price'].toLocaleString()+ "원" + " / "
            newItemDesc.append(newItemPrice)
            
            //가격단위
            const newPriceUnit = document.createElement('span')
            newPriceUnit.setAttribute("class", "price-time-unit")
            newPriceUnit.innerText = item['time_unit']
            newItemPrice.append(newPriceUnit)
        }

        const newItemInterest = document.createElement('div')
        newItemInterest.setAttribute("class", "item-interest")
        newItemDesc.append(newItemInterest)

        const newItemLike = document.createElement('div')
        newItemLike.setAttribute("class", "item-like")
        newItemLike.innerText = "찜"
        newItemInterest.append(newItemLike)
        //찜 카운트
        const newLikeCount = document.createElement('span')
        newLikeCount.setAttribute("class", "like-count")
        newLikeCount.innerText = item['item_bookmarks']
        newItemLike.append(newLikeCount)
        //문의 카운트
        const newItemInquiry = document.createElement('div')
        newItemInquiry.setAttribute("class", "item-inquiry")
        newItemInquiry.innerText = "문의"
        newItemInterest.append(newItemInquiry)

        const newInquiryCount = document.createElement('span')
        newInquiryCount.setAttribute("class", "inquiry-count")
        newInquiryCount.innerText = item['item_inquiries']
        newItemInquiry.append(newInquiryCount)
    }
}

window.onload = function(){
    const query = location.href.split('query=')[1]
    showSearchedItems(decodeURI(query))
};







