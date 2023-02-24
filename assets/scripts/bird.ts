import {
  _decorator,
  Component,
  Node,
  Input,
  Sprite,
  UITransform,
  game,
  Label,
} from "cc";

const { ccclass, property } = _decorator;
import getfinalscore from "./allhurdels";

@ccclass("bird")
export class bird extends Component {
  @property({ type: Sprite })
  bird: Sprite = null;
  @property({ type: Node })
  bgGround: Node = null;
  @property({ type: Node })
  gameover: Node = null;
  count: number = 0;
  onLoad() {
    this.node.on(
      Input.EventType.TOUCH_START,
      () => {
        this.schedule(this.move, 0.02);
      },
      this
    );
    this.node.on(
      Input.EventType.TOUCH_END,
      () => {
        this.unschedule(this.move);
        this.count = 0;
        this.bird.node.angle = 0;
      },
      this
    );
  }
  move() {
    this.count = 1;
    let a = this.bird.node.getPosition();
    a.y = a.y + 10;
    this.bird.node.angle = 10;
    this.bird.node.setPosition(a);
  }
  start() {}

  update(deltaTime: number) {
    if (this.count == 0) {
      let a = this.bird.node.getPosition();
      if (
        this.bird.node.getPosition().y >=
        -1 * this.bgGround.getComponent(UITransform).height * 3
      ) {
        a.y = a.y - 2;
        this.bird.node.angle = -10;
      }
      console.log(-1 * this.bgGround.getComponent(UITransform).height * 3);
      console.log(this.bird.node.getPosition().y);

      this.bird.node.setPosition(a);
      if (
        this.bird
          .getComponent(UITransform)
          .getBoundingBoxToWorld()
          .intersects(
            this.bgGround.children[0]
              .getComponent(UITransform)
              .getBoundingBoxToWorld() ||
              this.bgGround.children[1]
                .getComponent(UITransform)
                .getBoundingBoxToWorld()
          )
      ) {
        this.gameover.active = true;
        game.pause();
        this.node.getChildByName("hud").active = false;
        let score = getfinalscore();
        console.log(score);
        this.node.getChildByName("finalhud").getComponent(Label).string =
          "Finalscore:" + score;
      }
    }
  }
}
