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
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    float texelOffset = 1. / 500.0;
    vec3 minValue= vec3(0.);
    for(int i = 0; i < coreSize; i++) {
      for(int j = 0; j < coreSize; j++) {
        vec3 currentAlpha = texture2D(u_texture_0,uv+vec2(float(-halfSize+i)*texelOffset,float(-halfSize+j)*texelOffset)).xyz;
        minValue = max(minValue,currentAlpha);
      }
    }
    vec3 color = vec3(
        texture2D(u_texture_0, uv, 0.0)
    );

    gl_FragColor = vec4(minValue, 1.);
}
