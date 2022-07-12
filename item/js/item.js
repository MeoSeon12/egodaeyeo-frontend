function openModal(){
    const modalWrap = document.getElementsByClassName('category-modal-wrap')[0]
    const modalContainer = document.getElementsByClassName('category-modal-container')[0]
    modalContainer.style.animation = 'roadRunnerIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'fadeIn 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.display = 'flex'
}

function closeModal(){
    const modalWrap = document.getElementsByClassName('category-modal-wrap')[0]
    const modalContainer = document.getElementsByClassName('category-modal-container')[0]
    modalContainer.style.animation = 'scaleLeft 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    modalWrap.style.animation = 'wrapRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
}

const categoryModalBody = document.querySelector('.category-modal-wrap')
categoryModalBody.addEventListener('click', (e) => {
    if (e.target == categoryModalBody) {
        closeModal()
    }
})

