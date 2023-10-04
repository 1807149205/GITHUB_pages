import { SetStateAction, useState } from 'react'
import './App.css'
import GetFile from './components/GetFile';

function App() {

  const [msg, setInputValue] = useState<string>('Hello React');

  const setInputValueHandle = (event: { currentTarget: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.currentTarget.value)
  }

  return (
    <>
      <div>
        { msg }
      </div>
      <GetFile/>
      <div>
        <input type="text" onChange={setInputValueHandle} value={msg}/>
      </div>
    </>
  )
}

export default App
