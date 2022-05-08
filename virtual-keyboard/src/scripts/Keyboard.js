import codes from './codes';

const Keyboard = () => {
  const isShiftOn = false;
  let isCapsOn = false;
  const currentLanguage = 'en';

  const handleKeyDown = (e) => {
    e.preventDefault();
    const key = document.querySelector(`[data-code="${e.code}"]`);
    key.classList.add('keyboard__key--pressed');

    if (key.dataset.code === 'CapsLock') {
      key.classList.toggle('keyboard__key--toggled-on');
      isCapsOn = !isCapsOn;
    }
  };

  const handleKeyUp = (e) => {
    const key = document.querySelector(`[data-code="${e.code}"]`);
    key.classList.remove('keyboard__key--pressed');
  };

  const handleKeyClick = (e) => {
    if (e.target.classList.contains('keyboard__key')) {
      e.target.classList.add('keyboard__key--pressed');
    }
    if (e.target.dataset.code === 'CapsLock') {
      e.target.classList.toggle('keyboard__key--toggled-on');
      isCapsOn = !isCapsOn;
    }
  };

  const handleTransitionEnd = (e) => {
    e.target.classList.remove('keyboard__key--pressed');
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
