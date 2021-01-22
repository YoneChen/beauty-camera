#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture_0;

// #define uv gl_FragCoord.xy/u_resolution.xy
#define coreSize 3
#define halfSize coreSize/2
void main() {
    float kernel[9];
    kernel[6] = 1.; kernel[7] = 2.; kernel[8] = 1.;
    kernel[3] = 2.; kernel[4] = 4.; kernel[5] = 2.;
    kernel[0] = 1.; kernel[1] = 2.; kernel[2] = 1.;

    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    float texelOffset = 1. / 500.0;
    vec3 color = vec3(0.);
    for(int i = 0; i < coreSize; i++) {
      for(int j = 0; j < coreSize; j++) {
        vec3 currentColor = texture2D(u_texture_0,uv+vec2(float(-halfSize+i)*texelOffset,float(-halfSize+j)*texelOffset)).xyz;
        color += currentColor * kernel[i * coreSize + j];
      }
    }
    color /= 16.;
    gl_FragColor = vec4(color, 1.);
}
