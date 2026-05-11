import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

// Renderer 생성 및 호출
const renderer = new THREE.WebGLRenderer({antialias: true});
// 그림자 반영
renderer.shadowMap.enabled = true;
// 성능에 따라 그림자 반영 차이
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

//PlaneGeometry
const floorGeometry = new THREE.PlaneGeometry(20,20);
const floorMaterial = new THREE.MeshStandardMaterial({color:0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry,floorMaterial);
floor.rotation.x = -Math.PI / 2; // PI 180도, 총 90도 회전한 상태
// 그림자를 받을 수 있게 설정해 주는 값
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshStandardMaterial({color:0xffff00});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

// directionalLight 
const directionalLight = new THREE.DirectionalLight(0xffffff,5);
directionalLight.castShadow = true;
directionalLight.position.set(3,4,5);
directionalLight.lookAt(0,0,0); // 원점 설정 (디폴트)
// 그림자 퀄리티 개별 설정, 숫자가 커질수록 그림자 퀄리티도 높아짐
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;

// 그림자가 그려지는 범위 한정
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

// lighthelper(빛이 어디를 향하는지 방향 가이드 제공)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,1);
scene.add(directionalLightHelper);

// // 자유자재로 카메라 시점 변경 (마우스로 이동)
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// // 이동방향으로 이동하다가 부드럽게 멈추게 됨 
// orbitControls.enableDamping = true;
// // 기본값 0.05, 값이 작아질수록 부드럽게 진행 후 정지
// orbitControls.dampingFactor = 0.03;
// // false일 시 줌 실행 ㄴ
// orbitControls.enableZoom = true;
// // 자동으로 회전 (스피드 디폴트 2)
// orbitControls.autoRotate = false;
// orbitControls.autoRotateSpeed = 2;
// // 마우스로 카메라 위치 변환 
// orbitControls.enablePan = true;
// // 마우스로 카메라 회전
// orbitControls.enableRotate = true;
// // 회전 반경 최대소값
// orbitControls.maxPolarAngle = Math.PI / 2;
// orbitControls.minPolarAngle = Math.PI / 4;
// // 수평 방향 회전 최대소값
// orbitControls.maxAzimuthAngle = Math.PI / 2;
// orbitControls.minAzimuthAngle = -Math.PI / 2;

// 애니메이션 루프 안에서 업데이트 필수
// FlyControls 새처럼 하늘에서 바라보는 시점 유용 
// 마우스를 올리면 그 방향으로 이동, 방향키도 이동 영향 o
// const flycontrols = new FlyControls(camera, renderer.domElement);
// // 상하좌우 이동키 속력
// flycontrols.movementSpeed = 1;
// flycontrols.rollSpeed = Math.PI / 10;
// flycontrols.autoForward = false;

camera.position.set(0,1,5);
// // FirstPersonControls 1인칭 시점에서 유용
// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement);
// // 시선, 카메라의 속력이 변경되는 속도 (회전할때)
// firstPersonControls.lookSpeed = 0.1;
// // 카메라 자체를 이동할 때 속력이 변경되는 속도
// firstPersonControls.movementSpeed = 1;
// // 카메라 수직 이동
// firstPersonControls.lookVertical = false;

//PointerLockControls fps 시점에서 유용
// const pointerLockControls = new PointerLockControls(camera, renderer.domElement);
// 클릭 시에 lock이 풀리며 핸들링 가능 esc로 탈출
// window.addEventListener("click", () => {
//   pointerLockControls.lock();
// });

//trackballControls obit과 비슷하지만 회전에 끝이 없는 느낌
const trackballControls = new TrackballControls(camera,renderer.domElement);
// 회전속력조절
trackballControls.rotateSpeed = 2;
// 줌할 시 속력
trackballControls.zoomSpeed = 1.5;
// 마우스로 카메라를 돌렸을 때 회전하는 속력 
trackballControls.panSpeed = 0.5;
// false = 회전 허용
trackballControls.noRotate = false;
trackballControls.noZoom = false;
trackballControls.noPan = false;
//댐핑 없는 움직임 할 건지 여부 
trackballControls.staticMoving = false;
// 댐핑팩터 요소와 유사
trackballControls.dynamicDampingFactor = 0.05;

// 스피어메쉬가 추가 (타켓) 이 스피어를 중심으로 회전
const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({color:0x0000ff})
);
target.position.set(4,0.5,5);
scene.add(target);
trackballControls.target = target.position;



// 화면 비율 조정 시 화면에 맞추어 renderer 설정, mesh 요소 비율 고정
window.addEventListener("resize",() => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene,camera);
});

// 델타 제공
const clock = new THREE.Clock();
// 브라우저 상에서 애니메이션 프레임을 효율적으로 그리게 해주는 requestAnimationFrame
const render = () => {
  renderer.render(scene,camera);
  requestAnimationFrame(render); // 재귀적 호출
  // orbitControls.update();
  // flycontrols.update(clock.getDelta());
  // firstPersonControls.update(clock.getDelta());
  trackballControls.update();

}

render();


