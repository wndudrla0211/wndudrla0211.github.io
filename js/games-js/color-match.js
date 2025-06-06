// 오디오 요소 가져오기
const matchSound = document.getElementById('matchSound');
const noMatchSound = document.getElementById('noMatchSound');
const startSound = document.getElementById('startSound');
const winSound = document.getElementById('winSound');
const gameOverSound = document.getElementById('gameOverSound');
const clickSound = document.getElementById('clickSound');

// 기존 요소들
const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

let score = 0;
let timeLeft = 60;
let gameInterval;
let selectedTiles = [];
let isPlaying = false;
let demoTimeouts = []; // 데모 타이머를 저장할 배열

// 효과음 재생 함수
function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(error => console.log('오디오 재생 실패:', error));
}

const colors = [
    '#FF3B3B', '#00C9A7', '#4834DF', '#81C784',
    '#FFD93D', '#FF8A65', '#8E44AD', '#3498DB'
];

// 초기 빈 타일 생성
function createEmptyBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        gameBoard.appendChild(tile);
    }
}

// 페이지 로드 시 빈 타일 생성
createEmptyBoard();

function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledColors = [...colors, ...colors].sort(() => Math.random() - 0.5);
    
    shuffledColors.forEach((color, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.color = color;
        tile.dataset.index = index;
        tile.style.backgroundColor = '#f5f5f5';
        tile.style.transition = 'all 0.3s ease';
        tile.addEventListener('click', handleTileClick);
        gameBoard.appendChild(tile);
    });
}

function handleTileClick(e) {
    if (!isPlaying) return;
    
    const tile = e.target;
    if (selectedTiles.includes(tile) || tile.style.backgroundColor !== 'rgb(245, 245, 245)') return;
    
    playSound(clickSound);
    tile.style.backgroundColor = tile.dataset.color;
    tile.classList.add('selected');
    selectedTiles.push(tile);
    
    if (selectedTiles.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [tile1, tile2] = selectedTiles;
    const match = tile1.dataset.color === tile2.dataset.color;
    
    if (match) {
        playSound(matchSound);
        score += 1; // 매칭된 쌍의 수를 카운트
        scoreElement.textContent = score;
        selectedTiles.forEach(tile => {
            tile.classList.remove('selected');
            tile.style.cursor = 'default';
        });
        selectedTiles = [];
        
        if (score === 8) { // 8쌍이 모두 매칭되었을 때
            setTimeout(() => {
                playSound(winSound);
                endGame(true);
            }, 500);
        }
    } else {
        playSound(noMatchSound);
        setTimeout(() => {
            selectedTiles.forEach(tile => {
                tile.style.backgroundColor = '#f5f5f5';
                tile.classList.remove('selected');
            });
            selectedTiles = [];
        }, 600);
    }
}

// 데모용 초기 보드 생성
function createDemoBoard() {
    if (isPlaying) return; // 게임 중이면 데모 실행하지 않음
    
    gameBoard.innerHTML = '';
    const shuffledColors = [...colors, ...colors].sort(() => Math.random() - 0.5);
    
    shuffledColors.forEach((color, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.color = color;
        tile.dataset.index = index;
        tile.style.backgroundColor = '#f5f5f5';
        gameBoard.appendChild(tile);
    });

    startDemoAnimation();
}

// 데모 애니메이션
function startDemoAnimation() {
    if (isPlaying) return; // 게임 중이면 데모 실행하지 않음
    
    const tiles = Array.from(gameBoard.children);
    let currentPair = 0;
    const colorPairs = {};
    
    // 같은 색상끼리 쌍 만들기
    tiles.forEach(tile => {
        const color = tile.dataset.color;
        if (!colorPairs[color]) {
            colorPairs[color] = [];
        }
        colorPairs[color].push(tile);
    });

    function revealNextPair() {
        if (isPlaying) return; // 게임 중이면 즉시 중단
        
        if (currentPair >= colors.length) {
            // 모든 쌍이 매칭되면 초기화
            const resetTimeout = setTimeout(() => {
                if (!isPlaying) { // 게임 중이 아닐 때만 실행
                    tiles.forEach(tile => {
                        tile.style.backgroundColor = '#f5f5f5';
                        tile.classList.remove('selected');
                    });
                    currentPair = 0;
                    startDemoAnimation();
                }
            }, 1000);
            demoTimeouts.push(resetTimeout);
            return;
        }

        const color = colors[currentPair];
        const pair = colorPairs[color];

        // 첫 번째 타일 보여주기
        const firstTileTimeout = setTimeout(() => {
            if (!isPlaying) { // 게임 중이 아닐 때만 실행
                pair[0].style.backgroundColor = color;
                pair[0].classList.add('selected');
            }
        }, 0);
        demoTimeouts.push(firstTileTimeout);

        // 두 번째 타일 보여주기
        const secondTileTimeout = setTimeout(() => {
            if (!isPlaying) { // 게임 중이 아닐 때만 실행
                pair[1].style.backgroundColor = color;
                pair[1].classList.add('selected');
                currentPair++;
                const nextPairTimeout = setTimeout(revealNextPair, 800);
                demoTimeouts.push(nextPairTimeout);
            }
        }, 400);
        demoTimeouts.push(secondTileTimeout);
    }

    revealNextPair();
}

// 데모 중지 함수
function stopDemo() {
    // 모든 진행 중인 타이머 중지
    demoTimeouts.forEach(timeout => clearTimeout(timeout));
    demoTimeouts = [];
}

// 게임 시작
function startGame() {
    isPlaying = true;
    stopDemo(); // 데모 중지
    
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    
    createBoard();
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    
    gameInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            playSound(gameOverSound);
            endGame(false);
        }
    }, 1000);
}

// 게임 종료
function endGame(isWin) {
    isPlaying = false;
    clearInterval(gameInterval);
    
    setTimeout(() => {
        if (isWin) {
            alert(`Congratulations! / 축하합니다!`);
        } else {
            alert(`Game Over! Matched pairs: ${score}/8 / 게임 오버! 매칭한 쌍: ${score}/8`);
        }
        restartBtn.style.display = 'inline-block';
    }, 100);
}

// 페이지 로드 시 데모 시작
createDemoBoard();

// 게임 시작 버튼 클릭 시 데모 중지하고 게임 시작
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);