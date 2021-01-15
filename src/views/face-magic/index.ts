import { createGLWrap, videoDimensions } from '@/common/utils';
/* eslint-disable no-param-reassign */

import FaceDetector from '@/detector/face';
import GLView from './gl-view';

function getPos(pos: number[], canvas: number[]): [number, number, number] {
  return [
    canvas[0] / 2 - pos[0],
    canvas[1] / 2 - pos[1],
    pos[2],
  ];
}
type Pose = {
  boundingBox: {
    topLeft: [number, number];
    bottomRight: [number, number];
  };
  scaledMesh: [[number, number, number]];
  annotations: any;
};
async function main() {
  const rootDom = document.getElementById('app');
  try {
    const [video, model] = await FaceDetector(rootDom);
    const [width, height] = videoDimensions(video);
    const glWrap = createGLWrap(width, height);
    rootDom.appendChild(glWrap);
    const view = new GLView(glWrap);
    view.onUpdate = async () => {
      const [face]: Pose[] = await model.estimateFaces({ input: video });
      if (!face) return [];
      // console.log(face.annotations);
      return face.scaledMesh.map((points) => getPos(points, [width, height]));
    };
  } catch (error) {
    alert(error);
  }

  // guiInit(view.gui, view.fire, view.fire.fireConfig);
}
main();
