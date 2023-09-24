const taskNameInput = document.getElementById("task-name");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const timerDisplay = document.getElementById("timer-display");
const entriesList = document.getElementById("entries-list");

let startTime;
let timerInterval;

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);

function startTimer() {
    if (!taskNameInput.value) {
        alert("Please enter a task name.");
        return;
    }

    startButton.disabled = true;
    stopButton.disabled = false;

    startTime = new Date().getTime();

    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (!startTime) {
        return;
    }

    const endTime = new Date().getTime();
    const elapsedTime = formatTime(endTime - startTime);

    clearInterval(timerInterval);

    startButton.disabled = false;
    stopButton.disabled = true;

    // Add the time entry to the list
    const entryItem = document.createElement("li");
    entryItem.textContent = `${taskNameInput.value}: ${elapsedTime}`;
    entriesList.appendChild(entryItem);

    // Clear the task name input
    taskNameInput.value = "";
    timerDisplay.textContent = "00:00:00";
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = formatTime(currentTime - startTime);
    timerDisplay.textContent = elapsedTime;
}

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}