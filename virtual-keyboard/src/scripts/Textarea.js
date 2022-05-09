const Textarea = () => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.id = 'keyboard-input';

  return textarea;
};

export default Textarea;
