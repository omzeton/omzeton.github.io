uniform float time;
uniform vec3 resolution;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    gl_FragColor = vec4(vUv, 0., 1.);
}