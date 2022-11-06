import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-three';

  @ViewChild('mainCanvas', { static: false }) rendererContainer: ElementRef;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;


  ngOnInit() {

  }

  public initializeData(){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.rendererContainer.nativeElement, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(1080, 1200);
    document.body.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 10;
    this.scene.add(this.camera);
  }

  createTheatre() {

    
    const geometry = new THREE.BoxGeometry(6.5, 6.5, 6.5);
    
    const Fmaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true, side:THREE.BackSide });
    const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee, opacity: 0.5, transparent: true, side:THREE.BackSide }); 
    const Bmaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.5, transparent: true, side:THREE.BackSide });


var BackMaterial;
   const loader = new THREE.TextureLoader();
   loader.load('../assets/Untitled.png', (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = - 1;
      // in this example we create the material when the texture is loaded
       BackMaterial = new THREE.MeshBasicMaterial( {
        map: texture, side:THREE.BackSide
       });
       const materials = [material, Bmaterial, Bmaterial, Bmaterial, Fmaterial, BackMaterial ];
     
       const cube = new THREE.Mesh(geometry, materials);
       const edges = new THREE.EdgesGeometry(geometry);
       const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xdddddd } ));
       this.scene.add(line);
       this.scene.add(cube);
    });

  }

  createSpeaker(){
    // can be used for speakers 
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, opacity: 0.1 });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 3;

    const cube2 = new THREE.Mesh(geometry, material);
    cube2.position.x = -3;

    const cube3 = new THREE.Mesh(geometry, material);
    cube3.position.y = -3;
    cube3.position.z = -3;

    this.scene.add(cube);
    this.scene.add(cube2);
    this.scene.add(cube3);
    return cube;
  }


  ngAfterViewInit() {

    this.initializeData();
    this.createTheatre();
    this.createSpeaker();
    
    //controls.update() must be called after any manual changes to the camera's transform
    this.controls.update();
        
    this.renderer.render(this.scene, this.camera);
    const animate = () => {
      requestAnimationFrame(animate);
      // required if controls.enableDamping or controls.autoRotate are set to true
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

}
 