const petsPageMobileMenu = (() => {
  const menu = burgerMenu()
  const wrapper = document.querySelector('.wrapper-header')
  const links = document.querySelectorAll('.mobile-nav-menu li')

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
    links.forEach(link => link.addEventListener('click', () => {
      togglePrimaryColorOnButton()
    }))
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

const pagination = (() => {
  const start = document.querySelector('[data-paginator="start"]')
  const prev = document.querySelector('[data-paginator="prev"]')
  const current = document.querySelector('[data-paginator="current"]')
  const next = document.querySelector('[data-paginator="next"]')
  const end = document.querySelector('[data-paginator="end"]')

  let maxPages = 0
  let currentPage = 1
  const setMaxPages = () => {
    if (window.innerWidth <= 767) maxPages = 10
    else if (window.innerWidth <= 1279) maxPages = 8
    else maxPages = 6
  }

  const toPage = direction => () => {
    if (direction === 'next') currentPage += 1
    if (direction === 'prev') currentPage -= 1
    if (direction === 'start') currentPage = 1
    if (direction === 'end') currentPage = maxPages
    if (currentPage === maxPages) {
      next.disabled = true
      end.disabled = true
    } else {
      next.disabled = false
      end.disabled = false
    }
    if (currentPage === 1) {
      prev.disabled = true
      start.disabled = true
    } else {
      prev.disabled = false
      start.disabled = false
    }
    current.innerText = currentPage
  }

  const shuffle = (arr) => arr.map(elem => ({ elem, sort: Math.random() }))
      .sort((a,b) => a.sort - b.sort)
      .map(({ elem }) => elem)

  const createArrayOfPetIds = () => {
    const arr = []
    for (let i = 0; i < 6; i++) {
      arr.push(shuffle([...Array(8).keys()]))
    }
    return arr.reduce((acc, cur) => acc.concat(cur), [])
  }

  const init = () => {
    setMaxPages()
    window.addEventListener('resize', () => {
      setMaxPages()
    })
    next.addEventListener('click', toPage('next'))
    prev.addEventListener('click', toPage('prev'))
    start.addEventListener('click', toPage('start'))
    end.addEventListener('click', toPage('end'))
  }

  return {
    init
  }
})()

petsPageMobileMenu.init()
modal.init()
pagination.init()
