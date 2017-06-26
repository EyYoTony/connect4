import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { merge, map, addIndex, findIndex } from 'ramda'
import logo from './logo.gif'

const mapIndexed = addIndex(map)

const store = createStore(
  combineReducers({
    app,
    gameBoard: gameBoard,
    isRedTurn: isRedTurn
  }),
  applyMiddleware(thunk)
)

export default store

// reducers
function isRedTurn(state = true, action) {
  switch (action.type) {
    case 'SET_IS_RED_NEXT':
      return action.payload
    default:
      return state
  }
}

//todo: change on click logic SET_SQUARE
function gameBoard(state = Array(42).fill(null), action) {
  switch (action.type) {
    case 'SET_SQUARE':
      const changeIndex = findOpenIndex(action.payload.index % 7, state)
      //mutated state - bad
      state[changeIndex] = action.payload.value
      return state
    default:
      return state
  }
}

function findOpenIndex(num, board) {
  if (board[num] && num < board.length) {
    return findOpenIndex(num + 7, board)
  } else {
    return num
  }
}

function app(
  state = { title: 'JRS Coding School React Starterkit', logo },
  action
) {
  switch (action.type) {
    case 'SET_APP_TITLE':
      return merge(state, { title: action.payload })
    default:
      return state
  }
}
