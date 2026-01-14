import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/Controls/OrbitControls"

// Renderer 생성 및 호출
const renderer = new THREE.WebGLRenderer({antialias: true});
// 그림자 반영
renderer.shadowMap.enabled = true;
// 렌더러 사이즈 화면 크기만큼 조절
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

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
camera.position.y = 1;

// 직사광선 생성(빛색상: 흰색, 세기: 5)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// castShadow = 빛이 그림자를 드리울 수 있게 하는 속성
directionalLight.castShadow = true;
directionalLight.position.set(3,4,5);
// 빛이 0,0,0을 바라볼 수 있게 (입력하지 않아도 기본)
directionalLight.lookAt(0,0,0);
scene.add(directionalLight);

//PlaneGeometry
const floorGeometry = new THREE.PlaneGeometry(20,20);
const floorMaterial = new THREE.MeshStandardMaterial({color:0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry,floorMaterial);
floor.rotation.x = -Math.PI / 2; // PI 180도, 총 90도 회전한 상태
// 그림자를 받을 수 있게 설정해 주는 값
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

// geometry (가로세로높이 1,1,1)
const geometry = new THREE.BoxGeometry(1,1,1);
// material (컬러 red)
// MeshBasicMaterial 이외의 매터리얼은 빛이 없으면 보이지 않음
const material = new THREE.MeshStandardMaterial({color:0xff0000});

// Mesh 생성 (가로세로높이 1,1,1의 빨간색 색상인 상자 Mesh)
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.position.y = 0.5;

// Scene에 mesh 추가
scene.add(mesh);

// capsuleMesh
const capsuleGeometry = new THREE.CapsuleGeometry(1,2,20,30);
const capsuleMaterial = new THREE.MeshStandardMaterial({color:0xffff00});
const capsuleMesh = new THREE.Mesh(capsuleGeometry,capsuleMaterial);
capsuleMesh.position.set(3,1.75,0);
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh);

//cylinderMesh
const cylinderGeometry = new THREE.CylinderGeometry(1,1,2);
const cylinderMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
const cylinderMesh = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
cylinderMesh.position.set(-3,1,0);
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh);

//torusMesh
const torusGeometry = new THREE.TorusGeometry(0.5,0.1,16,100, Math.PI * 2);
const torusMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});
const torusMesh = new THREE.Mesh(torusGeometry,torusMaterial);
torusMesh.position.set(0,0.5,1);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh);

//shapeMesh
const starShape = new THREE.Shape();
starShape.moveTo(0,1);
starShape.lineTo(0.2,0.2);
starShape.lineTo(1,0.2);
starShape.lineTo(0.4,-0.1)
starShape.lineTo(0.6,-1);
starShape.lineTo(0,-0.5);
starShape.lineTo(-0.6,-1);
starShape.lineTo(-0.4,-0.1);
starShape.lineTo(-1,0.2);
starShape.lineTo(-0.2,0.2);

const shapeGeoMetry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
const shapeMesh = new THREE.Mesh(shapeGeoMetry,shapeMaterial);
shapeMesh.position.set(0,1,2);
shapeMesh.castShadow = true;
shapeMesh.receiveShadow = true;
scene.add(shapeMesh);

// extrudeMesh
const extrudeSettings = {
  steps:1, // 모양 확장에 있어서 값이 클수록 부드러운 형태
  depth: 0.1, // shape을 입체로 만들 때의 두께
  bevelEnabled : true, // 입체 만들었을 때 모서리가 둥근지에 대한
  bevelThickenss: 0.1, // 모서리의 두께를 0.1로
  bevelSize : 0.3, // 모서리의 크기를 0.3
  bevelSegments : 100, // 모서리를 얼마나 매끄럽게 
}

const extrudeGeomatry = new THREE.ExtrudeGeometry(starShape,extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({color:0x0ddaaf});
const extrudeMesh = new THREE.Mesh(extrudeGeomatry,extrudeMaterial);
extrudeMesh.position.set(2,1.3,2);
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh);

//sphereMesh
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x98daaf});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0,1,-3);
scene.add(sphereMesh);


// 자유자재로 카메라 시점 변경
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

// 화면 비율 조정 시 화면에 맞추어 renderer 설정, mesh 요소 비율 고정
window.addEventListener("resize",() => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene,camera);
});

// 브라우저 상에서 애니메이션 프레임을 효율적으로 그리게 해주는 requestAnimationFrame
const render = () => {
  renderer.render(scene,camera);
  requestAnimationFrame(render); // 재귀적 호출
}

render();


