const CameraVideo = async (dom: HTMLElement) => {
  const video = document.createElement('video');
  video.setAttribute('playsinline', 'true');
  video.style.transform = 'scaleX(-1)';
  dom.appendChild(video);

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'user',
    },
  });

  video.srcObject = stream;
  return new Promise<HTMLVideoElement>((resolve) => {
    video.onloadedmetadata = () => {
      video.play();
      resolve(video);
    };
  });
};
export default CameraVideo;
