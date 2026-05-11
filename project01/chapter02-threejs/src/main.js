import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
const boxMaterial = new THREE.MeshStandardMaterial({color:0xfffff});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

// // 모든곳에서 동일한 밝기를 제공 (그림자 x)
// const ambientLight = new THREE.AmbientLight(0xffffff,5);
// scene.add(ambientLight);

// // directionalLight 
// const directionalLight = new THREE.DirectionalLight(0xffffff,5);
// directionalLight.castShadow = true;
// directionalLight.position.set(3,4,5);
// directionalLight.lookAt(0,0,0); // 원점 설정 (디폴트)
// scene.add(directionalLight);

// // lighthelper(빛이 어디를 향하는지 방향 가이드 제공)
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,1);
// scene.add(directionalLightHelper);

// // hemisphereLight 하늘,지상색을 설정해 위아래로 빛을 비춤 (위아래 두가지 색으로 연출 시 사용)
// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
// hemisphereLight.position.set(0,1,0);
// hemisphereLight.lookAt(0,0,0);
// scene.add(hemisphereLight);

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
// scene.add(hemisphereLightHelper);

// //pointLight 무드등과 같은 라이트
// // 흰색에 빛의 강도 5, 최대 거리 5까지 거리에 따라 4정도로 세기가 줄어들게
// const pointLight = new THREE.PointLight(0xffffff, 5,5,4); 
// pointLight.castShadow = true;
// pointLight.position.set(1,1,1);
// scene.add(pointLight);

// const popointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(popointLightHelper);

// // rectAreaLight 사각형 판 모양에서 나오는 빛 (헬퍼 x, 그림자 x)
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2,2);
// rectAreaLight.position.set(0,1,2);
// scene.add(rectAreaLight);

// spotLight (룩앳 사용 ㄴ 타켓 사용)
const targetObj = new THREE.Object3D();
scene.add(targetObj);

const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1);
spotLight.castShadow = true;
spotLight.position.set(0,3,0);
spotLight.target = targetObj;
spotLight.target.position.set(1,0,2);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

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


