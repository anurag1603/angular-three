import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-three';

  
  ngOnInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(renderer.domElement);
    renderer.domElement.height = 400;
    renderer.domElement.width = 400;
    
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls( camera, renderer.domElement );


    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);



    // can be used for speakers 
    const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.x = 3;



    scene.add(cube);
    scene.add(cube2);
    const animate = function () {
      requestAnimationFrame(animate);
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      
      // cube2.rotation.x += 0.01;
      // cube2.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.z = 5;
    controls.update();
    

    renderer.render(scene, camera);
    animate();
  }
}
