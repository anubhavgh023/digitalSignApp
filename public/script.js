const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0;
let lastY = 0;

//setting the whole canvas background white
const setCanvasBackground = () => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//fixes the viewable width & height of the canvas
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
})

//mouse-web
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const x = e.offsetX;
    const y = e.offsetY;
    draw(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
});

//touch-screen: phone
// Function to handle touch start event
const handleTouchStart = (e) => {
    isDrawing = true;
    const touch = e.touches[0];
    [lastX, lastY] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
};

// Function to handle touch move event
const handleTouchMove = (e) => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    draw(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
};

// Function to handle touch end event
const handleTouchEnd = () => {
    isDrawing = false;
};

//event listeners for touch events on mobile screen
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);
canvas.addEventListener("touchend", handleTouchEnd);
canvas.addEventListener("touchcancel", handleTouchEnd);


function draw(x1, y1, x2, y2) {
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// clear button
const clearButton = document.getElementById("clear-btn");
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

//download button
const downloadButton = document.getElementById("download-btn");
downloadButton.addEventListener("click", () => {
    const dataUrl = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = dataUrl;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    link.download = `Signature-${today.toUTCString()}.jpeg`;
    link.click();
})

