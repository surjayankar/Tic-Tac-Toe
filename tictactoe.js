document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartBtn = document.querySelector('.restart-btn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                return gameBoard[a];
            }
        }

        if (gameBoard.includes('')) return null;
        gameActive = false;
        return 'Draw';
    };

    const handleClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (gameBoard[index] || !gameActive) return;

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        const winner = checkWinner();
        if (winner) {
            if (winner === 'Draw') {
                status.textContent = 'It\'s a Draw!';
            } else {
                status.textContent = `Player ${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player X's turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    restartBtn.addEventListener('click', restartGame);
});
