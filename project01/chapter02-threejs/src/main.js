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
camera.position.y = 5;
camera.position.x = 5;

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

// 일반적으로 사용하는 mesh side (frontside)
const frontSideGeometry = new THREE.BoxGeometry(1,1,1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side:THREE.FrontSide,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry,frontSideMaterial);
frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
frontSideMesh.castShadow =true;
frontSideMesh.receiveShadow =true;
scene.add(frontSideMesh);

// BacksideMesh (박스 안을 투영하듯이 표현)
const backSideGeometry = new THREE.BoxGeometry(1,1,1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry,backSideMaterial);
backSideMesh.position.y = 0.51; // z-fight 방지 (z축이 동일한 상황에서 서로 충돌나는 형태)
//backSideMesh.castShadow =true;
backSideMesh.receiveShadow =true;
scene.add(backSideMesh);

const doubleSideGeometry = new THREE.BoxGeometry(1,1,1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry,doubleSideMaterial);
doubleSideMesh.position.set(0, 0.51, -2.5);
//doubleSideMesh.castShadow =true; 안쪽 바깥쪽면 둘다 그림자를 만들기에 꺼주기
doubleSideMesh.receiveShadow =true; 
scene.add(doubleSideMesh);

// MeshStandardMaterial
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,20);
const torusKnotStandMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});
torusKnotStandMaterial.roughness = 0.5; // 거칠기
torusKnotStandMaterial.metalness = 1; // 금속적 속성
const torusKnotStandardMesh = new THREE.Mesh(torusKnotGeometry,torusKnotStandMaterial);
torusKnotStandardMesh.castShadow=true;
torusKnotStandardMesh.receiveShadow=true;
torusKnotStandardMesh.position.set(-4,1,0);
scene.add(torusKnotStandardMesh);

// MeshLambertMaterial
const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000,
})
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00); // 빛의 영향을 받지 않는 자체발광
torusKnotLambertMaterial.emissiveIntensity = 0.2; // 자체발광에 대한 세기
const torusKnotLambertMesh = new THREE.Mesh(torusKnotGeometry,torusKnotLambertMaterial);
torusKnotLambertMesh.castShadow=true;
torusKnotLambertMesh.receiveShadow=true;
torusKnotLambertMesh.position.set(-2,1,0);
scene.add(torusKnotLambertMesh);

// MeshPhongMaterial
const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
});
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0xf0ff0f);// 빛이 닫는, 반사되는 부분의 색
torusKnotPhongMaterial.shininess = 100; // 세기
const torusKnotPhongMesh = new THREE.Mesh(torusKnotGeometry,torusKnotPhongMaterial);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

//MeshBasicMaterial 빛 영향 ㄴ
const torusknotBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry,torusknotBasicMaterial);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({
  color: 0xffffff,
});
torusKnotDepthMaterial.opacity = 0.5; // 
const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry,torusKnotDepthMaterial);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);


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


