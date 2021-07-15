uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

void main() {
    float variation = sin(uTime);
    vec4 myimage = texture(uTexture, vUv);

    gl_FragColor = mix(myimage, vec4(.5, variation, cos(variation), 1.), variation);
}
