const hoop = document.getElementById('hoop');
const ball = document.getElementById('ball');
const trailLength = 10; // Довжина сліду
const trail = []; // Масив для зберігання сліду
let score = 0; // Змінна для зберігання кількості очок

// Додаємо обробник події для кільця, щоб підрахувати очки при клацанні мишею
hoop.addEventListener('click', () => {
    score++; // Збільшуємо кількість очок на 1 при кожному кліку на кільце
    alert(`Ви набрали ${score} очок!`); // Виводимо повідомлення з поточною кількістю очок
});

// Додаємо функцію, яка дозволяє перетягувати м'яч за допомогою миші
ball.addEventListener('mousedown', startDrag);
ball.addEventListener('touchstart', startDrag, { passive: true });
function startDrag(event) {
    event.preventDefault();

    const initialX = event.clientX || event.touches[0].clientX;
    const initialY = event.clientY || event.touches[0].clientY;

    function moveBall(event) {
        const newX = event.clientX || event.touches[0].clientX;
        const newY = event.clientY || event.touches[0].clientY;

        const deltaX = newX - initialX;
        const deltaY = newY - initialY;

        const rect = hoop.getBoundingClientRect();
        const hoopCenterX = rect.left + rect.width / 2;
        const hoopCenterY = rect.top + rect.height / 2;

        const distanceToHoopCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distanceToHoopCenter <= rect.width / 2) {
            ball.style.left = hoopCenterX + deltaX + 'px';
            ball.style.top = hoopCenterY + deltaY + 'px';

            // Додавання сліду за м'ячем
            const trailElement = createTrailElement(newX, newY);
            trail.push(trailElement);
            if (trail.length > trailLength) {
                const removedTrail = trail.shift();
                removedTrail.remove();
            }
        }

        // Завершення події перетягування м'яча
        function endDrag() {
            document.removeEventListener('mousemove', moveBall);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', moveBall);
            document.removeEventListener('touchend', endDrag);

            // Видалення сліду після завершення перетягування
            trail.forEach(element => element.remove());
            trail.length = 0;
        }

        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }

    document.addEventListener('mousemove', moveBall);
    document.addEventListener('touchmove', moveBall);
}

// Функція для створення елемента сліду
function createTrailElement(x, y) {
    const trailElement = document.createElement('div');
    trailElement.className = 'trail';
    trailElement.style.left = x + 'px';
    trailElement.style.top = y + 'px';
    document.body.appendChild(trailElement);
    return trailElement;
}
