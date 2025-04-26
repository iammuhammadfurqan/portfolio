// Logo animation script
console.log('Logo animation script loaded');

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    if (logo) {
        // Add a subtle animation to the logo
        setInterval(() => {
            logo.classList.add('glitch');
            setTimeout(() => {
                logo.classList.remove('glitch');
            }, 200);
        }, 5000);
    }
});
