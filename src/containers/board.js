import React from 'react'
import Square from '../components/square'
import { connect } from 'react-redux'
import { map } from 'ramda'
import CreateBoard from '../lib/createBoard'
import isColFull from '../lib/isColFull'
import checkWin from '../lib/checkWin'

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.gameBoard[i]}
        onClick={this.props.handleClick(
          i,
          this.props.isRedTurn,
          this.props.gameBoard
        )}
      />
    )
  }

  render() {
    const status = `Player's Turn: ${this.props.isRedTurn ? 'Red' : 'Black'}`
    return (
      <div>
        <div className="status">{status}</div>
        {CreateBoard(42, 7, this)}
      </div>
    )
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Board)

function mapStateToProps(state) {
  return {
    gameBoard: state.gameBoard,
    isRedTurn: state.isRedTurn
  }
}

function mapActionsToProps(dispatch) {
  return {
    handleClick: (i, isRedTurn, gameBoard) => event => {
      if (isColFull(i, 7, gameBoard) || checkWin(gameBoard)) {
        return
      }
      dispatch({
        type: 'SET_SQUARE',
        payload: {
          index: i,
          value: isRedTurn ? 'X' : 'O'
        }
      })
      dispatch({
        type: 'SET_IS_RED_NEXT',
        payload: !isRedTurn
      })
    }
  }
}
