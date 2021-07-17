uniform float uTime;
uniform vec2 uTextureRepeat;
varying vec2 vUv;
varying float vElevation;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevationX = sin(modelPosition.x * 10.0 + uTime * 3.0 - 4.0) / 30.0;
    float elevationY = sin(modelPosition.y * 10.0 + uTime * 2.0 + 2.0) / 30.0;

    modelPosition.z += elevationX + elevationY;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    vUv = uv * uTextureRepeat;
    vElevation = elevationX + elevationY;

    gl_Position = projectedPosition;
}
