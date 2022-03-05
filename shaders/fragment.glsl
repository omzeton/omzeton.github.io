uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = (gl_FragCoord.xy) / min(u_resolution.x, u_resolution.y);
    gl_FragColor = vec4(1.0, 0.972, 0.909, 1.0);
}