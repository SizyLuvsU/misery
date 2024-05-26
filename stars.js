// JavaScript code for generating and animating stars
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container');
    document.body.appendChild(starsContainer);

    // Create an audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(document.querySelector('.video-bg'));
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        const startX = Math.random() * window.innerWidth; // Start position from top edge
        star.style.left = startX + 'px';
        star.style.top = '-50px'; // Start position above the viewport
        starsContainer.appendChild(star);
        return star;
    }

    function animateStars() {
        const stars = document.querySelectorAll('.star');
        analyser.getByteFrequencyData(dataArray);
        const bassThreshold = 128; // Adjust this value for the desired sensitivity to bass
        let bassLevel = 0;

        // Calculate the average bass level from the frequency data
        for (let i = 0; i < bufferLength; i++) {
            if (i < bassThreshold) {
                bassLevel += dataArray[i];
            }
        }
        bassLevel /= bassThreshold;

        stars.forEach(star => {
            const scale = Math.random() * 1 + 0.5 + bassLevel / 128; // Adjust scale based on bass level
            const duration = Math.random() * 5 + 3;
            const randomAngle = Math.random() * 360; // Generate a random angle for star direction
            const randomDistance = Math.random() * 200; // Generate a random distance for star direction
            const x = Math.cos(randomAngle) * randomDistance;
            const y = Math.sin(randomAngle) * randomDistance;
            star.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            star.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
            star.style.opacity = '0';

            // Remove the star after it has moved out of the viewport
            star.addEventListener('transitionend', () => {
                star.remove();
            });
        });
    }

    function spawnStars() {
        const numStars = Math.floor(Math.random() * 5) + 1; // Generate 1 to 5 stars
        for (let i = 0; i < numStars; i++) {
            const star = createStar();
            setTimeout(() => {
                animateStars();
            }, 50); // Delay animation to stagger stars
        }
    }

    // Start spawning stars periodically
    setInterval(spawnStars, 2000);
});
