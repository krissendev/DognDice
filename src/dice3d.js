import{getDog} from '/dog.js';


//Simply to test if fetching from dog.js works
/* async function testFetch(){
    try{
    const doggie = await getDog();
    console.log(doggie);
    }catch(error){
        console.log("error with fetching dog.js");
    }
} */

//getLocalDogImageTest
async function getImage(){
    try{
        const response = await fetch('testimg.jpg')
        if(!response.ok){
            console.log("some network error")
        }        
        const myBlob = await response.blob();
        return(myBlob);
    }catch(error){
        console.log("error with fetch");
    }
}
    
//Need to create a custom shader............................?
//https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial


//HLSL code
const vshadercube = `
void main() {	
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;
const fshadercube = `
uniform vec3 u_color;
void main (void){
    gl_FragColor = vec4(0.3,0.3,0.8,1.0); 
}`;

//Three.js combined with Hlsl
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth  / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth *0.8 , window.innerHeight *0.8);
document.body.appendChild( renderer.domElement );


async function assignImage(){
    try {
        const textureLoader = new THREE.TextureLoader();  


    //dog api Cube
        const blob = await getDog();
        const imageURL = blob.message;
        const testTexture = textureLoader.load(imageURL); 
        
    //local fetch dog Cube
    /*  const blob = await getImage();
        const textureURL = URL.createObjectURL(blob);
        console.log(blob);
        console.log(textureURL);
        const testTexture = textureLoader.load(textureURL);*/

    //local assign dog Cube
        //const testTexture = textureLoader.load('./testimg.jpg'); 


        const testmaterial = new THREE.MeshStandardMaterial({
            map: testTexture
        });
        cube1.material = testmaterial;
        cube1.material.needsUpdate = true;
      } catch (error) {
        console.error('Error:', error);
      }
}
    

//Cube
const boxgeometry = new THREE.BoxGeometry(5,5,5);
//const materialCube = new THREE.MeshLambertMaterial( { color: 0x000ff0 } );
const materialCube = new THREE.ShaderMaterial( {
    vertexShader: vshadercube,
    fragmentShader: fshadercube,
    } );
let cube1 = new THREE.Mesh( boxgeometry, materialCube );
scene.add(cube1); 



//Camera & Light
var axis  = new THREE.AxesHelper(20);
const spotLight1 = new THREE.AmbientLight( 0xffffff);
spotLight1.intensity = 1;
scene.add(axis);
scene.add( spotLight1 );		
camera.position.z = 10;
spotLight1.position.set( -40, 60, -10 );


//Animation
var step=10;
async function startAnimation() {
    await assignImage();

    function animate(){
        requestAnimationFrame( animate );
        step+=0.03;
        cube1.position.x = 0+( 2*(Math.cos(step)));
        cube1.rotation.y += 0.01;		
        renderer.render( scene, camera );
    }
    animate();
};
startAnimation();

//For rendering still image with animation disabled
//renderer.render( scene, camera );