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
