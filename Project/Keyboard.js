const keys = document.querySelectorAll('.key');
const countdownEl = document.getElementById('countdown');
const repeatBtn = document.getElementById('repeat-btn');

let countdown = 60;
let pressedKeys = new Set();
let timeoutIds = new Set();

function startCountdown() {
    const countdownId = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownId);
            resetPressedKeys();
        }
    }, 1000);
}

function resetPressedKeys() {
    pressedKeys.forEach(key => {
        key.classList.remove('pressed', 'released');
        key.classList.add('default');
    });
    pressedKeys.clear();
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds.clear();
}

function simulateKeyPress(key) {
    key.classList.add('pressed');
    timeoutIds.add(setTimeout(() => {
        key.classList.remove('pressed');
        key.classList.add('released');
        timeoutIds.add(setTimeout(() => {
            key.classList.remove('released');
            key.classList.add('default');
        }, 300));
    }, 3000));
}

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        key.classList.remove('default');
        key.classList.add('pressed');
        pressedKeys.add(key);
        timeoutIds.add(setTimeout(() => {
            key.classList.remove('pressed');
            key.classList.add('released');
            timeoutIds.add(setTimeout(() => {
                key.classList.remove('released');
                key.classList.add('default');
                pressedKeys.delete(key);
            }, 300));
        }, 3000));
    });
});

repeatBtn.addEventListener('click', () => {
    resetPressedKeys();
    keys.forEach(key => {
        setTimeout(() => {
            simulateKeyPress(key);
        }, 200);
    });
});

startCountdown();
