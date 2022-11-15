import * as THREE from 'three';
import {imgs} from './images.js'; 
const container = document.querySelector('.three_bg');






const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGL1Renderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(20,10,15,9);
const material = new THREE.MeshBasicMaterial({
    color: 0xff6666,
    transparent: true,
    opacity: 0.6,
    map: loader.load(imgs.bg10),
    // wireframe:true,
});


const mesh= new THREE.Mesh(geometry, material);
    
camera.position.z = 5;

const count = geometry.attributes.position.count;
scene.add(mesh, camera);

// responsive
window.addEventListener('resize', () => {
    //Update Camera
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const clock= new THREE.Clock();
function animate(){
    const time=clock.getElapsedTime()
    for(let i=0; i<count; i++){
        const x= geometry.attributes.position.getX(i);
        const y= geometry.attributes.position.getY(i);
        // animations
        const anim1= 0.9* Math.sin(y*2+time* 0.7);
        geometry.attributes.position.setZ(i,anim1 )
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate=true;
    
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate();

// renderer.render(scene, camera);