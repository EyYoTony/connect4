import React from 'react'
import { map, range, reverse, splitEvery } from 'ramda'

const CreateBoard = function(totalSquares, rowLength, state) {
  const numArr = splitEvery(rowLength, reverse(range(0, totalSquares)))
  const mapFunc = val => state.renderSquare(val)
  return map(
    subArr => <div className="board-row">{map(mapFunc, subArr)}</div>,
    numArr
  )
}

export default CreateBoard
