/* eslint-disable no-param-reassign */
import Filter from '@/components/filter';
import Base from '@/core/base';
import {
  Float32BufferAttribute,
  Points,
  BufferGeometry,
  PointsMaterial,
  VideoTexture,
} from 'three';

import fragmentShader from '@/components/filter/beauty/eye.fs';

const getPos = (points: [number, number, number][], [width, height] : [number, number]) => points
  .map(([x, y]) => [x / width, 1 - y / height]);

const getEyes = (eyes: [number, number, number][][], {
  clientWidth: width,
  clientHeight: height,
} : HTMLElement) => eyes
  .map((eye) => getPos(eye, [width, height]));

class GLView extends Base {
  dots: Points;

  onUpdate: () => Promise<any>;

  filter: Filter;

  constructor(public dom:HTMLElement, public video: HTMLVideoElement) {
    super(dom);
    const texture = new VideoTexture(video);
    this.filter = new Filter({
      width: dom.clientWidth,
      height: dom.clientHeight,
      fragmentShader,
      texture,
      uniforms: {
        uEye0: {
          value: [0.0, 0.0, 0.0],
        },
        uEye1: {
          value: [0.0, 0.0, 0.0],
        },
      },
    });
    this.scene.add(this.filter);
  }

  async update(delta: number) {
    const { leftEyeIris, rightEyeIris } = await this.onUpdate();
    if (!leftEyeIris || !rightEyeIris) return;
    // this.updatePoints(delta, points);
    this.filter.update(delta, (uniforms) => {
      const eyes = getEyes([leftEyeIris, rightEyeIris], this.dom);
      eyes.forEach((eye, i) => {
        const [[x0, y0], [x1, y1]] = eye;
        const r = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
        uniforms[`uEye${i}`].value = [x0, y0, r];
      });

      // console.log(eyePoint);
    });
  }

  private updatePoints(delta: number, points: [number, number, number][]) {
    const { scene } = this;
    if (this.dots) {
      scene.remove(this.dots);
    }

    if (!points.length) return;
    const geometry = new BufferGeometry();

    geometry.setAttribute('position', new Float32BufferAttribute(points.flat(), 3));

    const material = new PointsMaterial({ color: 0x00ddaa, sizeAttenuation: false, side: 2 });
    this.dots = new Points(geometry, material);
    scene.add(this.dots);
  }
}
export default GLView;
