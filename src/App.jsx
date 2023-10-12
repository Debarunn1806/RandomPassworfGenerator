import { useState ,useCallback, useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numallowed,setNumAllowed]=useState(false);
  const [charallowed,setCharAllowed]=useState(false);

  const [password,setPassword]=useState("");
  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numallowed) str+="0123456789";
    if(charallowed) str+=",./{}[]()~`!@#$%^&*";

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1);

      pass+=str.charAt(char);
    }

    setPassword(pass);



  },[length,numallowed,charallowed,setPassword]);

  const copypasswordtoClip=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[setPassword]);

  useEffect(()=>{
    passwordGenerator();
  },[length,numallowed,charallowed,passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-xl 
      px-9 py-10 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-2 text-3xl'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password}
          className='outlin-none px-3 py-1 w-full'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />

          <button
          className='outline-none shrink-0 text-white px-1 py-0.5 transition ease-in-out duration-300 bg-blue-800 hover:bg-blue-700 '
          onClick={copypasswordtoClip}
          >Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />

            <label> Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
      <input
          type='checkbox'
          defaultChecked={numallowed}
          id='numberInput'
          onChange={() => {
              setNumAllowed((prev) => !prev);
          }}
      />
      <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input
          type='checkbox'
          defaultChecked={charallowed}
          id='charInput'
          onChange={() => {
              setCharAllowed((prev) => !prev);
          }}
      />
      <label htmlFor='characterInput'>Special Characters</label>
      </div>
        </div>
      </div>
    </>
  )
}

export default App
