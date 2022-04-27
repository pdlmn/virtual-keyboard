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
    const newIds = []
    while (newIds.length < 3) {
      const randomId = getRandomInt(0, 7)
      if (!activeIds.includes(randomId) && (!newIds.includes((randomId)))) {
        newIds.push(randomId)
      }
    }
    return newIds
  }

  const addModalPopupToActiveCards = () => {
    activeItem.querySelectorAll('.card[data-id]')
      .forEach(card => card.addEventListener('click', (e) => {
        modal.popup(pets[e.currentTarget.dataset.id])
        toggleNoScroll()
      }))
  }

  const makeCardGroup = (ids) => ids.map(id => generateCard(pets[id]))

  const generateCarouselContent = () => {
    activeItem.innerHTML = changedItem
    activeIds = [...activeItem.querySelectorAll('.card[data-id]')]
      .map(card => +card.dataset.id)
    const cardIds = getThreeIds()
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

  const generateLeftAndRightCards = () => {
    rightItem.innerHTML = ''
    leftItem.innerHTML = ''

    rightItem.append(...makeCardGroup(getThreeIds()))
    leftItem.append(...makeCardGroup(getThreeIds()))
  }

  const addEventListenersToButtons = () => {
    leftButton.addEventListener('click', move('left'), { once: true })
    rightButton.addEventListener('click', move('right'), { once: true })
  }

  const init = async () => {
    pets = await getPets()
    generateLeftAndRightCards()
    addEventListenersToButtons()
    petCards.addEventListener('animationend', (e) => {
      removeAnimationClasses(e)
      generateCarouselContent()
      addEventListenersToButtons()
      addModalPopupToActiveCards()
    })
  }

  return {
    init,
    get pets () { return pets }
  }
})()

carousel.init()
burgerMenu().init()
modal.init()
