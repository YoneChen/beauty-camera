/* eslint-disable no-param-reassign */
import Base from '@/core/base';
import Flush from '@/components/blush';
import {
  Float32BufferAttribute,
  Points,
  BufferGeometry,
  PointsMaterial,
  Vector2,
} from 'three';
import Moustache from '@/components/moustache';
import { applyRotationFromPlaneVectors } from '@/common/utils';

const getFaceRotateZAngle = (points: [number, number, number][]) => {
  if (!points.length) return 0;
  const vector = points[10].slice(0, 2).map((v, i) => v - points[152][i]);
  const v = new Vector2(...vector)
    .normalize();
  return (v.x > 0 ? -1 : 1) * Math.abs(Math.acos(v.dot(new Vector2(0, 1))));
};

const BLUSH_INDEXES = [[205, 101, 50], [425, 280, 330]];

const MOUSTACHE_INDEX = [0, 393, 167];

class GLView extends Base {
  dots: Points;

  blushes: Flush[] = [];

  moustache: Moustache;

  onUpdate: () => Promise<[number, number, number][]>;

  constructor(dom: HTMLElement) {
    super(dom);
    this.initMoustache();
    this.initFlushes();
  }

  async update(delta: number) {
    const points = await this.onUpdate();
    // this.updatePoints(delta, points);
    const angle = getFaceRotateZAngle(points);
    this.updateMoustachePos(delta, points, angle);
    this.updateFlashPos(delta, points);
  }

  private updateMoustachePos(delta: number, points: [number, number, number][], angle: number) {
    const { moustache } = this;
    const isDetected = !!points.length;
    moustache.visible = isDetected;
    if (!isDetected) return;
    const [i, j, k] = MOUSTACHE_INDEX;
    applyRotationFromPlaneVectors(moustache, [
      points[i],
      points[j],
      points[k],
    ]);
    moustache.rotation.z = angle;
  }

  private updateFlashPos(delta: number, points: [number, number, number][]) {
    const { blushes } = this;
    const isDetected = !!points.length;
    blushes.forEach((blush) => { blush.visible = isDetected; });
    if (!isDetected) return;
    blushes.forEach((blush, idx) => {
      blush.update(delta);
      const [i, j, k] = BLUSH_INDEXES[idx];
      applyRotationFromPlaneVectors(blush, [
        points[i],
        points[j],
        points[k],
      ]);
    });
  }

  private updatePoints(delta: number, points: [number, number, number][]) {
    const { scene } = this;
    if (this.dots) {
      scene.remove(this.dots);
    }

    if (!points.length) return;
    const geometry = new BufferGeometry();

    geometry.setAttribute('position', new Float32BufferAttribute([points[50], points[101], points[205]].flat(), 3));

    const material = new PointsMaterial({ color: 0x00ddaa, sizeAttenuation: false, side: 2 });
    this.dots = new Points(geometry, material);
    scene.add(this.dots);
  }

  private initMoustache() {
    this.moustache = new Moustache();
    this.moustache.visible = false;
    this.scene.add(this.moustache);
  }

  private initFlushes() {
    this.blushes = [new Flush(), new Flush()];
    this.blushes.forEach((blush) => {
      blush.visible = false;
      this.scene.add(blush);
    });
  }
}
export default GLView;
