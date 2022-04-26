const mobileMenu = burgerMenu()
mobileMenu.init()

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

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
  const leftItem = document.querySelector('[data-carousel="left"]')
  const rightItem = document.querySelector('[data-carousel="right"]')

  let changedItem = ''
  let previousItem = ''
  let lastDirection = ''
  let pets = []
  let activeCards = [0, 2, 4]

  const getThreeIds = () => {
    let newIds = []
    while (newIds.length < 3) {
      let randomId = getRandomInt(0, 7)
      if (!activeItem.contains(randomId)) {
        newCards.push(randomId)
      }
    }
    return newIds
  }

  const move = direction => () => {
    petCards.classList.add(`transition-${direction}`)
    lastDirection = direction
    previousItem = activeItem.innerHTML
    changedItem = document.querySelector(`[data-carousel="${direction}"]`).innerHTML
  }
  const moveLeft = move('left')
  const moveRight = move('right')

  const oppositeOf = (direction) => direction === 'left' ? 'right' : 'left'

  const removeAnimationClasses = (e) => {
    e.currentTarget.classList.remove('transition-left', 'transition-right')
    activeItem.innerHTML = changedItem
    if (lastDirection === 'left') {
      rightItem.innerHTML = previousItem
    }
    if (lastDirection === 'right') {
      leftItem.innerHTML = previousItem
    }
    else {

    }
  }

  const generateCard = ({ name, img }) => {
    const card = document.createElement('div')
    let template = ''

    card.classList.add('card')
    template += `<img src="${img}" class="card-image">`
    template += '<div class="card-body">'
    template += `<h3 class="card-name">${name}</h3>`
    template += '<a href="#" class="btn-secondary">Learn more</a>'
    template += '</div>'

    card.innerHTML = template

    return card
  }

  const init = async () => {
    pets = await getPets()
    console.log(pets)
    backButton.addEventListener('click', moveLeft)
    forwardButton.addEventListener('click', moveRight)
    petCards.addEventListener('animationend', (e) => {
      removeAnimationClasses(e)
    })
  }

  return {
    init,
    get pets () { return pets }
  }
})()

carousel.init()
