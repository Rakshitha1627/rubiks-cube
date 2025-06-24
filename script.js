const colors = ['blue', 'green', 'white', 'yellow', 'orange', 'red'];
const pieces = document.getElementsByClassName('piece');

function mx(i, j) {
    return ([2, 4, 3, 5][j % 4 | 0] + i % 2 * ((j | 0) % 4 * 2 + 3) + 2 * (i / 2 | 0)) % 6;
}

function getAxis(face) {
    return String.fromCharCode('X'.charCodeAt(0) + face / 2);
}

function assembleCube() {
    function moveTo(face) {
        id = id + (1 << face);
        const newDiv = createDiv();
        const attribute = `sticker ${colors[face]}`;
        pieces[i].children[face].appendChild(newDiv).setAttribute('class', attribute);
        const axis = getAxis(face);
        const value = face % 2 * 4 - 2;
        return `translate${axis}(${value}em)`;
    }

    for (var id, x, i = 0; id = 0, i < 26; i++) {
        x = mx(i, i % 18);
        const transform = `rotateX(0deg)${moveTo(i % 6)}${i > 5 ? moveTo(x) + (i > 17 ? moveTo(mx(x, x + 2)) : '') : ''}`
        pieces[i].style.transform = transform;
        pieces[i].setAttribute('id', `piece${id}`);
    }
}

function createDiv() {
    return document.createElement('div');
}

function getPieceBy(face, index, corner) {
    const pieceId = `piece${(1 << face) + (1 << mx(face, index)) + (1 << mx(face, index + 1)) * corner}`;
    return document.getElementById(pieceId);
}

function swapPieces(face, times) {
    for (var i = 0; i < 6 * times; i++) {
        var piece1 = getPieceBy(face, i / 2, i % 2);
        var piece2 = getPieceBy(face, i / 2 + 1, i % 2);
        for (var j = 0; j < 5; j++) {
            var sticker1 = piece1.children[j < 4 ? mx(face, j) : face].firstChild;
            var sticker2 = piece2.children[j < 4 ? mx(face, j + 1) : face].firstChild;
            var className = sticker1 ? sticker1.className : '';
            if (className) {
                sticker1.className = sticker2.className;
                sticker2.className = className;
            }
        }
    }
}

function animateRotation(face, cw, currentTime, callback) {
    var k = .3 * (face % 2 * 2 - 1) * (2 * cw - 1);
    var qubes = Array(9).fill(pieces[face]).map((value, index) => index ? getPieceBy(face, index / 2, index % 2) : value);
    (function rotatePieces() {
        var passed = Date.now() - currentTime;
        var style = `rotate${getAxis(face)}(${k * passed * (passed < 300)}deg)`;
        qubes.forEach((piece) => {
            piece.style.transform = piece.style.transform.replace(/rotate.\(\S+\)/, style);
        });
        if (passed >= 300) {
            swapPieces(face, 3 - 2 * cw);
            if (callback) callback();
            return;
        }
        requestAnimationFrame(rotatePieces);
    })();
}

function mouseDown(md_e) {
    var startXY = pivot.style.transform.match(/-?\d+\.?\d*/g).map(Number);
    var element = md_e.target.closest('.element');
    var face = [].indexOf.call((element || cube).parentNode.children, element);
    function mouseMove(mm_e) {
        if (element) {
            var gid = /\d/.exec(document.elementFromPoint(mm_e.pageX, mm_e.pageY).id);
            if (gid && gid.input.includes('anchor')) {
                mouseUp();
                var e = element.parentNode.children[mx(face, Number(gid) + 3)].hasChildNodes();
                animateRotation(mx(face, Number(gid) + 1 + 2 * e), e, Date.now());
            }
        } else {
            pivot.style.transform = `rotateX(${startXY[0] - (mm_e.pageY - md_e.pageY) / 2}deg)rotateY(${startXY[1] + (mm_e.pageX - md_e.pageX) / 2}deg)`;
        }
    }
    function mouseUp() {
        document.body.appendChild(guide);
        scene.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        scene.addEventListener('mousedown', mouseDown);
    }
    (element || document.body).appendChild(guide);
    scene.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    scene.removeEventListener('mousedown', mouseDown);
}

document.ondragstart = () => false;
window.addEventListener('load', assembleCube);
scene.addEventListener('mousedown', mouseDown);

// ----------------------------------------------------------------------------------
// ✅ Assignment Requirements: Logical Cube, Scramble/Solve with animation
// ----------------------------------------------------------------------------------
class RubiksCube {
    constructor() {
        this.faces = {
            U: Array(9).fill('w'),
            D: Array(9).fill('y'),
            F: Array(9).fill('g'),
            B: Array(9).fill('b'),
            L: Array(9).fill('o'),
            R: Array(9).fill('r'),
        };
        this.history = [];
    }

    rotateFace(face, clockwise = true) {
        this.history.push(face + (clockwise ? '' : "'"));
    }

    scramble(moves = 20) {
        const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
        const steps = [];
        for (let i = 0; i < moves; i++) {
            const face = faces[Math.floor(Math.random() * faces.length)];
            const clockwise = Math.random() > 0.5;
            this.rotateFace(face, clockwise);
            steps.push({ face, clockwise });
        }
        return steps;
    }

    solve() {
        return [...this.history].reverse().map(move =>
            move.includes("'") ? { face: move[0], clockwise: true } : { face: move[0], clockwise: false }
        );
    }
}

const cubeLogic = new RubiksCube();
const faceMap = { U: 4, D: 5, F: 0, B: 1, L: 2, R: 3 };

function scrambleCube() {
    cubeLogic.history = [];
    const moves = cubeLogic.scramble();
    let i = 0;
    function animateNext() {
        if (i >= moves.length) return;
        const move = moves[i++];
        const faceIndex = faceMap[move.face];
        animateRotation(faceIndex, move.clockwise, Date.now(), animateNext);
    }
    animateNext();
}

function solveCube() {
    const moves = cubeLogic.solve();
    let i = 0;
    function animateNext() {
        if (i >= moves.length) return;
        const move = moves[i++];
        const faceIndex = faceMap[move.face];
        animateRotation(faceIndex, move.clockwise, Date.now(), animateNext);
    }
    animateNext();
}

// ✅ Add Scramble & Solve Buttons
window.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '1rem';
    container.style.left = '1rem';
    container.style.zIndex = '1000';
    container.innerHTML = `
        <button onclick="scrambleCube()">Scramble</button>
        <button onclick="solveCube()">Solve</button>
        <p style="color:white; font-size: 0.8rem">Drag to rotate cube or use arrow keys</p>
    `;
    document.body.appendChild(container);
});

// ✅ Add Arrow Key Support for Full Cube Rotation
document.addEventListener('keydown', (e) => {
    const current = pivot.style.transform.match(/-?\d+\.?\d*/g).map(Number);
    let rotateX = current[0];
    let rotateY = current[1];

    if (e.key === 'ArrowLeft') rotateY -= 15;
    if (e.key === 'ArrowRight') rotateY += 15;
    if (e.key === 'ArrowUp') rotateX -= 15;
    if (e.key === 'ArrowDown') rotateX += 15;

    pivot.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
