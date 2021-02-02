precision highp float;
uniform sampler2D uTexture;
uniform vec3 uEye0;
uniform vec3 uEye1;
varying vec2 vUv;

vec2 enlargeFun(vec2 curCoord,vec2 circleCenter,float radius,float intensity,float curve)
{
    float currentDistance = distance(curCoord,circleCenter);

    {
        float weight = currentDistance/radius;

        weight = 1.0-intensity*(1.0-pow(weight,curve));//默认curve为2 ,当curve越大时,会放大得越大的,
        weight = clamp(weight,0.0,1.0);
        curCoord = circleCenter+(curCoord-circleCenter)*weight;
    }
    return curCoord;
}

void main () {
    vec2 uv = vec2(1.0 - vUv.x, vUv.y);
    // 原图
    vec2 eyeL = enlargeFun(uv, uEye0.xy, uEye0.z * 3.0, 0.2, 2.0);
    vec2 eyeR = enlargeFun(eyeL, uEye1.xy, uEye1.z * 3.0, 0.2, 2.0);
    vec3 color = texture2D(uTexture, eyeR).rgb;
    gl_FragColor = vec4(color, 1.0);
}
