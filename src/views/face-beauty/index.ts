import { createGLWrap, videoDimensions } from '@/common/utils';
/* eslint-disable no-param-reassign */

import FaceDetector from '@/detector/face';
import GLView from './gl-view';

type Pose = {
  boundingBox: {
    topLeft: [number, number];
    bottomRight: [number, number];
  };
  scaledMesh: [[number, number, number]];
  annotations: {
    [key: string]: [[number, number, number]];
  };
};
async function main() {
  const rootDom = document.getElementById('app');
  try {
    const [video, model] = await FaceDetector(rootDom);
    const [width, height] = videoDimensions(video);
    const glWrap = createGLWrap(width, height);
    rootDom.appendChild(glWrap);
    const view = new GLView(glWrap, video);
    view.onUpdate = async () => {
      const [face]: Pose[] = await model.estimateFaces({ input: video });
      if (!face) return {};
      return face.annotations;
    };
  } catch (error) {
    alert(error);
  }

  // guiInit(view.gui, view.fire, view.fire.fireConfig);
}
main();
