function openModal(){
    const body = document.getElementsByTagName('body')[0]
    const modal = document.getElementsByClassName('modal-wrap')[0]
    body.style.overflow = 'hidden'
    modal.style.display = 'flex'
}

function closeModal(){
    const body = document.getElementsByTagName('body')[0]
    const modal = document.getElementsByClassName('modal-wrap')[0]
    modal.style.display = 'none'
    body.style.overflow = 'auto'
}

const modalBody = document.querySelector('.modal-wrap')
modalBody.addEventListener('click', (e) => {
    if (e.target == modalBody) {
        closeModal()
    }
})