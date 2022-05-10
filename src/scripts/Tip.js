const Tip = () => {
  const tip = document.createElement('div');
  tip.textContent = 'You can change language with Shift + Alt';
  tip.classList.add('tip');
  return tip;
};

export default Tip;
