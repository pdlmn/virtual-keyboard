const burgerMenu = (() => {
  const mainLogo = document.querySelector('[data-main-logo]')
  const mobileLogo = document.querySelector('[data-mobile-logo]')
  const menuButton = document.querySelector('.burger-menu')
  const menu = document.querySelector('.mobile-menu')
  const modalWrapper = document.querySelector('.modal-wrapper')
  let menuIsVisible = false

  const init = () => {
    menuButton.addEventListener('click', () => {
      toggleMenu()
    })
    modalWrapper.addEventListener('click', (e) => {
      console.log(modalWrapper === e.target)
      if (modalWrapper === e.target && menuIsVisible) {
        toggleMenu()
      }
    })
  }

  const rotateBurgerButton = () => {
    menuButton.classList.toggle('rotated')
  }

  const toggleMenu = () => {
    rotateBurgerButton()
    toggleMainLogo()
    toggleMobileLogo()
    modalWrapper.classList.toggle('opacity-0')
    menu.classList.toggle('on-screen')
    menuIsVisible = !menuIsVisible
  }

  const toggleMainLogo = () => {
    mainLogo.classList.toggle('opacity-0')
  }

  const toggleMobileLogo = () => {
    mobileLogo.classList.toggle('opacity-0')
  }

  return {
    init
  }
})()

burgerMenu.init()
