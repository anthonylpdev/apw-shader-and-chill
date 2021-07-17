uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main(){
    vec4 waterTexture = texture2D(uTexture, vUv);
    waterTexture.a = (1.0 - vUv.y);
    waterTexture.r = 0.05;
    waterTexture.g = 0.2 + vElevation * 2.0;


    gl_FragColor = waterTexture;
}
