var vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

var fragmentShader = `
  void main() {
    gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
  }
`;

var material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

var geometry = new THREE.BoxGeometry(1, 1, 1);
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);
