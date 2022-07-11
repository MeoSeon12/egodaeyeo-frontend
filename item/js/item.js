function openModal(){
    const body = document.getElementsByTagName('body')[0]
    const modalWrap = document.getElementsByClassName('modal-wrap')[0]
    const modalContainer = document.getElementsByClassName('modal-container')[0]
    modalContainer.style.animation = 'roadRunnerIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'fadeIn 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.display = 'flex'
    body.style.overflow = 'hidden'
}

function closeModal(){
    const body = document.getElementsByTagName('body')[0]
    const modalWrap = document.getElementsByClassName('modal-wrap')[0]
    const modalContainer = document.getElementsByClassName('modal-container')[0]
    modalContainer.style.animation = 'roadRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'wrapRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    body.style.overflow = 'auto'
}

const modalBody = document.querySelector('.modal-wrap')
modalBody.addEventListener('click', (e) => {
    if (e.target == modalBody) {
        closeModal()
    }
})