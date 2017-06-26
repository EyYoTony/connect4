import React from 'react'

const isColFull = function(index, rowLength, boardArr) {
  const col = index % 7
  var outBool = true
  for (var i = col; i < boardArr.length; i += 7) {
    if (!boardArr[i]) {
      outBool = false
    }
  }
  return outBool
}

export default isColFull
