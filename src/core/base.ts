/* eslint-disable class-methods-use-this */
import {
  Clock, OrthographicCamera, Scene, WebGLRenderer, AudioListener,
} from 'three';

class Base {
  scene = new Scene();

  listener = new AudioListener();

  renderer = new WebGLRenderer({ alpha: true });

  clock = new Clock();

  camera: OrthographicCamera;

  constructor(dom: HTMLElement) {
    const {
      renderer, scene, clock, listener,
    } = this;
    this.camera = new OrthographicCamera(dom.clientWidth / -2,
      dom.clientWidth / 2,
      dom.clientHeight / 2, dom.clientHeight / -2, -500, 1000);
    // this.camera = new PerspectiveCamera(75, dom.clientWidth / dom.clientHeight, 0.1, 1000);
    renderer.setSize(dom.clientWidth, dom.clientHeight);
    this.camera.add(listener);
    dom.appendChild(renderer.domElement);
    const animate = () => {
      requestAnimationFrame(animate);
      this.update(clock.getDelta());
      renderer.render(scene, this.camera);
    };
    requestAnimationFrame(animate);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(delta: number) {}
}
export default Base;
