document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const messageDisplay = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    
    const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E']; 
    let flippedCards = [];
    let matchedCards = 0;
    let lockBoard = false;

    resetButton.addEventListener('click', () => {
        location.reload(); // Recarrega a página
    });

    function shuffle(array) {
        
        for (let i = 0; i < array.length / 2; i++) { 
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(cardsArray);
        cardsArray.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            
            card.textContent = symbol; 
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard(event) {
        if (lockBoard) return;
        const clickedCard = event.target;

        
        if (flippedCards.length < 2 && !clickedCard.classList.contains('matched')) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                lockBoard = true;
                
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards += 2;
            messageDisplay.textContent = "Par encontrado!";
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            messageDisplay.textContent = "Tente novamente.";
        }

        flippedCards = [];
        lockBoard = false;
        if (matchedCards === cardsArray.length) {
            messageDisplay.textContent = "Parabéns! Você encontrou todos os pares!";
        }
    }

    createBoard();
});