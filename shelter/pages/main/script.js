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
  const leftButton = document.querySelector('.button-arrow-back')
  const rightButton = document.querySelector('.button-arrow-forward')
  const activeItem = document.querySelector('[data-carousel="active"]')
  const leftItem = document.querySelector('[data-carousel="left"]')
  const rightItem = document.querySelector('[data-carousel="right"]')

  let changedItem = ''
  let previousItem = ''
  let currentDirection = ''
  let pets = []
  let activeIds = [0, 2, 4]

  const move = direction => () => {
    petCards.classList.add(`transition-${direction}`)
    currentDirection = direction
    previousItem = activeItem.innerHTML
    changedItem = document.querySelector(`[data-carousel="${direction}"]`).innerHTML
  }

  const removeAnimationClasses = (e) => {
    e.currentTarget.classList.remove('transition-left', 'transition-right')
  }

  const getThreeIds = () => {
    let newIds = []
    while (newIds.length < 3) {
      let randomId = getRandomInt(0, 7)
      if (!activeIds.includes(randomId) && (!newIds.includes((randomId)))) {
        newIds.push(randomId)
      }
    }
    return newIds
  }

  const generateCard = ({ name, img, id }) => {
    const card = document.createElement('div')
    let template = ''

    card.classList.add('card')
    card.dataset.id = id
    template += `<img src="${img}" class="card-image">`
    template += '<div class="card-body">'
    template += `<h3 class="card-name">${name}</h3>`
    template += '<a href="#" class="btn-secondary">Learn more</a>'
    template += '</div>'

    card.innerHTML = template

    return card
  }

  const makeCardGroup = (ids) => ids.map(id => generateCard(pets[id]))

  const generateCarouselContent = () => {
    activeItem.innerHTML = changedItem
    activeIds = [...activeItem.querySelectorAll('.card[data-id]')]
      .map(card => +card.dataset.id)
    const cardIds = getThreeIds()
    // console.log(cardIds)
    if (currentDirection === 'left') {
      rightItem.innerHTML = previousItem
      leftItem.innerHTML = ''
      leftItem.append(...makeCardGroup(cardIds))
    }
    if (currentDirection === 'right') {
      leftItem.innerHTML = previousItem
      rightItem.innerHTML = ''
      rightItem.append(...makeCardGroup(cardIds))
    }
  }

  const addEventListenersToButtons = () => {
    leftButton.addEventListener('click', move('left'), { once: true })
    rightButton.addEventListener('click', move('right'), { once: true })
  }

  const init = async () => {
    pets = await getPets()
    addEventListenersToButtons()
    petCards.addEventListener('animationend', (e) => {
      removeAnimationClasses(e)
      generateCarouselContent()
      addEventListenersToButtons()
    })
  }

  return {
    init,
    get pets () { return pets }
  }
})()

carousel.init()
