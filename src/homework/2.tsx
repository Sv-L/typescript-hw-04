import React, { useReducer } from "react"

type RequestStep = 'idle' | 'start' | 'pending' | 'finished';

interface State{
  isRequestInProgress: boolean;
  requestStep: RequestStep,
}

const initialState: State = {
  isRequestInProgress: false,
  requestStep: 'idle',
};

type ActionType = "START_REQUEST" | "PENDING_REQUEST" | "FINISH_REQUEST" | "RESET_REQUEST"

type Action ={type: ActionType}

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_REQUEST':
      return { ...state, isRequestInProgress: true, requestStep: 'start' };
    case 'PENDING_REQUEST':
      return { ...state, isRequestInProgress: true, requestStep: 'pending' };
    case 'FINISH_REQUEST':
      return { ...state, isRequestInProgress: false, requestStep: 'finished' };
    case 'RESET_REQUEST':
      return { ...state, isRequestInProgress: false, requestStep: 'idle' };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(requestReducer, initialState);

  const startRequest = () => {
    requestDispatch({ type: 'START_REQUEST' });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: 'PENDING_REQUEST' });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: 'FINISH_REQUEST' });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: 'RESET_REQUEST' });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;