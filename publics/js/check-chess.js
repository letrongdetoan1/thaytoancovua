var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
var squareToHighlight = null
var squareClass = 'square-55d63'
var $board = $('#myBoard');
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'

function removeGreySquares() {
    $('#myBoard .square-55d63').css('background', '')
}

function greySquare(square) {
    var $square = $('#myBoard .square-' + square)

    var background = whiteSquareGrey
    if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey
    }

    $square.css('background', background)
}

function removeHighlights(color) {
    $board.find('.' + squareClass)
        .removeClass('highlight-' + color)
}

function onDragStart(source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // only pick up pieces for the side to move
    // if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    //     (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    //     return false
    // }

}

function onDrop(source, target) {
    removeGreySquares()
    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    // illegal move
    if (move === null) return 'snapback'

    if (move.color === 'w') {
        removeHighlights('white')
        removeHighlights('black')
        $board.find('.square-' + source).addClass('highlight-white')
        $board.find('.square-' + target).addClass('highlight-white')
    }
    if (move.color === 'b') {
        removeHighlights('white')
        removeHighlights('black')
        $board.find('.square-' + source).addClass('highlight-black')
        $board.find('.square-' + target).addClass('highlight-black')
    }

    updateStatus()
}

function onMouseoverSquare(square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
        square: square,
        verbose: true
    })

    // exit if there are no moves available for this square
    if (moves.length === 0) return

    // highlight the square they moused over
    greySquare(square)

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to)
    }
}

function onMouseoutSquare(square, piece) {
    removeGreySquares()
}
// function onMoveEnd() {
//     console.log('onMoveEnd');
//     $board.find('.square-' + squareToHighlight)
//         .addClass('highlight-black')
// }

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen())
}

function updateStatus() {
    var status = ''

    var moveColor = 'Trắng'
    if (game.turn() === 'b') {
        moveColor = 'Đen'
    }

    // checkmate?
    if (game.in_checkmate()) {
        status = 'Ván cờ kết thúc, ' + moveColor + ' bị chiếu hết.'
    }

    // draw?
    else if (game.in_draw()) {
        status = 'Ván cờ kết thúc, hòa cờ'
    }

    // game still on
    else {
        status = moveColor + ' Đi'

        // check?
        if (game.in_check()) {
            status += ', ' + moveColor + ' Bị chiếu'
        }
    }

    $status.html(status)
    $fen.html(game.fen())
    $pgn.html(game.pgn())
}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)

updateStatus()