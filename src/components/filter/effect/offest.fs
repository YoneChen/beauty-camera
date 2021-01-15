precision highp float;
uniform float time;
uniform sampler2D uTexture;
varying vec2 vUv;

// 随机方法
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}
// 范围随机
float randomRange (vec2 standard ,float min, float max) {
    return min + random(standard) * (max - min);
}
void main () {
    vec2 vUv = vec2(1.0 - vUv.x, vUv.y);
    // 原图
    vec3 color = texture2D(uTexture, vUv).rgb;
    // 时间计算
    float cTime = floor(time * 5.0);
    // 切割图片的最大位移值
    float maxSplitOffset = 0.02;
    // 这里我们选择切割5次
    for (float i = 0.0; i < 5.0; i += 1.0) {
      // 切割纵向坐标
      float sliceY = random(vec2(cTime, 100.0 + i));
      // 切割高度
      float sliceH = random(vec2(cTime, i)) * 0.25;
      // 计算随机横向偏移值
      float hOffset = randomRange(vec2(cTime, i), -maxSplitOffset, maxSplitOffset);
      // 计算最终坐标
      vec2 splitOff = vUv; splitOff.x += hOffset; splitOff = fract(splitOff);
      // 片段如果在切割区间，就偏移区内图像
      if (vUv.y > sliceY && vUv.y < fract(sliceY+sliceH)) {
        color = texture2D(uTexture, splitOff).rgb;
      }
    }
    // 以通道r举例
    color.r = texture2D(uTexture, vUv - vec2(0.02 * abs(sin(time * 5.0)),0)).r;
    gl_FragColor = vec4(color, 1.0);
}
