// Get references to the body and container elements
const body = document.body;
const container = document.querySelector('.container');

// Function to adjust the size of the color-changing stripes
function adjustStripesSize() {
    // Get the width and height of the window
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Set the width and height of the pseudo-elements
    body.style.setProperty('--stripe-width', windowWidth + 'px');
    body.style.setProperty('--stripe-height', windowHeight + 'px');
}

// Call the function initially and on window resize
adjustStripesSize();
window.addEventListener('resize', adjustStripesSize);
