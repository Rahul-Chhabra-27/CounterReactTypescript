import { useReducer, useState } from "react";

type InitialState = {
  count : number;
  draftCount : number;
}
const initialState : InitialState = {
  count : 0,
  draftCount: 0,
} 
type Action = {
  type : 'increment' | 'decrement' | 'reset' | 'updateCountFromDraft';
}
type ActionWithPayload = {
  type:'updateDraftCount';
  payload : number;
}
const reducer = ( state = initialState, action: Action | ActionWithPayload ) => {
  const { count, draftCount } = state;

  if (action.type === 'increment') {
    return { count : count + 1, draftCount: draftCount + 1};
  }
  else if (action.type === 'decrement') {
    return { count : count - 1, draftCount : draftCount - 1};
  }
  else if (action.type === 'reset') {
    return initialState;
  }
  else if (action.type === 'updateCountFromDraft') {
    return { ...state, count : draftCount};
  }
  else if (action.type === 'updateDraftCount') {
    return { ...state, draftCount : action.payload}
  }
  return state;
}
const Counter = () => {
  const [state,dispatch] = useReducer(reducer,initialState);
  const { count, draftCount } = state;

  const IncrementHandler = () => {
    dispatch({ type:'increment' });
  }
  const DecrementHanlder = () => {
    dispatch({ type :'decrement' });
  }
  const Reset = () => {
    dispatch({ type : 'reset' });
  }
  
  return (
    <section className="flex flex-col items-center w-2/3 gap-8 p-8 bg-white border-4 shadow-lg border-primary-500">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <div className="flex gap-2">
        <button onClick={DecrementHanlder}>➖ Decrement</button>
        <button onClick={Reset}>🔁 Reset</button>
        <button onClick={IncrementHandler}>➕ Increment</button>
      </div>
      <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'updateCountFromDraft'}); 
          }}>
          <input type="number" value={draftCount} onChange={(e) => dispatch({type: 'updateDraftCount',payload:e.target.valueAsNumber})} />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
