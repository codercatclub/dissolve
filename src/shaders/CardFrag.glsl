varying vec2 vUv;
uniform sampler2D map;
void main() {
  vec4 color = texture2D(map, vUv);
  gl_FragColor = color;
}