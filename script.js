document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsContainer = document.getElementById('laps');
    
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;
    
    // Format time as HH:MM:SS.mm
    function formatTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        let milliseconds = Math.floor((time % 1000) / 10);
        
        return (
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0') + '.' +
            String(milliseconds).padStart(2, '0')
        );
    }
    
    // Update the display with the current time
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }
    
    // Start the stopwatch
    function start() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            resetBtn.disabled = false;
            lapBtn.disabled = false;
        }
    }
    
    // Pause the stopwatch
    function pause() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }
    
    // Reset the stopwatch
    function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lapCount = 0;
        updateDisplay();
        lapsContainer.innerHTML = '';
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
    
    // Record a lap time
    function lap() {
        if (isRunning) {
            lapCount++;
            const lapTime = elapsedTime;
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            
            // Calculate split time (difference from previous lap)
            let splitTime = lapTime;
            if (lapsContainer.children.length > 0) {
                const lastLapTime = parseInt(lapsContainer.firstChild.dataset.time);
                splitTime = lapTime - lastLapTime;
            }
            
            lapItem.dataset.time = lapTime;
            lapItem.innerHTML = `
                <span>${lapCount}</span>
                <span>${formatTime(splitTime)}</span>
                <span>${formatTime(lapTime)}</span>
            `;
            
            lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);
    
    // Initialize display
    updateDisplay();
});