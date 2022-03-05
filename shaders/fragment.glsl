uniform vec2 u_resolution;
uniform float u_time;

const vec3 C1 = vec3(1.0, 0.972, 0.909);

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    gl_FragColor = vec4(C1, 1.0);
}