const mobileMenu = burgerMenu()

mobileMenu.init()

const carousel = () => {
  let pets = []
  fetch('../../assets/data/pets.json')
    .then(data => data.json())
    .then(json => { pets = json })
}

carousel()
