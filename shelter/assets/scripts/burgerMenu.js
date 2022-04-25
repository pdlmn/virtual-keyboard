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
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && isVisible) {
        toggleMenu()
      }
    })
  }

  const toggleMenu = () => {
    rotateBurgerButton()
    toggleMainLogo()
    removeMainLogo()
    toggleMobileLogo()
    toggleScroll()
    modalWrapper.classList.toggle('opacity-0')
    modalWrapper.classList.toggle('invisible')
    menu.classList.toggle('on-screen')
    isVisible = !isVisible
  }

  const rotateBurgerButton = () => {
    button.classList.toggle('rotated')
  }

  const toggleMainLogo = () => {
    mainLogo.classList.toggle('opacity-0')
  }

  const removeMainLogo = () => {
    mainLogo.classList.toggle('hidden')
  }

  const toggleMobileLogo = () => {
    mobileLogo.classList.toggle('opacity-0')
  }

  const toggleScroll = () => {
    document.body.classList.toggle('no-scroll')
  }

  return {
    get isVisible () { return isVisible },
    modalWrapper,
    button,
    init
  }
})
