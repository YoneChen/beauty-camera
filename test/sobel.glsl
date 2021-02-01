
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture_0;

float lookup(vec2 uv, vec2 offset, float dx, float dy)
{

    vec4 c = texture2D(u_texture_0, uv + vec2(dx, dy) * offset * 2.);

	// return as luma
    return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
}
float sobel(vec2 uv, vec2 offset) {

	// simple sobel edge detection
    float gx = 0.0;
    gx += -1.0 * lookup(uv, offset, -1.0, -1.0);
    gx += -2.0 * lookup(uv, offset, -1.0,  0.0);
    gx += -1.0 * lookup(uv, offset, -1.0,  1.0);
    gx +=  1.0 * lookup(uv, offset,  1.0, -1.0);
    gx +=  2.0 * lookup(uv, offset,  1.0,  0.0);
    gx +=  1.0 * lookup(uv, offset,  1.0,  1.0);

    float gy = 0.0;
    gy += -1.0 * lookup(uv, offset, -1.0, -1.0);
    gy += -2.0 * lookup(uv, offset,  0.0, -1.0);
    gy += -1.0 * lookup(uv, offset,  1.0, -1.0);
    gy +=  1.0 * lookup(uv, offset, -1.0,  1.0);
    gy +=  2.0 * lookup(uv, offset,  0.0,  1.0);
    gy +=  1.0 * lookup(uv, offset,  1.0,  1.0);
    float g = gx * gx + gy * gy;
    // float g = abs(gx) + abs(gy);
    return g;
}
void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 offset = 1. / u_resolution.xy;

    vec3 color = vec3(sobel(uv, offset));

    gl_FragColor = vec4(color, 1.);
}
