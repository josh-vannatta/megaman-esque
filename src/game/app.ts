import * as  Phaser from 'phaser';
import TestScene from './scene/TestScene';

export default class SimpleGame {
  constructor(private config: any, scene: Phaser.Scene) {
    this.config.type = Phaser.AUTO;
    this.config.scene = [ TestScene ];
    this.game = new Phaser.Game(this.config);
  }

  game: Phaser.Game;

}
