let scene, camera, renderer, model;

function init() {
    // Scene 설정
    scene = new THREE.Scene();

    // Camera 설정
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Renderer 설정
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200);
    document.getElementById('model-container').appendChild(renderer.domElement);

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // GLTF 모델 로드
    const loader = new THREE.GLTFLoader();
    loader.load(
        '/scene.gltf',
        function (gltf) {
            model = gltf.scene;
            scene.add(model);
            model.rotation.y = Math.PI / 4;
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
        model.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

window.addEventListener('load', init);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});