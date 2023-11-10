import './App.css';
import { useState } from 'react';
import { Button } from './Button';
import { Screen } from './Screen';
import styled from 'styled-components';

function App() {
  const [screenValue, setScreenValue] = useState(0)
  const maxVal = 5
  const minVal = 0
  const step = 1

  const addHandler = () => {
    setScreenValue(screenValue + step)
  }

  const resetHandler = () => {
    setScreenValue(minVal)
  }

  return (
    <div className="App">
      <Wrapper>
        <Screen screenValue={screenValue} maxVal={maxVal} />
        <div>
          <Button name='Add' onClick={addHandler} isDisabled={screenValue >= maxVal ? true : false} />
          <Button name='Reset' onClick={resetHandler} isDisabled={screenValue <= minVal ? true : false} />
        </div>
      </Wrapper>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid blueviolet;
  padding: 30px;
  border-radius: 10px;
`