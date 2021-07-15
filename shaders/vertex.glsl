uniform float uTime;
uniform vec2 uTextureRepeat;
varying vec2 vUv;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 3.0 + uTime * 3.0 - 4.0) / 50.0;
    modelPosition.z += sin(modelPosition.y * 5.0 + uTime * 2.0 + 2.0) / 50.0;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    vUv = uv * uTextureRepeat;

    gl_Position = projectedPosition;
}
