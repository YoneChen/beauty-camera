precision highp float;
uniform float time;
uniform sampler2D uTexture;
uniform vec2 uResolution;
varying vec2 vUv;

float lookup(vec2 uv, vec2 offset, float dx, float dy, float d)
{
    vec4 c = texture2D(uTexture, uv + vec2(dx * 2., dy * 2.) * offset);

	// return as luma
    return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
}
float bound(float time) {
  return fract(time * .3) * 2.;
}
float mask(vec2 uv, float offset, float time) {
  float x = bound(time);
  if (uv.x > x) return 0.;
  else if(uv.x < x && uv.x > x - .4) return 1.;
  else return smoothstep(x - 1., x - .4, uv.x);
}
float scan(vec2 uv, float offset, float time) {
  float x = bound(time);
  return smoothstep(x - offset * 10., x, uv.x) - smoothstep(x, x + offset * 10., uv.x);
}
float sobel(vec2 uv, vec2 offset, float d) {

	// simple sobel edge detection
    float gx = 0.0;
    gx += -1.0 * lookup(uv, offset, -1.0, -1.0, d);
    gx += -2.0 * lookup(uv, offset, -1.0,  0.0, d);
    gx += -1.0 * lookup(uv, offset, -1.0,  1.0, d);
    gx +=  1.0 * lookup(uv, offset,  1.0, -1.0, d);
    gx +=  2.0 * lookup(uv, offset,  1.0,  0.0, d);
    gx +=  1.0 * lookup(uv, offset,  1.0,  1.0, d);

    float gy = 0.0;
    gy += -1.0 * lookup(uv, offset, -1.0, -1.0, d);
    gy += -2.0 * lookup(uv, offset,  0.0, -1.0, d);
    gy += -1.0 * lookup(uv, offset,  1.0, -1.0, d);
    gy +=  1.0 * lookup(uv, offset, -1.0,  1.0, d);
    gy +=  2.0 * lookup(uv, offset,  0.0,  1.0, d);
    gy +=  1.0 * lookup(uv, offset,  1.0,  1.0, d);
    float g = gx * gx + gy * gy;
    // float g = abs(gx) + abs(gy);
    return g;
}
void main()
{
    vec2 uv = vec2(1.0 - vUv.x, vUv.y);
    vec2 offset = 1. / uResolution.xy;
    float d = sin(time * 5.0)*0.5 + 1.5; // kernel offset
    float g = sobel(uv, offset, d);
    float m = mask(uv, offset.x, time);
    float s = scan(uv, offset.x, time);
    vec4 col = texture2D(uTexture, uv);
    float edge = clamp(s + m * g,0.,1.);

    gl_FragColor = mix(col,vec4(vec3(0.,1.,1.),edge),edge);
}
