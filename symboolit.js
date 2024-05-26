document.addEventListener('DOMContentLoaded', function() {
    const symbolsContainer = document.createElement('div');
    symbolsContainer.classList.add('symbols-container');
    document.body.appendChild(symbolsContainer);

    const symbols = ['★', '☆', '✦', '✧', '♱','♱', '✫', '✬', '✭', '✮',];

    function createSymbol() {
        const symbol = document.createElement('div');
        symbol.classList.add('symbol');
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = Math.random() * 100 + 'vw';
        symbol.style.top = '-10vh'; // Start above the viewport
        symbolsContainer.appendChild(symbol);
        return symbol;
    }

    function animateSymbols() {
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach(symbol => {
            const scale = Math.random() * 0.5 + 0.5; // Scale between 0.5 and 1
            const duration = Math.random() * 5 + 3; // Duration between 3 and 8 seconds
            const endY = 100 + Math.random() * 20; // End position below the viewport

            symbol.style.transform = `scale(${scale})`;
            symbol.style.transition = `top ${duration}s linear, opacity ${duration}s linear`;
            symbol.style.top = `${endY}vh`;
            symbol.style.opacity = '0';

            // Remove the symbol after it has moved out of the viewport
            symbol.addEventListener('transitionend', () => {
                symbol.remove();
            });
        });
    }

    function spawnSymbols() {
        const numSymbols = Math.floor(Math.random() * 7) + 1; // Generate 1 to 5 symbols
        for (let i = 0; i < numSymbols; i++) {
            const symbol = createSymbol();
            setTimeout(() => {
                animateSymbols();
            }, 50); // Delay animation to stagger symbols
        }
    }

    // Start spawning symbols periodically
    setInterval(spawnSymbols, 2000);
});
