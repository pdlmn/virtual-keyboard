const burgerMenu = (() => {
  const menuButton = document.querySelector('.burger-menu')

  const init = () => {
    menuButton.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('rotated')
      toggleMenu()
    })
  }

  const toggleMenu = () => {

  }

  return {
    init
  }
})()

burgerMenu.init()
