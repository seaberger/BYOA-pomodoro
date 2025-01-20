let timeLeft;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const addTimeButton = document.getElementById('add-time');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the document title
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work session completed! Time to rest!' : 'Rest is over! Back to work!');
                resetTimer();
            }
        }, 1000);
        startButton.textContent = 'Pause';
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
    startButton.textContent = 'Start';
}

function switchMode(mode) {
    isWorkMode = mode === 'work';
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    if (isWorkMode) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
    resetTimer();
}

function addFiveMinutes() {
    timeLeft += 5 * 60;
    updateDisplay();
}

// Initialize
timeLeft = 25 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
document.getElementById('mode-switch').addEventListener('click', () => switchMode(isWorkMode ? 'break' : 'work'));
addTimeButton.addEventListener('click', addFiveMinutes); 