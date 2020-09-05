import { useState } from 'react';

function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const[history, setHistory] = useState([initial]);
  
  function transition(newMode, replace=false) {
    if (!replace) {
      setMode(newMode);
      setHistory(prev => [...prev, newMode]);
    } else {
      const newHistory1 = [...history.slice(0, history.length-1)];
      const newHistory2 =[...newHistory1, newMode];
      setHistory(newHistory2);
      setMode(newMode);
      
    }
  
  };
  
  
  
  function back() {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, history.length-1)];
      setHistory(prev => [...prev.slice(0, prev.length-1)]);
      setMode(newHistory[newHistory.length-1]);
    }
  
  };
  
  //console.log('mode, history OUTSIDE:', mode, history )
  
  return {mode, transition, back};
}

export default useVisualMode;