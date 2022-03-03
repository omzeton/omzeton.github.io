uniform vec2 u_resolution;
uniform float u_time;

float fn(vec2 a, vec2 b) {
    float v = sin(dot(b + a, a + b));
    return cos(v * dot(a, b)) + 0.5;
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0) / min(u_resolution.x, u_resolution.y);
    vec2 v = fract(uv * 25.0) + tan(sin(uv.x) * cos(uv.y + u_time * 0.02) + u_time * 0.2);
    vec3 col = vec3(0.4 - fn(v * 0.9, v * 0.41), 1.0 - fn(v * 0.99, v * 0.23), 0.5 - fn(v, v * 0.5));
    gl_FragColor = vec4(col, 1.0);
}