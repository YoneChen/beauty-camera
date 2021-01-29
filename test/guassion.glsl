#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture_0;

float normpdf(in float x, in float sigma)
{
	return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;
}

vec3 guassionBlur(in sampler2D tex, in vec2 uv, in vec2 offset)
{

		//declare stuff
		const int mSize = 15;
		const int kSize = (mSize-1)/2;
		float kernel[mSize];
		vec3 final_colour = vec3(0.0);

		//create the 1-D kernel
		float sigma = 7.0;
		float Z = 0.0;
		for (int j = 0; j <= kSize; ++j)
		{
			kernel[kSize+j] = kernel[kSize-j] = normpdf(float(j), sigma);
		}

		//get the normalization factor (as the gaussian has been clamped)
		for (int j = 0; j < mSize; ++j)
		{
			Z += kernel[j];
		}

		//read out the texels
		for (int i=-kSize; i <= kSize; ++i)
		{
			for (int j=-kSize; j <= kSize; ++j)
			{
				final_colour += kernel[kSize+j]*kernel[kSize+i]*texture2D(tex, uv + offset *  vec2(float(i),float(j))).rgb;

			}
		}
    return final_colour/(Z*Z);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 offset = 1. / u_resolution.xy;
    vec3 color = guassionBlur(u_texture_0, uv, offset);
    gl_FragColor = vec4(color, 1.);
}
