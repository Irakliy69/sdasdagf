let isDragging = false;
let startY = 0;
let lever = document.getElementById('lever');

lever.addEventListener('mousedown', function(event) {
    isDragging = true;
    startY = event.clientY;
    lever.style.transition = 'none';
});

document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        let moveY = event.clientY - startY;
        if (moveY > 0 && moveY < 100) {
            lever.style.transform = `translateY(${moveY}px)`;
        }
    }
});

document.addEventListener('mouseup', function(event) {
    if (isDragging) {
        isDragging = false;
        lever.style.transition = 'transform 0.3s ease';
        if (parseInt(lever.style.transform.replace('translateY(', '')) > 50) {
            lever.style.transform = 'translateY(100px)';
            spinSlots();
        } else {
            lever.style.transform = 'translateY(0px)';
        }
    }
});

function spinSlots() {
    const slots = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'];
    
    const slotElements = [
        document.getElementById('slot1'),
        document.getElementById('slot2'),
        document.getElementById('slot3'),
        document.getElementById('slot4'),
        document.getElementById('slot5')
    ];
    
    const result = document.getElementById('result');
    result.textContent = ''; // Clear the result message

    slotElements.forEach(slot => {
        slot.classList.add('spin');
    });

    const spinTimes = [1000, 1200, 1400, 1600, 1800]; // Different spin durations for each slot

    slotElements.forEach((slot, index) => {
        setTimeout(() => {
            let spinResult = slots[Math.floor(Math.random() * slots.length)];
            slot.textContent = spinResult;
            slot.classList.remove('spin');

            // Check result after the last slot stops
            if (index === slotElements.length - 1) {
                setTimeout(() => {
                    const spins = slotElements.map(slot => slot.textContent);
                    if (new Set(spins).size === 1) {
                        result.textContent = 'Jackpot! You win!';
                    } else {
                        result.textContent = 'Try again!';
                    }
                    lever.style.transform = 'translateY(0px)'; // Reset lever position
                }, 200); // Slight delay to ensure all slots have stopped
            }
        }, spinTimes[index]);
    });
}
