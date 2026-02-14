(function() {
    // ========== CONFIGURATION ==========
    const PRENOM = "my impatient wife";
    const NO_PHRASES = [
        "No ?💔",
        "Really ? NO TO ME ?",
        "YE GO TO JAIL WITH ME VILAIN SARAKZIT ",
        "DO YOU WANT TO FIGHT FOR REAL ?",
        "OY HOW CAN YOU ? ",
        "SKY IS BLUE AND YOUR ASS IS RED ",
        "Rendez-vous in Saint Petersburg, i will fix you."
    ];
    // ===================================

    // Éléments DOM
    const normalState = document.getElementById('normalState');
    const yesState = document.getElementById('yesState');
    const btnOui = document.getElementById('btnOui');
    const btnNon = document.getElementById('btnNon');
    const btnSpecial = document.getElementById('btnSpecial');
    const responseMsg = document.getElementById('responseMessage');
    const subtitle = document.getElementById('subtitle');
    const particleContainer = document.getElementById('particleContainer');
    const floatingHearts = document.getElementById('floatingHearts');

    // Conteneurs d'effets
    const secondClickGif = document.getElementById('secondClickGif');
    const thirdClickImage = document.getElementById('thirdClickImage');
    const specialGifContainer = document.getElementById('specialGifContainer');

    // Éléments audio et lecteur
    const audio = document.getElementById('bgMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const playBtn = document.getElementById('playMusic');
    const stopBtn = document.getElementById('stopMusic');
    const closeBtn = document.getElementById('closePlayer');

    // État
    let noClicks = 0;
    let isValentine = false;
    let audioPlaying = false;

    // Sous-titre
    subtitle.innerText = `for ${PRENOM}`;

    // ========== FONCTIONS D'ANIMATION ==========

    // Cœurs flottants en arrière-plan
    function createFloatingHearts() {
        if (!floatingHearts) return;
        const symbols = ['❤️', '💖', '💗', '💓', '💕', '💞'];
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-bg';
            heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (1.5 + Math.random() * 2.5) + 'rem';
            heart.style.animationDuration = (12 + Math.random() * 18) + 's';
            heart.style.animationDelay = Math.random() * 10 + 's';
            heart.style.opacity = 0.05 + Math.random() * 0.1;
            floatingHearts.appendChild(heart);
        }
    }

    // Particules au clic
    function createParticle(e) {
        let x, y;
        if (e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        if (!x || !y) return;

        for (let i = 0; i < 4; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.innerHTML = ['❤️', '✨', '🌸', '🌹'][Math.floor(Math.random() * 4)];
            particle.style.left = (x + (Math.random() - 0.5) * 70) + 'px';
            particle.style.top = (y + (Math.random() - 0.5) * 70) + 'px';
            particle.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
            particle.style.animationDuration = (2 + Math.random() * 2) + 's';
            particleContainer.appendChild(particle);
            setTimeout(() => particle.remove(), 3000);
        }
    }

    // Pluie de cœurs
    function createHeartRain(count = 30) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-rain';
            heart.innerHTML = ['❤️', '💖', '💗', '💓', '💕', '💞'][Math.floor(Math.random() * 6)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (1.6 + Math.random() * 2.2) + 'rem';
            heart.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }
        // Confettis
        for (let i = 0; i < count * 1.2; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = ['#FADADD','#FFDAB9','#E6E6FA','#FFF0F5'][Math.floor(Math.random()*4)];
            confetti.style.width = (4 + Math.random()*8) + 'px';
            confetti.style.height = (8 + Math.random()*12) + 'px';
            confetti.style.animationDuration = (2 + Math.random()*2) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3500);
        }
    }

    // Forte pluie d'eau
    function createHeavyRain(count = 60) {
        for (let i = 0; i < count; i++) {
            const drop = document.createElement('div');
            drop.className = 'water-rain';
            drop.innerHTML = '💧';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.fontSize = (1.5 + Math.random() * 2.2) + 'rem';
            drop.style.animationDuration = (1.8 + Math.random() * 1.5) + 's';
            drop.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 3000);
        }
    }

    // ========== GESTION DES CLIQUES ==========

    function actionOui() {
        if (isValentine) return;
        isValentine = true;
        btnOui.disabled = true;
        btnNon.disabled = true;
        btnSpecial.disabled = true;

        normalState.style.display = 'none';
        yesState.style.display = 'flex';
        createHeartRain(70);

        let count = 0;
        const interval = setInterval(() => {
            createParticle({ clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
            count++;
            if (count > 12) clearInterval(interval);
        }, 150);
    }

    function actionNon(event) {
        if (isValentine || btnNon.disabled) return;
        noClicks++;

        // Agrandir le bouton Oui
        btnOui.style.fontSize = (16 + noClicks * 20) + 'px';
        btnOui.style.transform = `scale(${1 + noClicks * 0.1})`;

        // Changer le texte du bouton Non
        if (noClicks <= NO_PHRASES.length) {
            btnNon.innerText = NO_PHRASES[noClicks - 1];
        }

        const remaining = NO_PHRASES.length - noClicks;
        responseMsg.innerText = remaining > 0 
            ? ` Only ${remaining} more click(s)…` 
            : "Come to me ";

        // Effets par numéro de clic
        if (noClicks === 2) {
            secondClickGif.style.display = 'block';
        }
        if (noClicks === 3) {
            secondClickGif.style.display = 'none';
            thirdClickImage.style.display = 'block';
            createHeavyRain(50);
        }
        if (noClicks === 4) {
            thirdClickImage.style.display = 'none';
            specialGifContainer.style.display = 'block';
        }

        // Transformation du bouton Non en Oui au max
        if (noClicks >= NO_PHRASES.length) {
            btnNon.innerText = "Rendez-vous at Saint Peterburgs, i will fix you.";
            btnNon.classList.remove('btn-non');
            btnNon.classList.add('btn-oui');
            btnNon.removeEventListener('click', actionNon);
            btnNon.addEventListener('click', actionOui);
        }

        // Pluie de cœurs progressive
        createHeartRain(Math.min(noClicks * 10, 60));
        if (event) createParticle(event);
    }

    // ========== GESTION DE LA MUSIQUE ==========
    playBtn.addEventListener('click', () => {
        audio.play();
        audioPlaying = true;
    });
    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        audioPlaying = false;
    });
    closeBtn.addEventListener('click', () => {
        musicPlayer.style.display = 'none';
    });

    // Bouton spécial : affiche le lecteur
    btnSpecial.addEventListener('click', () => {
        if (isValentine) return;
        musicPlayer.style.display = 'flex';
    });

    // ========== EVENT LISTENERS ==========
    btnOui.addEventListener('click', actionOui);
    btnNon.addEventListener('click', actionNon);
    document.querySelector('.card').addEventListener('click', createParticle);
    document.querySelector('.card').addEventListener('touchstart', createParticle, { passive: true });
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    });

    // ========== INITIALISATION ==========
    createFloatingHearts();
    setInterval(() => {
        if (!isValentine && Math.random() < 0.2) {
            createParticle({ clientX: Math.random() * window.innerWidth, clientY: Math.random() * window.innerHeight });
        }
    }, 2500);
})();