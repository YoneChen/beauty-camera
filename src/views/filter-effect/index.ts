/* eslint-disable @typescript-eslint/no-unused-vars */
import { createGLWrap, videoDimensions } from '@/common/utils';
import CameraVideo from '@/core/camera-video';

import GLView from './gl-view';

async function main() {
  const rootDom = document.getElementById('app');
  try {
    const video = await CameraVideo(rootDom);
    const [width, height] = videoDimensions(video);
    const glWrap = createGLWrap(width, height);
    rootDom.appendChild(glWrap);
    const view = new GLView(glWrap, video);
  } catch (error) {
    alert(error);
  }
}
main();
