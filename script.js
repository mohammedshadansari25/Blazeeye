document.addEventListener('DOMContentLoaded', () => {
    // Select all parallax layers that have the 'parallax' class (i.e., those with data-speed)
    const parallaxLayers = document.querySelectorAll('.keyart_layer.parallax');

    // The Firewatch effect moves layers UP (negative Y) as you scroll DOWN
    // The data-speed value seems to be a raw multiplier of scrollY.
    const scrollEffectMultiplier = 1; // Adjust this global multiplier to fine-tune overall parallax speed.
                                        // Firewatch's own values are much higher (2-100), implying a different base scroll unit.
                                        // Let's use a smaller global multiplier for initial testing.

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        parallaxLayers.forEach(layer => {
            // Get the data-speed attribute, convert to a number
            const dataSpeed = parseFloat(layer.dataset.speed);

            if (!isNaN(dataSpeed)) {
                // Calculate the translateY based on scroll and data-speed
                // Note the negative sign, as Firewatch layers move up as you scroll down
                const translateY = -(scrollY * dataSpeed * scrollEffectMultiplier);

                // Apply the transform using translate3d, keeping Z at 0
                layer.style.transform = `translate3d(0px, ${translateY}px, 0px)`;
            }
        });

        // Example: Simple fade-in effect for content sections as they scroll into view
        document.querySelectorAll('.content-section').forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (sectionTop < screenHeight * 0.75) {
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            } else {
                section.style.opacity = 0;
                section.style.transform = 'translateY(30px)';
            }
        });
    });

    // Initial check for content section visibility on load
    window.dispatchEvent(new Event('scroll'));

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                     targetElement.scrollIntoView({ behavior: 'smooth' });
                 }
            }
        });
    });
});