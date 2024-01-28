import { useState,useCallback,useEffect,useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [number,setNumber] = useState(false);
  const [special,setSpecial] =useState(false)
  const [password,setPassword]=useState("")

const passwordRef= useRef(null)

  const passwordGen=useCallback(()=>{
    let pass=""
    let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) string += "0123456789"
    
    if(special) string += '!@#$%^&*()_:"?<>[];.,/'
    
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*string.length +1)
      pass += string.charAt(char)
    }
    setPassword(pass)
  },[length,number,special,setPassword])
  const copyPasswordToClipboard =useCallback(()=>{passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)},[password])

  useEffect(()=>{passwordGen()},[length,number,special,passwordGen])
  return (
    <>
      <div className='w-full max-w-lg mx-auto mt-3 shadow-md rounded-lg px-4  text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center py-2 px-2'>Password Generator</h1>

        <div className='className="flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type="text"
          value={password}
          className='outline-nnone w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className='outline-none mx-auto w-full bg-blue-700 text-white px-2 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-5 my-auto ml-8 items-center'>
          <div className='flex items-center gap-x-2 py-2'>
            <input type ='range' min={8}max={15} value={length} className='cursor-pointer'
            onChange={(e)=> {setLength(e.target.value)}}/>
            <label >Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={number}
            id="numberInput"
            onChange={()=>{setNumber((prev)=>!prev);}}/>
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={special}
            id="specialInput"
            onChange={()=>{setSpecial((prev)=>!prev);}}/>
            <label htmlFor='specialInput'>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
