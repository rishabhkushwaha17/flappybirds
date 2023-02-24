import { _decorator, Component, Node, Sprite, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("birdmovement")
export class birdmovement extends Component {
  @property(Sprite)
  bg: Sprite[] = [null, null];
  start() { }

  update(deltaTime: number) {
    for (let index = 0; index < this.bg.length; index++) {
      let a = this.bg[index].node.getPosition();
      a.x -= 1;
      this.bg[index].node.setPosition(a);
      if (a.x <= -this.bg[0].getComponent(UITransform).width) {
        a.x = this.bg[index].getComponent(UITransform).width;
        this.bg[index].node.setPosition(a);
      }
    }
  }
}
