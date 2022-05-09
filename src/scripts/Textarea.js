const Textarea = () => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.id = 'keyboard-input';
  textarea.spellcheck = false;

  return textarea;
};

export default Textarea;
