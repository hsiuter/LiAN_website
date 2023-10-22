import * as THREE from "//cdn.skypack.dev/three@0.134?min";
import { OrbitControls } from "//cdn.skypack.dev/three@0.134/examples/jsm/controls/OrbitControls?min";

const starsTexture = "./gLGNnkp.jpeg";
const sunTexture = "./zU5oOjt.jpeg";
const mercuryTexture = "./TJO6Te3.jpeg";
const venusTexture = "./xeaPIjD.jpeg";
const earthTexture = "./vflkkqF.jpeg";
const marsTexture = "./U6upjrv.jpeg";
const jupiterTexture = "./4APG00k.jpeg";
const saturnTexture = "./YKw0m4x.jpeg";
const saturnRingTexture = "./u0muMiZ.png";
const uranusTexture = "./olpgGMo.jpeg";
const uranusRingTexture = "./F1y9Ve4.png";
const neptuneTexture = "./pycXdLM.jpeg";
const plutoTexture = "./YNsmmHV.jpeg";

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32
        );
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return { mesh, obj };
}

const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function createOrbit(radius) {
    const shape = new THREE.EllipseCurve(
        0, 0,           // ax, aY
        radius, radius, // xRadius, yRadius
        0, 2 * Math.PI, // aStartAngle, aEndAngle
        false,          // aClockwise
        0               // aRotation 
    );

    const points = shape.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xAAAAAA });

    // Create the final object to add to the scene
    const ellipse = new THREE.Line(geometry, material);
    ellipse.rotation.x = Math.PI / 2; // Rotate 90 degrees around the x-axis
    scene.add(ellipse);

    return ellipse;
}

createOrbit(28);  // Mercury
createOrbit(44);  // Venus
createOrbit(62);  // Earth
createOrbit(78);  // Mars
createOrbit(100); // Jupiter
createOrbit(138); // Saturn
createOrbit(176); // Uranus
createOrbit(200); // Neptune
createOrbit(216); // Pluto

sun.name = "Sun";
mercury.mesh.name = "Mercury";
venus.mesh.name = "Venus";
earth.mesh.name = "Earth";
mars.mesh.name = "Mars";
jupiter.mesh.name = "Jupiter";
saturn.mesh.name = "Saturn";
uranus.mesh.name = "Uranus";
neptune.mesh.name = "Neptune";
pluto.mesh.name = "Pluto";

// 创建一个div来显示资讯
const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.right = '10px';
infoDiv.style.top = '10px';
infoDiv.style.background = 'white';
infoDiv.style.padding = '10px';
infoDiv.style.borderRadius = '5px';
infoDiv.style.display = 'none';  // 默认隐藏
document.body.appendChild(infoDiv);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(event) {
    // 将鼠标位置归一化为-1至1的范围
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
        const obj = intersects[i].object;

        if (obj.name) {
            // 将相机移动至星球的旁边
            camera.position.set(obj.position.x + 20, obj.position.y + 20, obj.position.z + 20);
            camera.lookAt(obj.position);
            orbit.update();

            // 显示资讯
            infoDiv.innerHTML = `${obj.name} Information.`;  // 这里只是一个示例，你可以根据需要添加更多的信息。
            infoDiv.style.display = 'block';
            return;
        }
    }
}

renderer.domElement.addEventListener('click', onClick);