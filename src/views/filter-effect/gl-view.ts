import Base from '@/core/base';
import {
  VideoTexture,
} from 'three';

import fragmentShader from '@/components/filter/effect/offest.fs';

import Filter from '@/components/filter';

class GLView extends Base {
  filter: Filter;

  constructor(dom:HTMLElement, public video: HTMLVideoElement) {
    super(dom);
    const texture = new VideoTexture(video);
    this.filter = new Filter({
      width: dom.clientWidth,
      height: dom.clientHeight,
      fragmentShader,
      texture,
    });
    this.scene.add(this.filter);
  }

  update(delta: number) {
    this.filter.update(delta);
  }
}
export default GLView;
