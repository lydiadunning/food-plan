import { createContext, useReducer, useContext } from "react";

export function historyReducer(state, action) {
  const lastKnown = state.current

  console.log('in historyReducer')

  switch (action.type) {
    case 'goto': {
      return {
        current: action.target,
        history: [...state.history, lastKnown]
      }
    }
    case 'goback': {
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
    case 'resetto': {
      return {
        current: action.target,
        history: []
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const HistoryContext = createContext()

export const HistoryContextProvider = (props) => {
  const startingHistory = {
    current: props.loggedInUser ? 'kidList' : 'login',
    history: []
  }
  console.log('in HistoryContextProvider')
  const [history, historyDispatch] = useReducer(historyReducer, startingHistory)

  return (
    <HistoryContext.Provider value={[history, historyDispatch] }>
      {props.children}
    </HistoryContext.Provider>
  )
}

export const useHistory = () => {
  const historyAndDispatch = useContext(HistoryContext)
  console.log(historyAndDispatch)
  return historyAndDispatch[0]
}

export const useHistoryDispatch = () => {
  const historyAndDispatch = useContext(HistoryContext)
  console.log(historyAndDispatch)
  return historyAndDispatch[1]
}

export default HistoryContext