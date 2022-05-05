export const Key () => {
  const create = () => {
    const key = document.createElement('button');
    key.classList.add('keyboard__key')
    return key
  }

  return {
    create
  }
}
