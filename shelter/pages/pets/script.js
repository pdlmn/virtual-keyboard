const petsPageMobileMenu = (() => {
  const menu = burgerMenu()
  const wrapper = document.querySelector('.wrapper-header')

  const init = () => {
    menu.modalWrapper.addEventListener('click', (e) => {
      if (menu.isVisible && e.target === menu.modalWrapper) {
        makeWrapperStatic()
        togglePrimaryColorOnButton()
      }
    })
    menu.button.addEventListener('click', () => {
      makeWrapperStatic()
      togglePrimaryColorOnButton()
    })
    menu.modalWrapper.addEventListener('transitionend', makeWrapperSticky)
    menu.init()
  }

  const makeWrapperStatic = () => {
    wrapper.classList.add('static')
  }

  const makeWrapperSticky = () => {
    if (!menu.isVisible) {
      wrapper.classList.remove('static')
    }
  }

  const togglePrimaryColorOnButton = () => {
    const buttonBars = menu.button.querySelectorAll('div')
    buttonBars.forEach(bar => bar.classList.toggle('primary'))
  }

  return {
    init
  }
})()
petsPageMobileMenu.init()
