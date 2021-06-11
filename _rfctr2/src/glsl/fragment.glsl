uniform float time;
uniform vec3 resolution;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0.0, 2.0, 4.0));
    gl_FragColor = vec4(col, 1.0);
}