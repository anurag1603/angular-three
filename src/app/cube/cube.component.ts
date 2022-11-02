import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {

  name = 'Angular';



  ngOnInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);


    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    

    const geometry2 = new THREE.BoxGeometry(2, 2, 2);
    const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cube2 = new THREE.Mesh(geometry2, material2);

    scene.add(cube);
    scene.add(cube2);
    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    camera.position.z = 5;
    renderer.render(scene, camera);
    animate();
  }
}
