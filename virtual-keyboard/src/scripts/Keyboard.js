import codes from './codes';

const Keyboard = () => {
  const isShiftOn = false;
  const isCapsOn = false;

  const addKeyAnimation = (e) => {
    e.preventDefault();
    const key = document.querySelector(`[data-code="${e.code}"]`);
    key.classList.add('keyboard__key--pressed');
  };

  const removeKeyAnimation = (e) => {
    const key = document.querySelector(`[data-code="${e.code}"]`)
    key.classList.remove('keyboard__key--pressed');
  };

  const create = () => {
    const wrapper = document.createElement('div');
    const keyboard = document.createElement('div');

    window.addEventListener('keydown', addKeyAnimation);
    window.addEventListener('keyup', removeKeyAnimation);

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

        if (['Backspace', 'Tab', 'Enter', 'ShiftLeft', 'Space'].includes(key.code)) {
          keyEl.classList.add('keyboard__key--grow-1');
        }

        rowEl.append(keyEl);
      });
    });

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
