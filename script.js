document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('poolVideo');
    video.play(); // Intenta reproducir automáticamente

    // Ripple Effect
    const canvas = document.getElementById('rippleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ripples = [];

    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = Math.random() * 50 + 50;
            this.speed = 2;
            this.opacity = 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 196, 255, ${this.opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }

        update() {
            this.radius += this.speed;
            this.opacity -= 0.02;
            if (this.opacity < 0) return false;
            return true;
        }
    }

    function animateRipples() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ripples = ripples.filter(ripple => {
            ripple.draw();
            return ripple.update();
        });
        requestAnimationFrame(animateRipples);
    }
    animateRipples();

    // Add ripples on hover
    document.querySelectorAll('.ripple-zone, .ripple-btn, .tiktok-btn').forEach(zone => {
        zone.addEventListener('mousemove', (e) => {
            const rect = zone.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ripples.push(new Ripple(x + rect.left, y + rect.top));
        });
    });

    // Wave effect on stats section
    const waveZone = document.querySelector('.wave-zone');
    waveZone.addEventListener('mousemove', (e) => {
        const rect = waveZone.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        waveZone.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
    waveZone.addEventListener('mouseleave', () => {
        waveZone.style.transform = 'translate(0, 0)';
    });

    // Ajustar canvas al redimensionar la ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});