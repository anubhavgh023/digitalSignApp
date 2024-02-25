const resetButton = document.getElementById("reset-btn");
const container = document.getElementById('container');
const gridSize = 60;

// Creating a grid of div elements
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const box = document.createElement('div');
        box.setAttribute('id','box')
        container.appendChild(box);
    }
}

const boxes = document.querySelectorAll("#box"); 
let isClicked = false;

function toggleColor(box) {
    if (isClicked && box.classList.contains("hovered")) {
        fillBox(box);
    }
}

function toggleHover(box) {
    box.classList.toggle("hovered");
    if (isClicked && box.classList.contains("hovered")) {
        fillBox(box);
    }
}

function fillBox(box) {
    box.style.backgroundColor = 'black';
}

// Reset button
resetButton.addEventListener('click', () => {
    // Reset all the boxes to white
    boxes.forEach(box => {
        box.style.backgroundColor = 'white';
    });
});

boxes.forEach(box => {
    box.addEventListener("mousedown", () => {
        isClicked = true;
        toggleColor(box);
    });

    box.addEventListener("mouseup", () => {
        isClicked = false;
    });

    box.addEventListener("mouseenter", () => toggleHover(box));
    box.addEventListener("mouseleave", () => toggleHover(box));
});


