const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const toggleNoScroll = () => document.body.classList.toggle('no-scroll-modal')

const getPets = async () => {
  const request = await fetch('../../assets/data/pets.json')
  const petsData = await request.json()
  return petsData
}

const modal = (() => {
  const cards = document.querySelectorAll('.card')

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
