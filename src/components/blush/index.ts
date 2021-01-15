import { getImageTexture } from '@/common/utils';
import {
  Mesh, MeshBasicMaterial, Object3D, PlaneBufferGeometry,
} from 'three';
import flushPath from '@/assets/img/flush.png';

class Blush extends Object3D {
  private mesh: Mesh<PlaneBufferGeometry, MeshBasicMaterial>;

  constructor(public size: number = 50) {
    super();
    this.init(size);
  }

  private async init(size: number) {
    const geometry = new PlaneBufferGeometry(size, size);
    const texture = await getImageTexture(flushPath);

    const material = new MeshBasicMaterial({

      map: texture,

    });
    material.transparent = true;
    material.opacity = 0.5;
    this.mesh = new Mesh(geometry, material);
    this.add(this.mesh);
  }

  update(delta: number) {
    this.mesh.rotation.z += delta * 2;
  }
}
export default Blush;
