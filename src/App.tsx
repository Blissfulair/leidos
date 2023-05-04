import { useReducer } from 'react';
import Leidos from './leidos';

import { initialState, Provider, reducer } from './state/context';

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <Provider value={{state:state,dispatch:dispatch}}>
          <Leidos/>
    </Provider>
  );
}

export default App;
