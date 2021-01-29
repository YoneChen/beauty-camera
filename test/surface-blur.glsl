#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture_0;

vec3 surfaceBlur(in sampler2D tex, in vec2 uv, in vec2 offset){
    const float Y = 78.0;
    const float r = 8.;
    // rgb Separate calculation
    vec3 center_c = texture2D(tex, uv).rgb;
    vec3 sum_c = vec3(0.0);
    for(int i = 0; i < 3; i++){
    	float sum_i = 0.0;
        float norm = 0.0;
        for(float x = -r; x <= r; x++){

           	for(float y = -r; y <= r; y++){
               	vec2 uv2 = uv + vec2(x * offset.x, y * offset.y);
               	vec3 cur_c = texture2D(tex, uv2).rgb;

                float para = 1.0 - abs(center_c[i] - cur_c[i]) * 255.0 / (2.5 * Y);
				sum_i += para * cur_c[i] * 255.0;
                norm += para;
           	}
        }
        sum_c[i] = sum_i / norm;
    }

	return sum_c / 255.0;
}

void main() {

    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 offest = 1. / u_resolution.xy;
    vec3 color = surfaceBlur(u_texture_0,uv,offest);
    gl_FragColor = vec4(color, 1.);
}
