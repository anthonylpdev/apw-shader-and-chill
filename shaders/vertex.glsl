precision mediump float;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float uTime;
uniform float uApply;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform sampler2D uTextureDisp;

varying vec2 vUv;
varying vec3 vPosition;

void main(){
    vUv = uv;
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(
        position.x,
        position.y,
        position.z,
        1.0
    );
}
