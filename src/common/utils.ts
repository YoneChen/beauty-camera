import {
  Object3D, Quaternion, Texture, TextureLoader, Vector3,
} from 'three';

function createGLWrap(width: number, height: number) {
  const glWrap = document.createElement('div');
  glWrap.style.position = 'absolute';
  glWrap.style.left = '50%'; glWrap.style.top = '50%';
  glWrap.style.transform = 'translateY(-50%) translateX(-50%)';
  glWrap.style.width = `${width}px`;
  glWrap.style.height = `${height}px`;
  return glWrap;
}
function videoDimensions(video: HTMLVideoElement) {
  // Ratio of the video's intrisic dimensions
  const videoRatio = video.videoWidth / video.videoHeight;
  // The width and height of the video element
  let width = video.offsetWidth; let
    height = video.offsetHeight;
  // The ratio of the element's width to its height
  const elementRatio = width / height;
  // If the video element is short and wide
  if (elementRatio > videoRatio) {
    width = height * videoRatio;
  // It must be tall and thin, or exactly equal to the original ratio
  } else height = width / videoRatio;
  return [
    width,
    height,
  ];
}
const getImageTexture: (url: string) => Promise<Texture> = async (url) => {
  const loader = new TextureLoader();
  return new Promise((resolve, reject) => {
    loader.load(
    // resource URL
      url,

      // onLoad callback
      (texture) => {
        resolve(texture);
      },

      // onProgress callback currently not supported
      undefined,

      // onError callback
      (err) => {
        reject(err);
      },
    );
  });
};

const applyRotationFromPlaneVectors = (object3D: Object3D, points: [number, number, number][]) => {
  const quaternion = new Quaternion(); // create one and reuse it

  object3D.position.set(...points[0]);

  const v1 = new Vector3(...points[1]
    .map((v, i) => v - points[0][i]))
    .normalize();
  const v2 = new Vector3(...points[2]
    .map((v, i) => v - points[0][i]))
    .normalize();
  const normal = v2.cross(v1);

  quaternion.setFromUnitVectors(normal, new Vector3(0, 0, 1));
  object3D.setRotationFromQuaternion(quaternion);
};

export {
  createGLWrap,
  videoDimensions,
  getImageTexture,
  applyRotationFromPlaneVectors,
};
