varying vec2 vUv;
uniform sampler2D map;


void main() {
  vec4 color = texture2D(map, vUv);
  color.x = 1.3*pow(color.x,1.3);
  color.y = 1.3*pow(color.y,1.3);
  color.z = 1.3*pow(color.z,1.3);
  gl_FragColor = color;
}