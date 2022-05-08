import codes from './codes';

const Keyboard = () => {
  let isShiftOn = false;
  let isCapsOn = false;
  let isAltOn = false;
  let lastEvent = '';
  let currentLanguage = 'en';

  const toggleLetterCapitalization = () => {
    codes.forEach((row) => {
      row.forEach((key) => {
        // in both languages if array of symbols for key is equal to one
        // that means that it's a letter that can be capitalized
        if (key[currentLanguage] && key[currentLanguage].length === 1) {
          const keyEl = document.querySelector(`[data-code="${key.code}"]`);
          keyEl.textContent = ((isShiftOn && !isCapsOn) || (!isShiftOn && isCapsOn))
            ? keyEl.textContent.toUpperCase()
            : keyEl.textContent.toLowerCase();
        }
      });
    });
  };

  const toggleKeySymbols = () => {
    codes.forEach((row) => {
      row.forEach((key) => {
        // if one key has more than one symbol
        if (key[currentLanguage] && key[currentLanguage].length > 1) {
          const keyEl = document.querySelector(`[data-code="${key.code}"]`);
          keyEl.textContent = (isShiftOn)
            ? key[currentLanguage][1]
            : key[currentLanguage][0];
        }
      });
    });
  };

  const toggleLanguage = () => {
    currentLanguage = currentLanguage === 'en'
      ? 'ru'
      : 'en'
  }

  const toggleCaps = () => {
    isCapsOn = !isCapsOn;
    toggleLetterCapitalization();
  }

  const toggleShift = () => {
    isShiftOn = !isShiftOn;
    toggleLetterCapitalization()
    toggleKeySymbols()
  }

  const handleKeyDown = (e) => {
    e.preventDefault();
    lastEvent = e.type;
    const key = document.querySelector(`[data-code="${e.code}"]`);
    key.classList.add('keyboard__key--pressed');

    if (key.dataset.code === 'CapsLock') {
      key.classList.toggle('keyboard__key--toggled-on');
      toggleCaps()
    }
    if (['AltLeft', 'AltRight'].includes(key.dataset.code)) {
      isAltOn = !isAltOn
      console.log(isAltOn)
    }
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      toggleShift()
    }
  };

  const handleKeyUp = (e) => {
    const key = document.querySelector(`[data-code="${e.code}"]`);
    key.classList.remove('keyboard__key--pressed');
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      toggleShift()
    }
    if (['AltLeft', 'AltRight'].includes(key.dataset.code)) {
      isAltOn = !isAltOn
      console.log(isAltOn)
    }
  };

  const handleKeyClick = (e) => {
    lastEvent = e.type;
    if (e.target.classList.contains('keyboard__key')) {
      e.target.classList.toggle('keyboard__key--pressed');
    }
    if (e.target.dataset.code === 'CapsLock') {
      e.target.classList.toggle('keyboard__key--toggled-on');
      toggleCaps()
    }
    if (['ShiftLeft', 'ShiftRight'].includes(e.target.dataset.code)) {
      toggleShift()
    } 
    if (['AltLeft', 'AltRight'].includes(e.target.dataset.code)) {
      isAltOn = !isAltOn
      console.log(isAltOn)
    }
  };

  const handleTransitionEnd = (e) => {
    // pressed class stays on some clicked keys
    // on clicked event keys detransition immediately instead of on keyup
    if (
      !['ShiftLeft', 'ShiftRight', 'AltLeft', 'AltRight'].includes(e.target.dataset.code)
      && lastEvent === 'click'
    ) {
      e.target.classList.remove('keyboard__key--pressed');
    }
  };

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
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

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
