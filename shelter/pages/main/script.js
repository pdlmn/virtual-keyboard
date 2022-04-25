const mobileMenu = burgerMenu()
mobileMenu.init()

const getPets = async () => {
  const request = await fetch('../../assets/data/pets.json')
  const petsData = await request.json()
  return petsData
}

const carousel = (() => {
  const petCards = document.querySelector('.pet-cards')
  const backButton = document.querySelector('.button-arrow-back')
  const forwardButton = document.querySelector('.button-arrow-forward')
  const activeItem = document.querySelector('[data-carousel="active"]')

  let changedItem = ''
  let previousCards = ''
  let pets = []

  const init = () => {
    backButton.addEventListener('click', moveLeft)
    forwardButton.addEventListener('click', moveRight)
    petCards.addEventListener('animationend', (e) => {
      removeAnimationClasses(e)
    })
  }

  const move = direction => () => {
    petCards.classList.add(`transition-${direction}`)
    changedItem = document.querySelector(`[data-carousel="${direction}"]`).innerHTML
  }
  const moveLeft = move('left')
  const moveRight = move('right')

  const removeAnimationClasses = (e) => {
    e.currentTarget.classList.remove('transition-left', 'transition-right')
    activeItem.innerHTML = changedItem
  }

  const setPets = (petsData) => { pets = petsData }

  return {
    init,
    setPets
  }
})()

carousel.init()
