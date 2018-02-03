import React, { Component } from 'react';

const redPlayer = {
  backgroundColor: 'red',
  padding: 10
};
const bluePlayer = {
  backgroundColor: 'blue',
  padding: 10
};
const blank = {
  backgroundColor: 'white',
  padding: 10
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'red',
      board: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
      lastMove: [],
      isGameWon: false
    };
    this.handlePlacement = this.handlePlacement.bind(this);
    this.handleReset = this.handleReset.bind(this);

    console.log("REACT ROOTED");
  }

  handlePlacement(event) {
    const columnId = parseInt(event.target.id);

    let i = 5;
    while (i >= 0) {
      if (this.state.board[i][columnId]) {
        i--
      }
      else {
        const newBoard = this.state.board.slice(0);
        newBoard[i][columnId] = this.state.currentPlayer;
        const nextPlayer = this.state.currentPlayer === 'red' ? 'blue' : 'red';
        this.setState({
          currentPlayer: nextPlayer,
          board: newBoard,
          lastMove: [i, columnId]
        }, () => this.checkWinner());

        return;
      }
    }
  }

  // Returns true or false if adjacent piece at given direction is the same color
  checkDirectionColor(currentSlot, direction) {
    // Get adjacent coordinates
    const adjSlot = currentSlot.slice(0);
    adjSlot[0] += direction[0];
    adjSlot[1] += direction[1];

    let color;
    // Return false if adjacent coordinate
    if (adjSlot[0] < 0 || adjSlot[0] > 5 || adjSlot[1] < 0 || adjSlot[1] > 6) {
      return false;
    }
    else {
      color = this.state.board[currentSlot[0]][currentSlot[1]];
    }

    // Check if current slot color matches adjacent slot
    const adjColor = this.state.board[adjSlot[0]][adjSlot[1]]
    if (color === adjColor) {
      return true;
    }
    else {
      return false;
    }
  }

  displayBoard() {
    let rowElements;
    // Set click handler if game hasn't been won yet
    let clickHandler;
    if (!this.state.isGameWon) {
      clickHandler = this.handlePlacement;
    }

    return this.state.board.map((row, i) => {
      rowElements = row.map((column, j) => {
        let color;
        if (column === 'red') {
          color = redPlayer;
        }
        else if (column === 'blue') {
          color = bluePlayer;
        }
        else {
          color = blank;
        }

        return (
          <button key={j} id={j}
            onClick={clickHandler}
            style={color}>
          </button>
        );
      });

      return (
        <div key={i} id={i}>
          {rowElements}
        </div>
      );
    });

  }

  checkWinner() {
    // Directions of adjacent slots
    const directions = [[-1, -1], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

    // Iterate through each direction and continue until a different color is found or 4 in a row is found
    let count;
    for (let i = 0; i < directions.length; i++) {
      count = 1;
      let checkCoordinate = this.state.lastMove.slice(0);
      while (this.checkDirectionColor(checkCoordinate, directions[i]) && count < 4) {
        count++;
        checkCoordinate[0] += directions[i][0];
        checkCoordinate[1] += directions[i][1];
      }
      if (count === 4) {
        break;
      }
    }

    if (count === 4) {
      this.setState({ isGameWon: true });
    }
    else {
      return false;
    }
  }

  // Display current player or if game has been won
  statusDisplay() {
    let display;
    if (this.state.isGameWon) {
      const winner = this.state.currentPlayer === 'red' ? 'Blue' : 'Red';
      display = <div>{winner} Player Won!!</div>;
    }
    else {
      display = (
        <div>
          It is {this.state.currentPlayer.toUpperCase()} Player's Turn
        </div>
      );
    }

    return display;
  }

  // Resets the game
  resetButton() {
    return (
      <button className="reset" onClick={this.handleReset}>RESET</button>
    );
  }

  handleReset() {
    this.setState({
      currentPlayer: 'red',
      board: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
      lastMove: [],
      isGameWon: false
    });
  }

  render() {
    return (
      <div className="board">
        {this.statusDisplay()}
        {this.displayBoard()}
        {this.resetButton()}
      </div>
    );
  }
}