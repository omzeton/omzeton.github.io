uniform vec2 u_resolution;
uniform float u_time;

float fn(vec2 a, vec2 b) {
    float v = sin(dot(b + a, a + b));
    return cos(v * dot(a, b)) + 0.5;
}

void main() {
    gl_FragColor = vec4(1.0, 0.972, 0.909, 1.0);
}