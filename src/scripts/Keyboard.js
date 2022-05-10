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

  const insert = (str, i = 0, substr = '') => str.slice(0, i) + substr + str.slice(i);

  const deleteAt = (str, i = 0) => str.slice(0, i) + str.slice(i + 1);

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

  const inputSymbol = (symbol) => {
    const currPosition = input.selectionStart;
    input.value = insert(input.value, currPosition, symbol);
    // otherwise text-cursor will return  to the end
    input.setSelectionRange(currPosition + 1, currPosition + 1);
  };

  const operations = {
    CapsLock: (key) => {
      key.classList.toggle('keyboard__key--toggled-on');
      toggleCaps();
    },
    Backspace: () => {
      const currPosition = input.selectionStart;
      if (currPosition === 0) return;

      input.value = deleteAt(input.value, currPosition - 1);
      let newPosition;
      if (currPosition - 1 <= 0) {
        newPosition = 0;
      } else {
        newPosition = currPosition - 1;
      }
      input.setSelectionRange(newPosition, newPosition);
    },
    Delete: () => {
      const currPosition = input.selectionStart;
      input.value = deleteAt(input.value, currPosition);
      input.setSelectionRange(currPosition, currPosition);
    },
    ArrowLeft: () => {
      const newPosition = input.selectionStart - 1;
      if (newPosition >= 0) input.setSelectionRange(newPosition, newPosition);
    },
    ArrowRight: () => {
      const newPosition = input.selectionStart + 1;
      input.setSelectionRange(newPosition, newPosition);
    },
    ArrowDown: () => {
      const nextLineBreak = input.value.indexOf('\n', input.selectionStart);
      let newPosition;
      // if no next lines
      if (nextLineBreak + 1 === 0) {
        newPosition = input.value.length;
      } else {
        newPosition = nextLineBreak + 1;
      }
      input.setSelectionRange(newPosition, newPosition);
    },
    ArrowUp: () => {
      const prevLineBreak = input.value.lastIndexOf('\n', input.selectionStart - 1);
      let newPosition;
      if (prevLineBreak >= 0) {
        newPosition = prevLineBreak;
      } else {
        newPosition = 0;
      }
      input.setSelectionRange(newPosition, newPosition);
    },
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    lastEvent = e.type;
    const key = document.querySelector(`[data-code="${e.code}"]`);
    if (!key) return;
    key.classList.add('keyboard__key--pressed');
    input.focus();

    if (operations[e.code]) {
      operations[e.code](key);
    }
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      if (isShiftOn) isShiftOn = false;
      toggleShift();
    }
    if (e.altKey && e.shiftKey) {
      toggleLanguage();
    }
    if (isForInput(e.code)) {
      inputSymbol(key.textContent);
    }
    if (e.code === 'Space') {
      inputSymbol(' ');
    }
    if (e.code === 'Enter') {
      inputSymbol('\n');
    }
    if (e.code === 'Tab') {
      inputSymbol('\t');
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
    const key = e.target;
    if (!key.dataset.code) return;
    lastEvent = e.type;
    input.focus();
    if (key.classList.contains('keyboard__key')) {
      key.classList.toggle('keyboard__key--pressed');
    }
    if (operations[key.dataset.code]) {
      operations[key.dataset.code](key);
    }
    if (['ShiftLeft', 'ShiftRight'].includes(key.dataset.code)) {
      toggleShift();
    }
    if (['AltLeft', 'AltRight'].includes(key.dataset.code)) {
      isAltOn = !isAltOn;
    }
    if (isShiftOn && isAltOn) {
      toggleLanguage();
      isShiftOn = false;
      isAltOn = false;
      document.querySelectorAll('.keyboard__key--pressed')
        .forEach((keyEl) => keyEl.classList.remove('keyboard__key--pressed'));
      toggleLetterCapitalization();
    }
    if (isForInput(key.dataset.code)) {
      inputSymbol(key.textContent);
    }
    if (key.dataset.code === 'Space') {
      inputSymbol(' ');
    }
    if (key.dataset.code === 'Enter') {
      inputSymbol('\n');
    }
    if (key.dataset.code === 'Tab') {
      inputSymbol('\t');
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
