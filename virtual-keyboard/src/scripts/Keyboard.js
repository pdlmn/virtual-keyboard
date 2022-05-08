import codes from './codes';

const Keyboard = () => {
  let isShiftOn = false;
  let isCapsOn = false;
  let lastEvent = '';
  const currentLanguage = 'en';

  const handleKeyDown = (e) => {
    e.preventDefault();
    lastEvent = e.type;
    const key = document.querySelector(`[data-code="${e.code}"]`);
    key.classList.add('keyboard__key--pressed');

    if (key.dataset.code === 'CapsLock') {
      key.classList.toggle('keyboard__key--toggled-on');
      isCapsOn = !isCapsOn;
      changeCapitalizationKeyLetters();
    }
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      isShiftOn = !isShiftOn;
      changeCapitalizationKeyLetters();
      console.log(isShiftOn);
    }
  };

  const handleKeyUp = (e) => {
    const key = document.querySelector(`[data-code="${e.code}"]`);
    key.classList.remove('keyboard__key--pressed');
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      isShiftOn = !isShiftOn;
      changeCapitalizationKeyLetters();
      console.log(isShiftOn);
    }
  };

  const changeCapitalizationKeyLetters = () => {
    codes.forEach((row) => {
      row.forEach((key) => {
        // in both languages if array of symbols for key is equal to one
        // that means that it's a letter that can be capitalized
        if (key[currentLanguage] && key[currentLanguage].length === 1) {
          const keyEl = document.querySelector(`[data-code="${key.code}"]`);
          keyEl.textContent = (isShiftOn && !isCapsOn || !isShiftOn && isCapsOn)
            ? keyEl.textContent.toUpperCase()
            : keyEl.textContent.toLowerCase();
        }
      });
    });
  };

  const handleKeyClick = (e) => {
    lastEvent = e.type;
    if (e.target.classList.contains('keyboard__key')) {
      e.target.classList.toggle('keyboard__key--pressed');
    }
    if (e.target.dataset.code === 'CapsLock') {
      e.target.classList.toggle('keyboard__key--toggled-on');
      isCapsOn = !isCapsOn;
      changeCapitalizationKeyLetters();
    }
    if (['ShiftLeft', 'ShiftRight'].includes(e.target.dataset.code)) {
      isShiftOn = !isShiftOn;
      changeCapitalizationKeyLetters();
      console.log(isShiftOn);
    }
  };

  const handleTransitionEnd = (e) => {
    // pressed class stays on clicked shift keys
    // on clicked event keys detransition immediately instead of on keyup
    if (
      !['ShiftLeft', 'ShiftRight'].includes(e.target.dataset.code) &&
      lastEvent === 'click'
    ) {
      e.target.classList.remove('keyboard__key--pressed');
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  const create = () => {
    const wrapper = document.createElement('div');
    const keyboard = document.createElement('div');

    wrapper.classList.add('wrapper');
    keyboard.classList.add('keyboard');

    wrapper.append(keyboard);

    codes.forEach((row) => {
      const rowEl = document.createElement('div');
      rowEl.classList.add('keyboard__row');

      keyboard.append(rowEl);
      row.forEach((key) => {
        const keyEl = document.createElement('div');
        keyEl.dataset.code = key.code;
        keyEl.classList.add('keyboard__key');

        if (key.name) {
          keyEl.textContent = key.name;
          keyEl.classList.add('keyboard__key--dark');
        } else {
          [keyEl.textContent] = key.en;
        }

        if (key.code === 'CapsLock') {
          keyEl.classList.add('keyboard__key--toggled');
        }

        if (['Backspace', 'Tab', 'Enter', 'ShiftLeft', 'Space'].includes(key.code)) {
          keyEl.classList.add('keyboard__key--grow-1');
        }

        rowEl.append(keyEl);
      });
    });

    keyboard.addEventListener('click', handleKeyClick);
    keyboard.addEventListener('transitionend', handleTransitionEnd);

    return wrapper;
  };

  // window.addEventListener('keydown', (e) => {
  //   // console.log(`key: ${e.key}`)
  //   console.log(`code: ${e.code}`);
  // });

  return {
    create,
  };
};

const keyboard = Keyboard();
document.body.append(keyboard.create());

export default Keyboard;
