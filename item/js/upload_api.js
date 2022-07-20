// 폼 전송
async function submitForm() {

    const title = document.getElementById('title').value
    const desc = document.getElementById('desc').value
    

    // 폼데이터 담기
    let form = document.querySelector("form");
    let formData = new FormData(form);
    formData.append('title', title)
    formData.append('desc', desc)
    for (let i = 0; i < filesArr.length; i++) {
        // 삭제되지 않은 파일만 폼데이터에 담기
        if (!filesArr[i].is_delete) {
            formData.append('image', filesArr[i]);
        }
    }
    
    const token = localStorage.getItem('access_token')
    const response = await fetch(`${backEndBaseUrl}/items/upload`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    
    //  요청 성공 (아이템 DB 존재함)
    if (response.status == 200) {
        return response
    }
}
// $.ajax({
//     method: 'POST',
//     url: '/register',
//     dataType: 'json',
//     data: formData,
//     async: true,
//     timeout: 30000,
//     cache: false,
//     headers: {'cache-control': 'no-cache', 'pragma': 'no-cache'},
//     success: function () {
//         alert("파일업로드 성공");
//     },
//     error: function (xhr, desc, err) {
//         alert('에러가 발생 하였습니다.');
//         return;
//     }
// })