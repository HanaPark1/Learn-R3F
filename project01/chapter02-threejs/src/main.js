import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
floor.name = "FLOOR";
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshStandardMaterial({color:0xffff00});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
// scene.add(boxMesh);

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

// 비동기적 로드
const gltfloader = new GLTFLoader();
const gltf = await gltfloader.loadAsync("/dancer.glb");
console.log(gltf);
const character = gltf.scene;
const animationClips = gltf.animations;
character.position.y = 0.8;
character.scale.set(0.01,0.01,0.01);
character.castShadow = true;
character.receiveShadow = true;
// 캐릭터의 칠드런을 타고 내려가서 속성값을 변경하고 싶을 때 사용
character.traverse((obj) => {
  if(obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});
scene.add(character);

// 애니메이션 사용
const mixer = new THREE.AnimationMixer(character);
const action = mixer.clipAction(animationClips[3]);
action.setLoop(THREE.LoopPingPong); // LoopOnce 한번만 실행 LoopRepeat 반복 LoopPingPong 처음->끝->처음 
action.play();

// 자유자재로 카메라 시점 변경 (마우스로 이동)
const orbitControls = new OrbitControls(camera, renderer.domElement);
// 이동방향으로 이동하다가 부드럽게 멈추게 됨 
orbitControls.enableDamping = true;
// 기본값 0.05, 값이 작아질수록 부드럽게 진행 후 정지
orbitControls.dampingFactor = 0.03;

//rayCaster
const newPosition = new THREE.Vector3(0,1,0);
const rayCaster = new THREE.Raycaster();
// 화면에 맞게 레이저를 보낼 준비
renderer.domElement.addEventListener("pointerdown", (e) => {
  const x = ( e.clientX / window.innerWidth ) * 2 - 1; // three.js상으로 환산한 x좌표
  const y = -(( e.clientY / window.innerHeight ) * 2 - 1); //three.js상으로 환산한 y좌표

  rayCaster.setFromCamera(new THREE.Vector2(x,y), camera);
  // 통과하는 오브젝트 정보 추출
  const intersects = rayCaster.intersectObjects(scene.children);

  // find를 활용해 name이 FLOOR인 오브젝트만 필터링
  const intersectFloor = intersects.find((i) => i.object.name === "FLOOR");
  console.log("intersectFloor", intersectFloor);
  newPosition.copy(intersectFloor.point); // newPosition에 intersectFloor.point값을 넣음
  newPosition.y = 1;
});

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
const targetVector = new THREE.Vector3();
const render = () => {
  character.lookAt(newPosition); // 모델이 클릭하는 좌표 바라봄
  targetVector
  // subVectors => newPosition에서 character.position을 뺀 벡터를 할당 (클릭 지점까지 가리키는 방향 생성)
  .subVectors(newPosition, character.position) 
  .normalize() // 그 벡터를 정규화
  .multiplyScalar(0.01); // 벡터의 방향을 건들이지 않은 채 크기만 0.01배

  //  클릭 위치까지 애니메이션이 동작하지 않은 채 이동
  if(Math.abs(character.position.x - newPosition.x) >= 1 || 
Math.abs(character.position.z - newPosition.z) >= 1) {
  character.position.x += targetVector.x;
  character.position.z += targetVector.z;
  action.stop();
}
action.play();
  renderer.render(scene,camera);
  requestAnimationFrame(render); // 재귀적 호출
  orbitControls.update();
  if (mixer) {
    mixer.update(clock.getDelta()); // 경과되는 시간을 넣어 줌
  }
}

render();


