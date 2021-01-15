import CameraVideo from '@/core/camera-video';
import '@tensorflow/tfjs-backend-webgl';

const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');

async function initModel() {
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
  );
  return model;
}

const FaceDetector:
(dom: HTMLElement) => Promise<[HTMLVideoElement, any]> = async (dom: HTMLElement) => {
  const model = await initModel();
  const video = await CameraVideo(dom);
  return [video, model];
};
export default FaceDetector;
