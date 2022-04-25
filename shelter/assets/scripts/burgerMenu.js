const burgerMenu = (() => {
  const mainLogo = document.querySelector('[data-main-logo]')
  const mobileLogo = document.querySelector('[data-mobile-logo]')
  const button = document.querySelector('.burger-menu')
  const menu = document.querySelector('.mobile-menu')
  const modalWrapper = document.querySelector('.modal-wrapper')
  let isVisible = false

  const init = () => {
    button.addEventListener('click', toggleMenu)
    modalWrapper.addEventListener('click', (e) => {
      if (modalWrapper === e.target && isVisible) {
        toggleMenu()
      }
    })
  }

  const rotateBurgerButton = () => {
    button.classList.toggle('rotated')
  }

  const toggleMenu = () => {
    rotateBurgerButton()
    toggleMainLogo()
    toggleMobileLogo()
    modalWrapper.classList.toggle('opacity-0')
    menu.classList.toggle('on-screen')
    isVisible = !isVisible
  }

  const toggleMainLogo = () => {
    mainLogo.classList.toggle('opacity-0')
  }

  const toggleMobileLogo = () => {
    mobileLogo.classList.toggle('opacity-0')
  }

  return {
    get isVisible() { return isVisible },
    modalWrapper,
    button,
    init
  }
})
