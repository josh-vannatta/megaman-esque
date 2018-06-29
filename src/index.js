require('bootstrap');
import _ from 'lodash';

import SimpleGame from './game/app.ts';

window.onload = () => {
  const game = new SimpleGame({
    width: 800,
    height: 600,
    parent: document.getElementById('app'),
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false,
      }
    }
  });
}
