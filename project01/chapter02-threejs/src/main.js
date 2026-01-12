import "./style.css";
import * as THREE from "three";

// Scene 생성
const scene = new THREE.Scene();

// Camera 생성
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth/window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

// geometry (가로세로높이1,1,1)
const geometry = new THREE.BoxGeometry(1,1,1);
// material (컬러 red)
const material = new THREE.MeshBasicMaterial({color:0xff0000});

// Mesh 생성 (가로세로높이 1,1,1의 빨간색 색상인 상자 Mesh)
const mesh = new THREE.Mesh(geometry, material);

// Scene에 mesh 추가
scene.add(mesh);

// Renderer 생성 및 호출
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// 화면 비율 조정 시 화면에 맞추어 renderer 설정, mesh 요소 비율 고정
window.addEventListener("resize",() => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene,camera);
});

renderer.render(scene,camera);