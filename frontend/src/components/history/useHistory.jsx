// useReducer


function handleGoTo(target) {
  dispatch({
    type: 'goto',
    target: target
  });
}

function handleBack() {
  dispatch({
    type: 'back',
  });
}

function handleGoBackTo(target) {
  dispatch({
    type: 'gobackto',
    target: target,
  });
}


// reducer
function historyReducer(state, action) {
  const lastKnown = state.current

  switch (action.type) {
    case 'goto': {
      return {
        current: action.target,
        history: [...state.history, lastKnown]
      }
    }
    case 'back': {
      return {
        current: state.history[state.history.length - 1],
        history: state.history.slice(0, state.history.length - 1)
      }
    }
    // returns the user to a specific view, removing all history between current and target views
    case 'gobackto': {
      return {
        current: action.target,
        history: state.history.slice(0, state.history.findLastIndex(loc => loc === action.target))
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default {
  handleGoTo,
  handleBack,
  handleGoBackTo,
  historyReducer
}