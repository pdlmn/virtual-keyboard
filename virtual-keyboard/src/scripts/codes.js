const codes = [
  [
    { code: 'Backquote', en: ['`', '~'], ru: ['ё'] },
    { code: 'Digit1', en: [1, '!'] },
    { code: 'Digit2', en: [2, '@'], ru: [2, '"'] },
    { code: 'Digit3', en: [3, '#'], ru: [3, '№'] },
    { code: 'Digit4', en: [4, '$'], ru: [4, ';'] },
    { code: 'Digit5', en: [5, '%'] },
    { code: 'Digit6', en: [6, '^'], ru: [6, ':'] },
    { code: 'Digit7', en: [7, '&'], ru: [7, '?'] },
    { code: 'Digit8', en: [8, '*'] },
    { code: 'Digit9', en: [9, '('] },
    { code: 'Digit0', en: [0, ')'] },
    { code: 'Minus', en: ['-', '_'] },
    { code: 'Equal', en: ['=', '+'] },
    { code: 'Backspace', name: 'Backspace' },
  ],
  [
    { code: 'Tab', name: 'Tab' },
    { code: 'KeyQ', en: ['q'], ru: ['й'] },
    { code: 'KeyW', en: ['w'], ru: ['ц'] },
    { code: 'KeyE', en: ['e'], ru: ['у'] },
    { code: 'KeyR', en: ['r'], ru: ['к'] },
    { code: 'KeyT', en: ['t'], ru: ['е'] },
    { code: 'KeyY', en: ['y'], ru: ['н'] },
    { code: 'KeyU', en: ['u'], ru: ['г'] },
    { code: 'KeyI', en: ['i'], ru: ['ш'] },
    { code: 'KeyO', en: ['o'], ru: ['щ'] },
    { code: 'KeyP', en: ['p'], ru: ['з'] },
    { code: 'BracketLeft', en: ['[', '{'], ru: ['х'] },
    { code: 'BracketRight', en: [']', '}'], ru: ['ъ'] },
    { code: 'Backslash', en: ['\\', '|'], ru: ['\\', '/'] },
    { code: 'Delete', name: 'Del' },
  ],
  [
    { code: 'CapsLock', name: 'Caps Lock' },
    { code: 'KeyA', en: ['a'], ru: ['ф'] },
    { code: 'KeyS', en: ['s'], ru: ['ы'] },
    { code: 'KeyD', en: ['d'], ru: ['в'] },
    { code: 'KeyF', en: ['f'], ru: ['а'] },
    { code: 'KeyG', en: ['g'], ru: ['п'] },
    { code: 'KeyH', en: ['h'], ru: ['р'] },
    { code: 'KeyJ', en: ['j'], ru: ['о'] },
    { code: 'KeyK', en: ['k'], ru: ['л'] },
    { code: 'KeyL', en: ['l'], ru: ['д'] },
    { code: 'Semicolon', en: [';', ':'], ru: ['ж'] },
    { code: 'Quote', en: ["'", '"'], ru: ['э'] },
    { code: 'Enter', name: 'Enter' },
  ],
  [
    { code: 'ShiftLeft', name: 'Shift' },
    { code: 'KeyZ', en: ['z'], ru: ['я'] },
    { code: 'KeyX', en: ['x'], ru: ['ч'] },
    { code: 'KeyC', en: ['c'], ru: ['с'] },
    { code: 'KeyV', en: ['v'], ru: ['м'] },
    { code: 'KeyB', en: ['b'], ru: ['и'] },
    { code: 'KeyN', en: ['n'], ru: ['т'] },
    { code: 'KeyM', en: ['m'], ru: ['ь'] },
    { code: 'Comma', en: [',', '<'], ru: ['б'] },
    { code: 'Period', en: ['.', '>'], ru: ['ю'] },
    { code: 'Slash', en: ['/', '?'], ru: ['.', ','] },
    { code: 'ArrowUp', name: '^' },
    { code: 'ShiftRight', name: 'Shift' },
  ],

  [
    { code: 'ControlLeft', name: 'Ctrl' },
    { code: 'MetaLeft', name: 'Win' },
    { code: 'AltLeft', name: 'Alt' },
    { code: 'Space', name: 'SPACEBAR' },
    { code: 'AltRight', name: 'Alt' },
    { code: 'ControlRight', name: 'Ctrl' },
    { code: 'ArrowLeft', name: '<' },
    { code: 'ArrowDown', name: '˅' },
    { code: 'ArrowRight', name: '>' },
  ],
];

export default codes;
