import './sass/main.scss';
import Keyboard from './scripts/Keyboard';
import Textarea from './scripts/Textarea';

const keyboard = Keyboard(Textarea());
const keyboardEl = keyboard.create();
document.body.append(keyboardEl);
