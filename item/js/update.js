let fileNo = 0  // 이미지 파일 순서대로 번호 부여
let filesArr = new Array()  // 폼 데이터에 넣은 이미지 리스트
let previewArr = new Array()    // 미리보기 이미지 리스트

// 물품 수정 페이지 뷰
async function updatePageView() {

    // 수정 페이지 로드 데이터 얻기
    data = await getUpdatePageLoadData()

    // 카테고리 리스트
    const categorySelect = document.getElementById('category')
    for (let i = 0; i < data.category_list.length; i++) {
        const category = document.createElement('option')
        category.setAttribute('value', data.category_list[i])
        category.innerText = `# ${data.category_list[i]}`
        categorySelect.append(category)
    }

    // 로드 데이터를 페이지에 반영
    $('#section').val(`${data.item_data.section}`).prop('selected', true)
    $('#category').val(`${data.item_data.category}`).prop('selected', true)
    $('#status').val(`${data.item_data.status}`).prop('selected', true)
    $('#title').val(`${data.item_data.title}`)
    $('#content').val(`${data.item_data.content}`)

    // 시간, 가격이 null이면 반영하지 않음
    if (data.item_data.time_unit != null) {
        $('#time').val(`${data.item_data.time_unit}`).prop("selected", true)
    }
    if (data.item_data.price != null) {
        $('#price').val(`${data.item_data.price}`)
    }

    // 디폴트 이미지를 갖고 있지않으면 이미지 데이터 반영
    if (data.image_list[0]['image'] != '../static/default_item.jpg') {

        // 이미지 하나씩
        for (let i = 0; i < data.image_list.length; i++) {
            // 이미지 미리보기
            let img = new Image()
            previewArr.push(data.image_list[i])
            img.src = `https://egodaeyeo.s3.amazonaws.com/${data.image_list[i]['image']}`
            
            let previewHtmlData = img
            previewHtmlData.setAttribute('id', `preview-img-${fileNo}`)
            $('.file-input-custom').before(previewHtmlData)
            
            // 이미지 목록에 추가
            let htmlData = ''
            htmlData += '<div id="file' + fileNo + '" class="filebox">'
            htmlData += '   <p class="name">' + data.image_list[i]['image'].substring(5) + '</p>'
            htmlData += '   <a class="delete" onclick="deleteFile(' + fileNo + ')">❌</a>'
            htmlData += '</div>'
            $('.file-list').append(htmlData)

            // 이미 저장된 이미지들 배열에 담기
            filesArr.push({
                'image': '이미 저장된 이미지',
                'id': data.image_list[i]['id'],  // 삭제할 경우를 위해 ID 값을 포함시킴
                'go_delete': false,
            })
            fileNo++
        }
        uploadButtonPosition()
    }
}


// 이미지 첨부
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
            // 이미지 미리보기
            let img = new Image()
            img.onload = function() {
                previewArr.push(file)
            }
            img.src = URL.createObjectURL(file)
            
            let previewHtmlData = img
            previewHtmlData.setAttribute('id', `preview-img-${fileNo}`)
            $('.file-input-custom').before(previewHtmlData)

            
            // 파일 배열에 담기
            let reader = new FileReader()
            reader.onload = function() {
                filesArr.push(file)
            }
            reader.readAsDataURL(file)
            
            // 이미지 목록에 추가
            let htmlData = ''
            htmlData += '<div id="file' + fileNo + '" class="filebox">'
            htmlData += '   <p class="name">' + file.name + '</p>'
            htmlData += '   <a class="delete" onclick="deleteFile(' + fileNo + ')">❌</a>'
            htmlData += '</div>'
            $('.file-list').append(htmlData)
            
            uploadButtonPosition()
            fileNo++
        }
    }
    // 초기화
    document.querySelector("input[type=file]").value = ""
}

// 첨부파일 삭제 
function deleteFile(num) {
    document.querySelector("#file" + num).remove()

    // 기존에 저장된 이미지는 go_delete true 로 지정
    if (filesArr[num]['image']) {
        filesArr[num].go_delete = true
    }
    else {
        // 새로 첨부한 이미지는 is_delete true 로 지정
        filesArr[num].is_delete = true
    }
    
    document.querySelector("#preview-img-" + num).remove()
    previewArr[num].is_delete = true

    uploadButtonPosition()
}


// 미리보기 이미지 갯수에 따라 첨부 버튼 정렬
function uploadButtonPosition() {
    let attFileCnt = document.querySelectorAll('.filebox').length
    const prImg = document.getElementById('pr-img')

    // 총 첨부된 이미지가 0, 3개 있을 시
    if (attFileCnt == 0 || attFileCnt == 3) {
        prImg.style.justifyContent = 'center'
    }
    else {
        prImg.style.justifyContent = 'normal'
    }
}


// 빌려요 선택한 경우
function sectionValCheck(obj) {
    const status = document.getElementById('status')
    if (obj.value == '빌려요') {
        status.style.display = 'none'
    }
    else {
        status.style.display = 'inline-block'
    }
}

updatePageView()