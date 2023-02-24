import {
  _decorator,
  Component,
  Node,
  NodePool,
  Prefab,
  instantiate,
  UITransform,
  randomRangeInt,
  Vec3,
  Layout,
  Sprite,
  randomRange,
  Label,
  game,
} from "cc";
const { ccclass, property } = _decorator;

var FinalScore: number;
@ccclass("allhurdels")
export class allhurdels extends Component {
  @property({ type: Prefab })
  hurdles: Prefab = null;
  @property({ type: Node })
  gameover: Node = null;
  nodepool = new NodePool();
  count: number = 0;
  score: number = 0;
  pseudoscore: number = 0;
  check: boolean = false;
  start() {
    this.schedule(this.addhurdel, randomRange(3, 5));
  }
  addhurdel() {
    if (this.nodepool.size()) {
      let canvasWidth =
        this.node.parent.getComponent(UITransform).contentSize.width;
      let newNode = this.nodepool.get();
      newNode.setPosition(
        new Vec3(
          this.node.getComponent(UITransform).width + 390,
          20 * randomRangeInt(-10, 6),
          0
        )
      );
      newNode.getChildByName("hurdel-03").active = true;
      this.node.addChild(newNode);
    }
  }

  onLoad() {
    for (let i = 0; i < 5; i++) {
      let hurdl = instantiate(this.hurdles);
      hurdl.name = "hurdels";
      this.nodepool.put(hurdl);
    }
    this.gameover.active = false;
  }

  update(deltaTime: number) {
    if (this.count == 0) {
      this.node.children.forEach((a) => {
        if (a.name == "hurdels") {
          let newposition = a.getPosition();
          let hurdelboundingbox_0 = a
            .getChildByName("hurdel-01")
            .getComponent(UITransform)
            .getBoundingBoxToWorld();
          let birdboundingbox = this.node.parent
            .getChildByName("Sprite")
            .getComponent(UITransform)
            .getBoundingBoxToWorld();
          let hurdelboundingbox_1 = a
            .getChildByName("hurdel-02")
            .getComponent(UITransform)
            .getBoundingBoxToWorld();
          let hurdelboundingbox_2 = a
            .getChildByName("hurdel-03")
            .getComponent(UITransform)
            .getBoundingBoxToWorld();
          if (
            birdboundingbox.intersects(hurdelboundingbox_0) ||
            birdboundingbox.intersects(hurdelboundingbox_1)
          ) {
            this.count = 1;
            this.gameover.active = true;
            console.log("gameover");
            game.pause();
            this.node.parent.getChildByName("hud").active = false;
            this.node.parent
              .getChildByName("finalhud")
              .getComponent(Label).string = "Final Score:" + String(this.score);
          } else if (
            birdboundingbox.intersects(hurdelboundingbox_2) &&
            a.getChildByName("hurdel-03").active
          ) {
            console.log("Intersect");

            a.getChildByName("hurdel-03").active = false;
            this.pseudoscore++;
            this.check = true;
          }
          console.log(this.score);
          newposition.x = newposition.x - 1;
          if (this.check) {
            this.score = Math.ceil(this.pseudoscore);
            Math.ceil(this.score);
            this.check = false;
          }
          a.setPosition(newposition);
          if (
            a.getPosition().x <=
            -1 * this.node.parent.getComponent(UITransform).width +
              this.node.getComponent(UITransform).width * 1.4
          ) {
            this.nodepool.put(a);
          }
        }
      });
    }

    this.node.parent.getChildByName("hud").getComponent(Label).string = String(
      this.score
    );
    FinalScore = this.score;
  }
}
export default function getfinalscore() {
  return FinalScore;
}
