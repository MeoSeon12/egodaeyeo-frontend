// 물품 수정 페이지 뷰
async function updatePageView() {

    // 수정 페이지 로드 데이터 얻기
    data = await getUpdatePageLoadData()
    console.log(data.image_list)

    // CSS
    const form = document.getElementById('form')
    const submitBtn = document.getElementById('submit')
    form.style.backgroundColor = 'rgb(255 247 225)'
    submitBtn.addEventListener('mouseover', function() {
        submitBtn.style.backgroundColor = '#ffd662'
    })
    submitBtn.addEventListener('mouseout', function() {
        submitBtn.style.backgroundColor = 'rgb(240, 240, 240'
    })
    
    // 카테고리 리스트
    const categorySelect = document.getElementById('category')
    for (let i = 0; i < data.category_list.length; i++) {
        const category = document.createElement('option')
        category.setAttribute('value', data.category_list[i])
        category.innerText = `# ${data.category_list[i]}`
        categorySelect.append(category)
    }

    // 로드 데이터에 맞게 드롭다운 선택하기
    $('#section').val(`${data.item_data.section}`).prop('selected', true)
    $('#category').val(`${data.item_data.category}`).prop('selected', true)
    $('#title').val(`${data.item_data.title}`)
    $('#content').val(`${data.item_data.content}`)
    // 시간 단위, 가격 데이터가 null이 아닐 경우
    if (data.item_data.time_unit != null) {
        $('#time').val(`${data.item_data.time_unit}`).prop("selected", true)
    }
    if (data.item_data.price != null) {
        $('#price').val(`${data.item_data.price}`)
    }


    // 이미지 데이터 반영하기
    // 디폴트 이미지를 갖고 있으면 건너뛰기
    if (data.image_list[0] != '../static/default_item.jpg') {

        let fileNo = 0
        let filesArr = new Array()
        let previewArr = new Array()

        // 이미지 미리보기
        for (let i = 0; i < data.image_list.length; i++) {
            console.log(data.image_list[i])
    
            let img = new Image()
            img.onload = function() {
                previewArr.push(data.image_list[i])
            }
            img.src = `https://egodaeyeo.s3.amazonaws.com/${data.image_list[i]}`
    
            let previewHtmlData = img
            previewHtmlData.setAttribute('id', `preview-img-${fileNo}`)
            $('.file-input-custom').before(previewHtmlData)
        }
    }
}


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
            // 총 첨부된 이미지가 0, 3개 있을 시
            if (attFileCnt + curFileCnt == 0 || attFileCnt + curFileCnt == 3) {
                prImg.style.justifyContent = 'center'
            } 
            else {
                prImg.style.justifyContent = 'normal'
            }

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

            fileNo++
        }
    }
    // 초기화
    document.querySelector("input[type=file]").value = ""
}

// 첨부파일 삭제 
function deleteFile(num) {
    document.querySelector("#file" + num).remove()
    filesArr[num].is_delete = true

    let attFileCnt = document.querySelectorAll('.filebox').length

    document.querySelector("#preview-img-" + num).remove()
    previewArr[num].is_delete = true

    const prImg = document.getElementById('pr-img')
        // 총 첨부된 이미지가 0, 3개 있을 시
        if (attFileCnt == 0 || attFileCnt == 3) {
            prImg.style.justifyContent = 'center'
        }
        else {
            prImg.style.justifyContent = 'normal'
        }
}


updatePageView()