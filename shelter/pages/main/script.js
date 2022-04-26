const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const getPets = async () => {
  const request = await fetch('../../assets/data/pets.json')
  const petsData = await request.json()
  return petsData
}

const toggleNoScroll = () => document.body.classList.toggle('no-scroll-modal')

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

  const generateCard = ({ name, img, id }) => {
    const card = document.createElement('div')
    let template = ''

    card.classList.add('card')
    card.dataset.id = id
    template += `<img src="${img}" class="card-image">`
    template += '<div class="card-body">'
    template += `<h3 class="card-name">${name}</h3>`
    template += '<button class="btn-secondary">Learn more</button>'
    template += '</div>'

    card.innerHTML = template

    return card
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
      addModalPopupToActiveCards()
    })
  }

  return {
    init,
    get pets () { return pets }
  }
})()

const modal = (() => {
  const cards = document.querySelectorAll('[data-carousel="active"] .card')

  const createModal = ({ 
    name,
    img,
    type,
    breed,
    description,
    age,
    inoculations, 
    diseases,
    parasites 
  }) => {
    const wrapper = document.createElement('div')
    const contentWrapper = document.createElement('div')
    const closeButton = document.createElement('button')
    const modal = document.createElement('div')
    const image = document.createElement('img')
    const cardContent = document.createElement('div')
    const cardHeading = document.createElement('div')
    const cardDescription = document.createElement('p')
    const cardList = document.createElement('ul') 

    wrapper.classList.add('modal-wrapper')
    contentWrapper.classList.add('modal-content-wrapper')
    modal.classList.add('modal')
    closeButton.classList.add('button-round', 'modal-close')
    cardHeading.classList.add('modal-heading')
    cardContent.classList.add('modal-card-content')
    cardDescription.classList.add('paragraph-l', 'modal-description')
    cardList.classList.add('modal-list')
    image.classList.add('modal-image')

    let cardHeadingTemplate = `<h3 class="heading3">${name}</h3>`
    cardHeadingTemplate += `<h5 class="heading5 modal-subheading">${type} - ${breed}</h5>`
    let cardListTemplate = `<li><strong>Age</strong>: ${age}</li>`
    cardListTemplate += `<li><strong>Inoculations</strong>: ${inoculations.join(', ')}</li>`
    cardListTemplate += `<li><strong>Diseases</strong>: ${diseases.join(', ')}</li>`
    cardListTemplate += `<li><strong>Parasites</strong>: ${parasites.join(', ')}</li>`

    image.src = img
    cardDescription.innerText = description
    cardHeading.innerHTML = cardHeadingTemplate
    cardList.innerHTML = cardListTemplate

    wrapper.append(contentWrapper)
    contentWrapper.append(modal, closeButton)
    closeButton.append('✕')
    cardContent.append(cardHeading, cardDescription, cardList)
    modal.append(image, cardContent)

    wrapper.addEventListener('click', (e) => {
      if (e.target === wrapper || e.target === closeButton || e.target === contentWrapper) {
        wrapper.remove()
        toggleNoScroll()
      }
    })
    return wrapper
  }

  const popup = (pet) => {
    const modal = createModal(pet)
    document.body.append(modal)
  }

  const init = async () => {
    const pets = await getPets()
    cards.forEach(card => card.addEventListener('click', (e) => {
      popup(pets[e.currentTarget.dataset.id])
      toggleNoScroll()
    }))
  }

  return {
    init,
    popup
  }
})()

carousel.init()
burgerMenu().init()
modal.init()
