import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
// import { font }  from 'node_modules/three/examples/fonts/droid/';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// import { TextSprite } from 'three/examples/jsm/renderers/TextSprite.js';


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
  labelRenderer: CSS2DRenderer;
  value = '';
  values = ['Normal theatre', 'Immersive Theatre'];
  Immersive: any;
  normalTheatre: (string | number)[][];
  speakersPosition: any;



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

    
    const geometry = new THREE.BoxGeometry(6.5, 4.5, 6.5);
    
    const Fmaterial = new THREE.MeshBasicMaterial({ color: 0x000, opacity: 0.5, transparent: true, side:THREE.BackSide });
    const material = new THREE.MeshBasicMaterial({ color: 0x000, opacity: 0.5, transparent: true, side:THREE.DoubleSide }); 
    const Bmaterial = new THREE.MeshBasicMaterial({ color: 0x000, opacity: 0.5, transparent: true, side:THREE.DoubleSide });

const Wmaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true, side:THREE.DoubleSide }); 
    

var BackMaterial;
   const loader = new THREE.TextureLoader();
   loader.load('../assets/Untitled.png', (texture) => {

    loader.load('../assets/cinema-seating-plan.png', (seatingPlan) => { 

      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = - 1;
      // in this example we create the material when the texture is loaded
       BackMaterial = new THREE.MeshBasicMaterial( {
          map: texture, 
          side:THREE.BackSide
       });

       seatingPlan.wrapS = THREE.RepeatWrapping;
       seatingPlan.repeat.x = - 1;
       // in this example we create the material when the texture is loaded
        const LowerSeatingPlanmaterial = new THREE.MeshBasicMaterial( {
           map: seatingPlan, 
           side:THREE.BackSide,
           color: 0xdfdfdf
        });


        // left right and top --> black 
       const materials = [material, Fmaterial, Fmaterial, LowerSeatingPlanmaterial, Fmaterial, BackMaterial ];
     
       const cube = new THREE.Mesh(geometry, materials);
      //  const PlaneGeometry = new THREE.PlaneGeometry(6.5,6.5);
      // const plane = new THREE.Mesh( PlaneGeometry, LowerSeatingPlanmaterial );
      // this.scene.add( plane );
      // plane.position.set(0,-1.75,0);
      // plane.rotateX(-30);
       const edges = new THREE.EdgesGeometry(geometry);
       const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xdddddd } ));
       this.scene.add(line);
       this.scene.add(cube);
    });
    });

  }



  createSpeakers() {

    this.normalTheatre = [[1.5,0, 3, 'Rrs'], 
    [-1.5,0,3,'Lrs'],
    [0,-2,-3.4,'LFE'], 
    [2.5,0,-3.4, 'R'], 
    [0,0,-3.4, 'C'], 
    [-2.5,0,-3.4, 'L'],
    [3, 0, 1.5, 'Rss3'], [-3, 0, 1.5, 'Lss3'],
    [3, 0, 0, 'Rss2'], [-3, 0, 0, 'Lss2'],
     [3, 0, -1.5, 'Rss1'], [-3,0,-1.5,'Lss1']

  ];


    // x,y,z postions of each speaker in btw -3 and 3 which is the theatre cube side
    const BspeakersPosition: any = [[1.5,0, 3, 'Rrs'], [-1.5,0,3,'Lrs'],[0,-2,-3.4,'LFE'], 
    [2.5,0,-3.4, 'R'], [0,0,-3.4, 'C'], [-2.5,0,-3.4, 'L']];
    
    const L2speakerPosition = [
      [3, 1, 1.5, 'HRss3'], [-3, 1, 1.5, 'HLss3'],
    [3, 1, 0, 'HRss2'], [-3, 1, 0, 'HLss2'],
     [3, 1, -1.5, 'HRss1'], [-3,1,-1.5,'HLss1'], [1.5,1, 3, 'HRrs'], [-1.5,1,3,'HLrs'], 
     [2.5,1,-3.4, 'HR'], [0,1,-3.4, 'HC'], [-2.5,1,-3.4, 'HL']]; 


     const L3speakerPosition = [
      [-1.5, 2, 0, 'TL'], [1.5, 2, 0, 'TR']
     ]




     this.Immersive = [...BspeakersPosition, ...L2speakerPosition, ...L3speakerPosition,
      [3, 0, 1.5, 'Rss3'], [-3, 0, 1.5, 'Lss3'],
    [3, 0, 0, 'Rss2'], [-3, 0, 0, 'Lss2'],
     [3, 0, -1.5, 'Rss1'], [-3,0,-1.5,'Lss1']];

    // this.speakersPosition = this.Immersive;
      this.speakersPosition = this.normalTheatre;


    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xc8c8c8, opacity: 1 });
    const edges = new THREE.EdgesGeometry(geometry);
    const borderColor = new THREE.LineBasicMaterial( { color: 0x000000 });


    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    this.labelRenderer.domElement.style.fontSize = '12px';
    this.labelRenderer.domElement.style.fontWeight = 'bold';
    this.labelRenderer.domElement.style.color = 'red';
    
    document.body.appendChild(this.labelRenderer.domElement);

    
    for(let i = 0; i < this.speakersPosition.length; i++) {

      let line = [], cube =[], p = [], cPointLabel = [];
      line[i] = new THREE.LineSegments(edges, borderColor);
      cube[i] = new THREE.Mesh(geometry, material);
      p[i] = document.createElement('p');
      p[i].textContent = this.speakersPosition[i][3];
      cPointLabel[i] = new CSS2DObject(p[i]);
      this.scene.add(cPointLabel[i]);
      cPointLabel[i].position.set(this.speakersPosition[i][0], this.speakersPosition[i][1]-0.5, this.speakersPosition[i][2]);
      line[i].position.set(this.speakersPosition[i][0],this.speakersPosition[i][1],this.speakersPosition[i][2]);
      cube[i].position.set(this.speakersPosition[i][0],this.speakersPosition[i][1],this.speakersPosition[i][2]);
      this.scene.add(line[i]);
      this.scene.add(cube[i]);
    }

  }

  onOptionsSelected(value: any) {
    console.log(value);
    if(value === 'Normal theatre') {
      this.speakersPosition = this.normalTheatre;
    } else {
      this.speakersPosition = this.Immersive;
    }
  }

  ngAfterViewInit() {

    this.initializeData();
    this.createTheatre();
    this.createSpeakers();
    
    //controls.update() must be called after any manual changes to the camera's transform
    this.controls.update();
        
    this.renderer.render(this.scene, this.camera);
    const animate = () => {
      this.labelRenderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
      // required if controls.enableDamping or controls.autoRotate are set to true
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }


  public reset() {
    this.camera.position.z = 10;
    
  }

}
 