let scene, camera, renderer, model;

function init() {
    // Scene 설정
    scene = new THREE.Scene();

    // Camera 설정
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;

    // Renderer 설정
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(120, 120);
    document.getElementById('model-container').appendChild(renderer.domElement);

    // 조명 설정
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // GLTF 모델 로드
    const loader = new THREE.GLTFLoader();
    loader.load(
        '/scene.gltf',
        function (gltf) {
            model = gltf.scene;
            scene.add(model);
        },
        undefined,
        function (error) {
            console.error('An error happened', error);
        }
    );

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

window.onload = init;