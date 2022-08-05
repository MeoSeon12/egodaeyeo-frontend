const categoryModalBody = document.querySelector('.category-modal-wrap')
const modalWrap = document.getElementsByClassName('category-modal-wrap')[0]
const modalContainer = document.getElementsByClassName('category-modal-container')[0]

const itemWrap = document.getElementsByClassName("item-wrap")[0];
const categoryBox = document.getElementsByClassName("category-modal-box")[0];
const categoryText = document.getElementsByClassName("list-category")[0];
const searchText = document.getElementsByClassName("list-search")[0];
const sectionText = document.getElementsByClassName("list-section")[0];
const addressText = document.getElementsByClassName("list-address")[0];

let pageUrl = ""
let selectedCategory = ""
let selectedSection = ""


function openModal(){
    modalContainer.style.animation = 'roadRunnerIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'fadeIn 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.display = 'flex'
}

function closeModal(){
    modalContainer.style.animation = 'scaleLeft 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'wrapRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

categoryModalBody.addEventListener('mouseover', (e) => {
    if (e.target == categoryModalBody) {
        closeModal()
    }
})

async function showAllItems(selectedSection) {
    //api에서 return한 json데이터
    const items = await itemApiView();
    const categories = items['categories']
    const itemsInfo = items['items']['results']
    const userAddress = items['user_address']
    pageUrl = items['items']['next']

    categoryText.innerText = "#전체";

    if (userAddress == "") {
        addressText.innerText = "";
    }
    else {
        addressText.innerText = "#" + userAddress
    }
    
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

    categoryBox.replaceChildren();
    itemWrap.replaceChildren();
    
    //카테고리
    const categoryContainer = document.createElement("div")
    categoryContainer.setAttribute("class", "category-container")
    categoryBox.append(categoryContainer)

    const allCategory = document.createElement("div")
    allCategory.setAttribute("class", "category-btn")
    allCategory.setAttribute("onclick", "selectedAllItems()")
    allCategory.innerHTML += "전체" + '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'
    categoryContainer.append(allCategory)
    
    //json category 데이터 뽑기
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]['name']

        const categoryContainer = document.createElement("div")
        categoryContainer.setAttribute("class", "category-container")
        categoryBox.append(categoryContainer)

        const newCategory = document.createElement("div")
        newCategory.setAttribute("class", "category-btn")
        newCategory.setAttribute("onclick", "selectedCategoryItems(this)")
        newCategory.innerHTML += category + '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'
        categoryContainer.append(newCategory)
    }
    if (items['items']['count'] == 0) {
        itemWrap.innerText = "등록된 물품이 없습니다."
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

//파라미터 저장을 위한 함수들
function selectedAllItems() {
    selectedCategory = ""
    showAllItems(selectedSection)
}

function selectedCategoryItems(e) {
    //변수에 카테고리 저장
    selectedCategory = e.innerText
    showSelectedItems()
}

function selectedSectionItems(e) {
    //변수에 빌려드려요, 빌려요 저장
    selectedSection = e.innerText
    showSelectedItems()

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

async function showSelectedItems() {
    const items = await selectedItemApiView(selectedCategory, selectedSection)
    const itemsInfo = items['items']['results']
    pageUrl = items['items']['next']
    

    if (selectedCategory == "" && selectedSection == "빌려드려요") {
        categoryText.innerText = "#전체" + selectedCategory
        sectionText.innerText = "#" + selectedSection
        sectionText.style.color = '#85ff8a';
    }
    else if (selectedCategory == "" && selectedSection == "빌려요"){
        categoryText.innerText = "#전체" + selectedCategory
        sectionText.innerText = "#" + selectedSection
        sectionText.style.color = '#ffe18a';
    }
    else if (selectedSection == "빌려드려요") {
        categoryText.innerText = "#" + selectedCategory
        sectionText.innerText = "#" + selectedSection;
        sectionText.style.color = '#85ff8a';
    }
    else if (selectedSection == "빌려요") {
        categoryText.innerText = "#" + selectedCategory
        sectionText.innerText = "#" + selectedSection;
        sectionText.style.color = '#ffe18a';
    }
    else if (selectedSection == ""){
        categoryText.innerText = "#" + selectedCategory
        sectionText.innerText = ""
    }

    itemWrap.replaceChildren();

    if (items['items']['count'] == 0) {
        itemWrap.innerText = "등록된 물품이 없습니다."
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
        }
        else {
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


// 웰컴 박스에서 스크롤 시
var useScrollFunction = false
window.addEventListener('wheel', function (event) {
    if (event.deltaY > 0 && useScrollFunction == false) {
        if (checkVisible($('.welcome-wrap'))) {
            moveToScroll('.menu-icon-wrap', 30)
            useScrollFunction = true
        }
    }
})
// 웰컴 박스 보이는지 체크
function checkVisible(elm, eval) {
    eval = eval || "object visible"
    var viewportHeight = $(window).height()
        scrolltop = $(window).scrollTop()
        y = $(elm).offset().top,
        elementHeight = $(elm).height() - 150

    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)))
    if (eval == "above") return ((y < (viewportHeight + scrolltop)))
}
// 스크롤 자동 이동
function moveToScroll(tagName, num) {
    var offset = $(`${tagName}`).offset()
    $("html, body").animate({scrollTop: offset.top - num}, 1500)
}

showAllItems(selectedSection)




