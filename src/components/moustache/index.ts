import { getImageTexture } from '@/common/utils';
import {
  Mesh, MeshBasicMaterial, Object3D, PlaneBufferGeometry,
} from 'three';
import moustachePath from '@/assets/img/moustache.png';

class Moustache extends Object3D {
  constructor(public size: number = 100) {
    super();
    this.init(size);
  }

  private async init(size: number) {
    const geometry = new PlaneBufferGeometry(size, size * 0.724);
    const texture = await getImageTexture(moustachePath);

    const material = new MeshBasicMaterial({

      map: texture,

    });
    material.transparent = true;
    material.opacity = 0.7;
    const mesh = new Mesh(geometry, material);
    this.add(mesh);
  }
}
export default Moustache;
