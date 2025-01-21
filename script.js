let timeLeft;
let timerId = null;
let isWorkMode = true;
let currentFocus = '';

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

function showFocusModal() {
    const modal = document.getElementById('focus-modal');
    const focusInput = document.getElementById('focus-input');
    modal.style.display = 'flex';
    focusInput.focus();
}

function hideFocusModal() {
    const modal = document.getElementById('focus-modal');
    modal.style.display = 'none';
}

function updateFocusDisplay() {
    const focusDisplay = document.getElementById('focus-display');
    if (currentFocus && isWorkMode) {
        focusDisplay.textContent = `Focus: ${currentFocus}`;
        focusDisplay.style.display = 'block';
    } else {
        focusDisplay.style.display = 'none';
        focusDisplay.textContent = '';
    }
}

function startTimer() {
    if (timerId === null && isWorkMode && !currentFocus) {
        showFocusModal();
        return;
    }
    
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
    currentFocus = '';
    updateDisplay();
    updateFocusDisplay();
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
        currentFocus = '';
    }
    updateFocusDisplay();
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

document.getElementById('focus-submit').addEventListener('click', () => {
    const focusInput = document.getElementById('focus-input');
    currentFocus = focusInput.value.trim();
    if (currentFocus) {
        hideFocusModal();
        updateFocusDisplay();
        focusInput.value = '';
        startTimer();
    }
});

document.getElementById('focus-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('focus-submit').click();
    }
});

// Add event listener for clicking outside the modal
document.getElementById('focus-modal').addEventListener('click', (e) => {
    if (e.target.id === 'focus-modal') {
        hideFocusModal();
    }
});

// Add event listener for Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('focus-modal').style.display === 'flex') {
        hideFocusModal();
    }
}); 