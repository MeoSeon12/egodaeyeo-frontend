// 페이지 뷰
async function uploadPageView() {

    const data = await getUploadPageViewData()

    const categorySelect = document.getElementById('category')
    
    // 카테고리
    for (let i = 0; i < data.length; i++) {
        const category = document.createElement('option')
        category.setAttribute('value', data[i].name)
        category.innerText = `# ${data[i].name}`
        categorySelect.append(category)
    }
} uploadPageView()


let fileNo = 0  // 이미지 마다 다른 id를 지정해주기 위함
let filesArr = []  // 업로드한 이미지들을 담을 파일 리스트

// 이미지 첨부 시
function imgUpload(obj) {

    let maxFileCnt = 5   // 첨부파일 최대 개수
    let attFileCnt = document.querySelectorAll('.filebox').length    // 기존 추가된 첨부파일 개수
    let remainFileCnt = maxFileCnt - attFileCnt    // 추가로 첨부가능한 개수
    let curFileCnt = obj.files.length  // 현재 선택된 첨부파일 개수
    
    // 첨부파일 개수 확인
    // 최대 개수 초과 시
    if (curFileCnt > remainFileCnt) {
        alert("이미지는 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.")
    }

    // 최대 개수 넘지 않았을 시
    else {
        for (const file of obj.files) {
            const prImg = document.getElementById('pr-img')
            prImg.style.display = 'grid'
            
            // 파일 배열에 담기
            var blob = file.slice(0, file.size, 'image/png')
            newFile = new File([blob], `${file.name.split('.')[0]}-${(new Date / 1)}.png`, { type: 'image/png' })
            filesArr.push(newFile)

            // 이미지 미리보기
            let img = new Image()
            img.src = URL.createObjectURL(file)
            
            let previewHtmlData = img
            previewHtmlData.setAttribute('id', `preview-img-${fileNo}`)
            $('.file-input-custom').before(previewHtmlData)
            
            // 이미지 목록에 추가
            let htmlData = ''
            htmlData += '<div id="file' + fileNo + '" class="filebox">'
            htmlData += '   <p class="name">' + file.name + '</p>'
            htmlData += '   <a class="delete" onclick="deleteFile(' + fileNo + ')">❌</a>'
            htmlData += '</div>'
            $('.file-list').append(htmlData)

            fileNo++
        }
    }
}

// 첨부파일 삭제 
function deleteFile(num) {
    document.querySelector("#file" + num).remove()
    document.querySelector("#preview-img-" + num).remove()
    filesArr[num].is_delete = true
    
    let attFileCnt = document.querySelectorAll('.filebox').length
    const prImg = document.getElementById('pr-img')
        // 총 첨부된 이미지가 0개 있을 시
        if (attFileCnt == 0) {
            prImg.style.display = 'flex'
        }
        else {
            prImg.style.display = 'grid'
        }
}

function darkMode() {
    const isDarkMode = localStorage.getItem('darkMode')
    const pageTitleSection = document.querySelector('.page-title-section')
    const uploadForm = document.querySelector('#form')
    const section = document.querySelector('#section')
    const category = document.querySelector('#category')
    const time = document.querySelector('#time')
    const price = document.querySelector('#price')
    const title = document.querySelector('#title')
    const content = document.querySelector('#content')
    const uploadBtn = document.querySelector('#submit')

    if (isDarkMode) {
        const body = document.querySelector('body')
        body.style.color = 'gainsboro'
        body.style.backgroundColor = '#202124'
        pageTitleSection.classList.add('dark-mode')
        uploadForm.classList.add('dark-mode')
        section.classList.add('dark-mode')
        category.classList.add('dark-mode')
        time.classList.add('dark-mode')
        price.classList.add('dark-mode')
        title.classList.add('dark-mode')
        content.classList.add('dark-mode')
        uploadBtn.classList.add('dark-mode')
    }
}
darkMode()