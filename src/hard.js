document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    let matched = 0;
    let cardOne, cardTwo;
    let disableDeck = false;

    // 🔥 Temporizador de 240 segundos
    let timeLeft = 240;
    let timerInterval;

    // 📣 Modal de tiempo terminado
    const overlayTimeout = document.createElement("div");
    overlayTimeout.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
    `;

    const modalTimeout = document.createElement("div");
    modalTimeout.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;

    const messageTimeout = document.createElement("h2");
    messageTimeout.textContent = "Time's Out!";
    messageTimeout.style.marginBottom = "20px";

    const retryBtnTimeout = document.createElement("button");
    retryBtnTimeout.textContent = "Try Again";
    retryBtnTimeout.style.margin = "10px";
    retryBtnTimeout.style.padding = "10px 20px";
    retryBtnTimeout.style.fontSize = "16px";
    retryBtnTimeout.onclick = () => {
        overlayTimeout.style.display = "none";
        shuffleCard();
        startTimer();
    };

    const menuBtnTimeout = document.createElement("button");
    menuBtnTimeout.textContent = "Back";
    menuBtnTimeout.style.margin = "10px";
    menuBtnTimeout.style.padding = "10px 20px";
    menuBtnTimeout.style.fontSize = "16px";
    menuBtnTimeout.onclick = () => {
        window.location.href = "index.html";
    };

    modalTimeout.appendChild(messageTimeout);
    modalTimeout.appendChild(retryBtnTimeout);
    modalTimeout.appendChild(menuBtnTimeout);
    overlayTimeout.appendChild(modalTimeout);
    document.body.appendChild(overlayTimeout);

    // 🏆 Modal de victoria
    const overlayVictory = document.createElement("div");
    overlayVictory.style.cssText = overlayTimeout.style.cssText;

    const modalVictory = document.createElement("div");
    modalVictory.style.cssText = modalTimeout.style.cssText;

    const messageVictory = document.createElement("h2");
    messageVictory.textContent = "Greetings! You completed the Hard Mode!";
    messageVictory.style.marginBottom = "20px";

    const retryBtnVictory = document.createElement("button");
    retryBtnVictory.textContent = "Try Again";
    retryBtnVictory.style.margin = "10px";
    retryBtnVictory.style.padding = "10px 20px";
    retryBtnVictory.style.fontSize = "16px";
    retryBtnVictory.onclick = () => {
        overlayVictory.style.display = "none";
        shuffleCard();
        startTimer();
    };

    const menuBtnVictory = document.createElement("button");
    menuBtnVictory.textContent = "Back";
    menuBtnVictory.style.margin = "10px";
    menuBtnVictory.style.padding = "10px 20px";
    menuBtnVictory.style.fontSize = "16px";
    menuBtnVictory.onclick = () => {
        window.location.href = "index.html";
    };

    modalVictory.appendChild(messageVictory);
    modalVictory.appendChild(retryBtnVictory);
    modalVictory.appendChild(menuBtnVictory);
    overlayVictory.appendChild(modalVictory);
    document.body.appendChild(overlayVictory);

    // ⏱️ Iniciar temporizador
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 240;
        document.getElementById("timer")?.remove();

        const timerElement = document.createElement("div");
        timerElement.id = "timer";
        timerElement.style.cssText = `
            position: fixed;
            top: 10px;
            right: 280px;
            background: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 24px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(timerElement);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `⏱️ Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                overlayTimeout.style.display = "flex";
            }
        }, 1000);
    }

    // 🃏 Función para voltear cartas
    function flipCard({ target: clickedCard }) {
        if (cardOne !== clickedCard && !disableDeck) {
            clickedCard.classList.add("flip");
            if (!cardOne) return cardOne = clickedCard;

            cardTwo = clickedCard;
            disableDeck = true;

            // ✅ Limpiar rutas para comparar solo el nombre del archivo
            let cardOneImg = cardOne.querySelector(".back-view img").src;
            let cardTwoImg = cardTwo.querySelector('.back-view img').src;

            // Limpiar query strings y hashes
            cardOneImg = cardOneImg.split('?')[0].split('#')[0].split('/').pop();
            cardTwoImg = cardTwoImg.split('?')[0].split('#')[0].split('/').pop();

            matchCards(cardOneImg, cardTwoImg);
        }
    }

    // 🎯 Función de comparación corregida
    function matchCards(img1, img2) {
        if (img1 === img2) {
            matched++;
            if (matched === 32) {
                clearInterval(timerInterval);
                setTimeout(() => overlayVictory.style.display = "flex", 500);
            }

            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
            cardOne = cardTwo = "";
            disableDeck = false;
            return;
        }

        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }

    // 🔀 Barajar cartas
    function shuffleCard() {
        matched = 0;
        disableDeck = false;
        cardOne = cardTwo = "";

        let arr = [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
            17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
            17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32
        ];
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);

        cards.forEach((card, i) => {
            card.classList.remove('flip');
            let imgTag = card.querySelector('.back-view img');
            imgTag.src = `src/img/img-${arr[i]}.png`;

            card.removeEventListener('click', flipCard);
            card.addEventListener("click", flipCard);
        });
    }

    // 🚀 Inicializar juego
    shuffleCard();
    startTimer();
});