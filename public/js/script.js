// Cached Element References --------------------------------

const containerEls = document.querySelectorAll('.comment-btns-container')
const pEls = document.querySelectorAll('.content')

// Event Listeners ------------------------------------------

pEls.forEach(pEl => {
  pEl.addEventListener('click', displayBtns)
})

// Functions ------------------------------------------------

function displayBtns(evt) {
  const pIdx = parseInt(evt.target.id.replace('content', ''))
  containerEls.forEach(container => {
    const containerIdx = parseInt(container.id.replace('container', ''))
    if (pIdx === containerIdx) {
      container.style.visibility === 'visible' ? container.style.visibility = 'hidden' : container.style.visibility = 'visible'
    }
  })
}