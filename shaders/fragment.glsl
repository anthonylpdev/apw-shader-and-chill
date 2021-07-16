precision mediump float;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: curlNoise = require(glsl-curl-noise/curl)

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vPosition;

void main(){

    float frequency = 0.06;

    float factor = snoise3(
        vec3(
            vPosition.x * frequency * 1.5,
            vPosition.y * frequency * 1.5,
            uTime * 0.4
        )
    ) * 100.;


    // float variation = sin(uTime);
    vec4 myimage = texture(uTexture, vUv * factor / 10.);
    // vec4 myimage = texture(uTexture, vUv);
    // vec2 debug = vUv - vec2(0.);

    gl_FragColor = vec4(myimage.rgb, factor);
}
