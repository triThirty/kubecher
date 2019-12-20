import React, { Component }  from 'react';
import '../index.css';

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
          {props.value}
      </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
  
class Board extends React.Component {
    constructor(props) {
      super(props);

      this.retrive = this.retrive.bind(this);

      this.state = {
        squares: Array(9).fill(null),
        current: "O",
        history: [Array(9).fill(null)]
      }; 
    }

    heandleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      if( this.state.current === 'X') {
        this.setState({current:'O'})
      }else{
        this.setState({current:'X'})
      }
      squares[i] = this.state.current;
      const hisotry = this.state.history.slice();
      hisotry.push(squares)
      this.setState({history: hisotry})
      this.setState({squares: squares});

    }

    renderSquare(i) {
      return (
        <Square 
          value={this.state.squares[i]}
          onClick={() => this.heandleClick(i)}
        />
      );
    }

    retrive() {
      if(this.state.history.length <= 1){
        return
      }
      const history = this.state.history
      history.pop()
      const lastStep = history.slice(-1)
      const current = this.state.current === 'O'?'X':'O'
      this.setState({squares: {...lastStep}[0], history: history, current: current})
    }
  
    render() {
      // const status = `Next player: ${ this.state.current === 'O'?'O':'X'}`;

      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = `Next player: ${ this.state.current === 'O'?'O':'X'}`;
      }

      return (
        <div>
          <button onClick={this.retrive}> retrive </button> 
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
class Game extends Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }
}

export default Game;