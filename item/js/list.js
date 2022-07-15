function openModal(){
    const modalWrap = document.getElementsByClassName('category-modal-wrap')[0]
    const modalContainer = document.getElementsByClassName('category-modal-container')[0]
    modalContainer.style.animation = 'roadRunnerIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'fadeIn 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.display = 'flex'
}

function closeModal(){
    const modalWrap = document.getElementsByClassName('category-modal-wrap')[0]
    const modalContainer = document.getElementsByClassName('category-modal-container')[0]
    modalContainer.style.animation = 'scaleLeft 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'wrapRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}
const closeModalBody = document.getElementsByTagName('body')[0]
const categoryModalBody = document.querySelector('.category-modal-wrap')
categoryModalBody.addEventListener('mouseover', (e) => {
    if (e.target == categoryModalBody) {
        closeModal()
    }
})

let pageUrl = ""

async function showAllItems(selectedSection) {

    //api에서 return한 json데이터
    const items = await itemView();

    const categories = items['categories']
    const itemsInfo = items['items']['results']
    pageUrl = items['items']['next']

    const categoryBox = document.getElementsByClassName("category-modal-box")[0];
    const itemWrap = document.getElementsByClassName("item-wrap")[0];
    const categoryText = document.getElementsByClassName("list-category")[0];
    const sectionText = document.getElementsByClassName("list-section")[0];

    categoryText.innerText = "#전체";
    if (selectedSection == "undefined" || selectedSection == "") {
        sectionText.innerText = "";
    }else {
        sectionText.innerText = "#" + selectedSection;
    }

    categoryBox.replaceChildren();
    itemWrap.replaceChildren();

    const allCategory = document.createElement("div")
    allCategory.setAttribute("class", "category-btn")
    allCategory.setAttribute("onclick", "selectedAllItems()")
    allCategory.innerHTML += "전체" + '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'
    categoryBox.append(allCategory)
    
    //json category 데이터 뽑기
    for (let i = 0; i < categories.length; i++) {

        const category = categories[i]['name']
        const newCategory = document.createElement("div")
        newCategory.setAttribute("class", "category-btn")
        newCategory.setAttribute("onclick", "selectedCategoryItems(this)")
        newCategory.innerHTML += category + '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'
        categoryBox.append(newCategory)
    }

    if (items['items']['count'] == 0) {
        itemWrap.innerText = "등록된 아이템이 없습니다."
        itemWrap.style.justifyContent = "center";
        itemWrap.style.fontSize = "24px";
        itemWrap.style.marginTop = "100px";
    }else{
        itemWrap.style.justifyContent = "flex-start";
        itemWrap.style.marginTop = "20px";

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
    
            //이미지
            const newItemImage = document.createElement('img')
            newItemImage.setAttribute("class", "item-image")
            newItemImage.setAttribute("src", item['images'])
            // 추후 [0]달아야 함
            newItemBox.append(newItemImage)
            
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
            newItemPrice.innerText = item['price'].toLocaleString() + "원 /"
            newItemDesc.append(newItemPrice)
            
            //가격단위
            const newPriceUnit = document.createElement('span')
            newPriceUnit.setAttribute("class", "price-time-unit")
            newPriceUnit.innerText = item['time_unit']
            newItemPrice.append(newPriceUnit)
            
            //주소
            const newItemLocation = document.createElement('div')
            newItemLocation.setAttribute("class", "item-location")
            newItemLocation.innerText = item['user_address']
            newItemDesc.append(newItemLocation)
            
            const newItemInterest = document.createElement('div')
            newItemInterest.setAttribute("class", "item-interest")
            newItemDesc.append(newItemInterest)
            
            const newItemLike = document.createElement('div')
            newItemLike.setAttribute("class", "item-like")
            newItemLike.innerText = "찜"
            newItemInterest.append(newItemLike)
            
            const newLikeCount = document.createElement('span')
            newLikeCount.setAttribute("class", "like-count")
            newLikeCount.innerText = item['item_bookmarks']
            newItemLike.append(newLikeCount)
            
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
}


let selectedSection = ""
let selectedCategory = ""

//파라미터 저장을 위한 함수들
function selectedAllItems() {
    selectedCategory = ""
    showAllItems(selectedSection)
}

function selectedCategoryItems(e) {
    selectedCategory = e.innerText
    showSelectedItems()
}

function selectedSectionItems(e) {
    selectedSection = e.innerText
    showSelectedItems()

    const lendButton = document.getElementById('lend-btn')
    const borrowButton = document.getElementById('borrow-btn')

    if (selectedSection == "빌려드려요") {
        e.style.backgroundColor = "#bfffc2";
        borrowButton.style.backgroundColor = "rgb(236, 236, 236)";
    }else{
        e.style.backgroundColor = "#ffefc2";
        lendButton.style.backgroundColor = "rgb(236, 236, 236)";
    }
}

async function showSelectedItems() {


    const items = await selectedItemView(selectedCategory, selectedSection)
    
    pageUrl = items['items']['next']
    const itemsInfo = items['items']['results']
    const itemWrap = document.getElementsByClassName("item-wrap")[0];
    const categoryText = document.getElementsByClassName("list-category")[0];
    const sectionText = document.getElementsByClassName("list-fsection")[0];

    //선택한 카테고리 섹션 보여주는 부분 
    if (selectedCategory == "") {
        categoryText.innerText = "#전체" + selectedCategory 
        sectionText.innerText = "#" + selectedSection
    }else if (selectedSection == ""){
        categoryText.innerText = "#" + selectedCategory
        sectionText.innerText = ""
    }else{
        categoryText.innerText = "#" + selectedCategory
        sectionText.innerText = "#" + selectedSection
    }

    itemWrap.replaceChildren();

    if (items['items']['count'] == 0) {
        itemWrap.innerText = "등록된 아이템이 없습니다."
        itemWrap.style.justifyContent = "center";
        itemWrap.style.fontSize = "24px";
        itemWrap.style.marginTop = "100px";
    }else{
        itemWrap.style.justifyContent = "flex-start";
        itemWrap.style.marginTop = "20px";

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
    
            //이미지
            const newItemImage = document.createElement('img')
            newItemImage.setAttribute("class", "item-image")
            newItemImage.setAttribute("src", item['images'])
            // 추후 [0]달아야 함
            newItemBox.append(newItemImage)
    
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
            newItemPrice.innerText = item['price'] + " /"
            newItemDesc.append(newItemPrice)
    
            //가격단위
            const newPriceUnit = document.createElement('span')
            newPriceUnit.setAttribute("class", "price-time-unit")
            newPriceUnit.innerText = item['time_unit']
            newItemPrice.append(newPriceUnit)
    
            //주소
            const newItemLocation = document.createElement('div')
            newItemLocation.setAttribute("class", "item-location")
            newItemLocation.innerText = item['user_address']
            newItemDesc.append(newItemLocation)
    
            const newItemInterest = document.createElement('div')
            newItemInterest.setAttribute("class", "item-interest")
            newItemDesc.append(newItemInterest)
    
            const newItemLike = document.createElement('div')
            newItemLike.setAttribute("class", "item-like")
            newItemLike.innerText = "찜"
            newItemInterest.append(newItemLike)
    
            const newLikeCount = document.createElement('span')
            newLikeCount.setAttribute("class", "like-count")
            newLikeCount.innerText = item['item_bookmarks']
            newItemLike.append(newLikeCount)
    
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
        const items = await scrollItemView(pageUrl)
        
        const itemsInfo = items['items']['results']
        pageUrl = items['items']['next']
        const itemWrap = document.getElementsByClassName("item-wrap")[0];
    
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
    
            //이미지
            const newItemImage = document.createElement('img')
            newItemImage.setAttribute("class", "item-image")
            newItemImage.setAttribute("src", item['images'])
            // 추후 [0]달아야 함
            newItemBox.append(newItemImage)
    
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
            newItemPrice.innerText = item['price'] + " /"
            newItemDesc.append(newItemPrice)
    
            //가격단위
            const newPriceUnit = document.createElement('span')
            newPriceUnit.setAttribute("class", "price-time-unit")
            newPriceUnit.innerText = item['time_unit']
            newItemPrice.append(newPriceUnit)
    
            //주소
            const newItemLocation = document.createElement('div')
            newItemLocation.setAttribute("class", "item-location")
            newItemLocation.innerText = item['user_address']
            newItemDesc.append(newItemLocation)
    
            const newItemInterest = document.createElement('div')
            newItemInterest.setAttribute("class", "item-interest")
            newItemDesc.append(newItemInterest)
    
            const newItemLike = document.createElement('div')
            newItemLike.setAttribute("class", "item-like")
            newItemLike.innerText = "찜"
            newItemInterest.append(newItemLike)
    
            const newLikeCount = document.createElement('span')
            newLikeCount.setAttribute("class", "like-count")
            newLikeCount.innerText = item['item_bookmarks']
            newItemLike.append(newLikeCount)
    
            const newItemInquiry = document.createElement('div')
            newItemInquiry.setAttribute("class", "item-inquiry")
            newItemInquiry.innerText = "문의"
            newItemInterest.append(newItemInquiry)
    
            const newInquiryCount = document.createElement('span')
            newInquiryCount.setAttribute("class", "inquiry-count")
            newInquiryCount.innerText = item['item_inquiries']
            newItemInquiry.append(newInquiryCount)
        }

    }else{
        console.log("컨텐츠 더이상 없음")
    }

}
showAllItems(selectedSection);
