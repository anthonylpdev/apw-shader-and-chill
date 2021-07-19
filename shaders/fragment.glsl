precision mediump float;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uPosX;
uniform float uPosY;

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

    // vec2 toto = lengt(vUv, 1.0);

    vec2 st = gl_FragCoord.xy/uResolution;
    // float pct = distance(st,vec2(0.5));
    float di = distance(vUv, vec2(uPosX, uPosY));

    // vec4 myimage = texture(uTexture, vUv);
    // vec2 debug = vUv - vec2(0.);

    gl_FragColor = vec4(myimage.rgb, 1.);
}
