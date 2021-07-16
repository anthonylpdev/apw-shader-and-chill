precision mediump float;

#pragma glslify: curlNoise = require(glsl-curl-noise/curl)

uniform float uTime;
uniform float uApply;
uniform vec2 uResolution;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vPosition;

void main(){
    vUv = uv;
    vPosition = position;

    float frequency = 0.01;

    //float factor = snoise3(
    //    vec3(
    //        vPosition.x * frequency * 20.5,
    //        vPosition.y * frequency * 20.5,
    //        vPosition.z * frequency * 20.5
    //    ),
    //    vec3(1.)
    //) * 100.;

    vec3 noised = curlNoise(vec3(vUv * vec2(0.009), uTime * 0.5));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(
        position.x,
        position.y,
        // position.y * abs(noised.y * 1.),
        // (vUv.y - 0.5) * factor * 0.2,
        position.z,
        1.0
    );
}
