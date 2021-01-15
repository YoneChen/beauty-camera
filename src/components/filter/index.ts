import {
  Mesh, Object3D, PlaneGeometry, ShaderMaterial, Texture,
} from 'three';
import vertexShader from './filter.vs';

type FilterOptions = {
  width: number;
  height: number;
  fragmentShader: string;
  texture: Texture;
  uniforms?: { [key: string]: { value: any } }
};

class Filter extends Object3D {
  uniforms: {
    [key: string]: { value: any }
    uTexture: { value: Texture; };
    time: { value: number; };
  };

  constructor({
    width = 500, height = 500, fragmentShader, texture, uniforms = {},
  } : FilterOptions) {
    super();
    const geometry = new PlaneGeometry(width, height);
    this.uniforms = {
      uTexture: { value: texture },
      time: { value: 1.0 },
      ...uniforms,
    };
    const material = new ShaderMaterial({

      uniforms: this.uniforms,

      vertexShader,

      fragmentShader,

    });
    material.transparent = true;
    const cube = new Mesh(geometry, material);
    this.add(cube);
  }

  update(delta: number, callback: (uniforms: Filter['uniforms']) => void = () => {}) {
    this.uniforms.time.value += delta;
    callback(this.uniforms);
  }
}
export default Filter;
