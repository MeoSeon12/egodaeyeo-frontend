function modalView(){

    console.log('workds')

    const body = document.getElementsByTagName('body')
    const modal = document.getElementsByClassName('modal-body')
    body[0].style.overflow = 'hidden'
    modal[0].style.display = 'flex'
}

function modalUnView(){
    const body = document.getElementsByTagName('body')
    const modal = document.getElementsByClassName('modal-body')
    
    modal[0].style.display = 'none'
    body[0].style.overflow = 'auto'
}

const modalBody = document.querySelector('.modal-body')
const modalBtn = document.querySelector('.modal-btn')
modalBody.addEventListener('click', (e) => {
    if (e.target == modalBody) {
        modalUnView()
    }
})