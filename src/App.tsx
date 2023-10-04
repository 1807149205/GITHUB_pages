import { SetStateAction, useState } from 'react'
import './App.css'

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
      <div>
        <input type="text" onChange={setInputValueHandle} value={msg}/>
      </div>
    </>
  )
}

export default App
