import './sass/main.scss';
import Keyboard from './scripts/Keyboard';
import Textarea from './scripts/Textarea';
import Tip from './scripts/Tip';

const keyboard = Keyboard(Textarea());
const keyboardEl = keyboard.create();
const tip = Tip();
document.body.append(keyboardEl);
document.body.append(tip);
