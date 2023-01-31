import { useReducer } from 'react';
import './App.css';
import Home from './pages/Home';
import { initialState, Provider, reducer } from './state/context';

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <Provider value={{state:state,dispatch:dispatch}}>
      <div className="App">
          <Home/>
      </div>
    </Provider>
  );
}

export default App;
