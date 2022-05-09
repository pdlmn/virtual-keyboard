import codes from './codes';

const Keyboard = (textarea) => {
  const input = textarea;
  let isShiftOn = false;
  let isCapsOn = false;
  let isAltOn = false;
  let lastEvent = '';
  let currentLanguage = localStorage.getItem('language') || 'ru';

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
        const keyEl = document.querySelector(`[data-code="${key.code}"]`);
        if (key[currentLanguage] && key[currentLanguage].length > 1) {
          keyEl.textContent = (isShiftOn)
            ? key[currentLanguage][1]
            : key[currentLanguage][0];
        }
        // if not Russian symbols for this key and not key like backspace
        // should defult to symbols from English
        if (!key[currentLanguage] && !key.name) {
          keyEl.textContent = (isShiftOn)
            ? key.en[1]
            : key.en[0];
        }
      });
    });
  };

  const addKeyLetters = (el = document) => {
    codes.forEach((row) => {
      row.forEach((key) => {
        const keyEl = el.querySelector(`[data-code="${key.code}"]`);
        if (key.name) {
          keyEl.textContent = key.name;
        } else if (currentLanguage === 'ru' && key.ru) {
          [keyEl.textContent] = key.ru;
        } else {
          [keyEl.textContent] = key.en;
        }
      });
    });
  };

  const toggleLanguage = () => {
    currentLanguage = (currentLanguage === 'en')
      ? 'ru'
      : 'en';
    addKeyLetters();
    localStorage.setItem('language', currentLanguage);
  };

  const toggleCaps = () => {
    isCapsOn = !isCapsOn;
    toggleLetterCapitalization();
  };

  const toggleShift = () => {
    isShiftOn = !isShiftOn;
    toggleLetterCapitalization();
    toggleKeySymbols();
  };

  const isForInput = (code) => code.includes('Key')
    || code.includes('Digit')
    || [
      'Backquote',
      'Minus',
      'Equal',
      'BracketLeft',
      'BracketRight',
      'Backslash',
      'Semicolon',
      'Quote',
      'Comma',
      'Period',
      'Slash',
    ].includes(code);

  const handleKeyDown = (e) => {
    e.preventDefault();
    lastEvent = e.type;
    const key = document.querySelector(`[data-code="${e.code}"]`);
    if (!key) return;
    key.classList.add('keyboard__key--pressed');
    input.focus();

    if (key.dataset.code === 'CapsLock') {
      key.classList.toggle('keyboard__key--toggled-on');
      toggleCaps();
    }
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      toggleShift();
    }
    if (e.altKey && e.shiftKey) {
      toggleLanguage();
    }
    if (isForInput(e.code)) {
      input.value += key.textContent;
    }
    if (e.code === 'Enter') {
      input.value += '\n';
    }
    if (e.code === 'Backspace') {
      input.value = input.value.slice(0, -1);
    }
    if (e.code === 'Tab') {
      input.value += '\t';
    }
    if (e.code === 'ArrowLeft') {
      const newPosition = input.selectionStart - 1;
      if (newPosition >= 0) input.setSelectionRange(newPosition, newPosition);
      console.log(input.selectionStart);
    }
    if (e.code === 'ArrowRight') {
      const newPosition = input.selectionStart + 1;
      input.setSelectionRange(newPosition, newPosition);
      console.log(input.selectionStart);
    }
    if (e.code === 'ArrowDown') {
      const nextLineBreak = input.value.indexOf('\n', input.selectionStart);
      let newPosition;
      // if no next lines
      if (nextLineBreak + 1 === 0) {
        newPosition = input.value.length;
      } else {
        newPosition = nextLineBreak + 1;
      }
      input.setSelectionRange(newPosition, newPosition);
    }
    if (e.code === 'ArrowUp') {
      const prevLineBreak = input.value.lastIndexOf('\n', input.selectionStart - 1);
      console.log(prevLineBreak)
      let newPosition;
      if (prevLineBreak >= 0) {
        newPosition = prevLineBreak;
      } else {
        newPosition = 0;
      }
      input.setSelectionRange(newPosition, newPosition);
    }
  };

  const handleKeyUp = (e) => {
    const key = document.querySelector(`[data-code="${e.code}"]`);
    if (!key) return;
    key.classList.remove('keyboard__key--pressed');
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      toggleShift();
    }
  };

  const handleKeyClick = (e) => {
    lastEvent = e.type;
    if (e.target.classList.contains('keyboard__key')) {
      e.target.classList.toggle('keyboard__key--pressed');
    }
    if (e.target.dataset.code === 'CapsLock') {
      e.target.classList.toggle('keyboard__key--toggled-on');
      toggleCaps();
    }
    if (['ShiftLeft', 'ShiftRight'].includes(e.target.dataset.code)) {
      toggleShift();
    }
    if (['AltLeft', 'AltRight'].includes(e.target.dataset.code)) {
      isAltOn = !isAltOn;
    }
    if (isShiftOn && isAltOn) {
      toggleLanguage();
      isShiftOn = false;
      isAltOn = false;
      document.querySelectorAll('.keyboard__key--pressed')
        .forEach((key) => key.classList.remove('keyboard__key--pressed'));
      toggleLetterCapitalization();
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

    wrapper.append(textarea);
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
          keyEl.classList.add('keyboard__key--dark');
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

    addKeyLetters(keyboard);
    keyboard.addEventListener('click', handleKeyClick);
    keyboard.addEventListener('transitionend', handleTransitionEnd);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return wrapper;
  };

  return {
    create,
  };
};

export default Keyboard;
