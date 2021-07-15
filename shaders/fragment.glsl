uniform sampler2D uTexture;
varying vec2 vUv;

void main(){
    vec4 waterTexture = texture2D(uTexture, vUv);
    waterTexture.a = 0.9;
    waterTexture.r = 0.05;
    waterTexture.g = 0.05;


    gl_FragColor = waterTexture;
}
