#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uTexture;
uniform vec2 uResolution;
varying vec2 vUv;

#define SIGMA 10.0
#define BSIGMA 0.1
#define MSIZE 15

float normpdf(in float x, in float sigma)
{
	return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;
}

float normpdf3(in vec3 v, in float sigma)
{
	return 0.39894*exp(-0.5*dot(v,v)/(sigma*sigma))/sigma;
}

vec3 bilateralFilter(in sampler2D tex, in vec2 uv, in vec2 offset) {

		//declare stuff
		const int kSize = (MSIZE-1)/2;
		float kernel[MSIZE];
		vec3 final_colour = vec3(0.0);

		//create the 1-D kernel
		float Z = 0.0;
		for (int j = 0; j <= kSize; ++j)
		{
			kernel[kSize+j] = kernel[kSize-j] = normpdf(float(j), SIGMA);
		}

		vec3 c = texture2D(uTexture, uv).rgb;
		vec3 cc;
		float factor;
		float bZ = 1.0/normpdf(0.0, BSIGMA);
		//read out the texels
		for (int i=-kSize; i <= kSize; ++i)
		{
			for (int j=-kSize; j <= kSize; ++j)
			{
				cc = texture2D(uTexture, (uv+vec2(float(i),float(j)) * offset)).rgb;
				factor = normpdf3(cc-c, BSIGMA)*bZ*kernel[kSize+j]*kernel[kSize+i];
				Z += factor;
				final_colour += factor*cc;

			}
		}
		return final_colour/Z;

}

void main()
{
    vec2 uv = vec2(1.0 - vUv.x, vUv.y);
    vec2 offset = 1. / uResolution.xy;
    vec3 color = bilateralFilter(uTexture, uv, offset);
		gl_FragColor = vec4(color, 1.0);
}
