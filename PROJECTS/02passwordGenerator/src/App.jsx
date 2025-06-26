//so basically we have used four hooks in this project that is useState, useCallback, useEffect, useRef.

import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  //first hamne useState ke use se aise elements jo ui mai change ho unko bana lia.
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);        
  const [password, setPassword] = useState("");

  //useRef hook(at last)// used for taking reference and then it helps in accessing it later. basically kisi bhi element ko ek reference de skte hai and then usko baad mai us reference ki help se access and manipulate kr skte hai.
  const passwordRef = useRef(null); //abhi passwordRef ke andr koi reference nhi hai.

  //ab ham chahte hai ki ye passwordGenerator baar baar call hoga like length change hone pe number or character include ya exclude hone mai...
  //so we need to keep this function handy with us or hame ye function cache mai rkhna pdega
  //and for this we use another hook useCallback(function,dependencies).. dependencies will be passed in array.
  //ab dependencies kya hoti hai like number kya number ke change hote hi hame function call krna hai yes... or character yes...
  //so dependencies are length, number, character, setPassword.
  //useCallback se optimize hota hai basically memoize and useEffect se call hota hai dependencies change hote hi
  const passwordGenerator = useCallback(() => {
    //we could also have used general function instead of callback.
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);
  //let us try calling passwordGenerator function manually without using hooks.
  //passwordGenerator().....this gives error and hence we cannot call this function like this.
  //hence we need another hook known as useEffect()

  // why did we use setPassword??check it out?? coz due to memoization... memoization is nothing but speeding up computer programs by storing results of frequently used function calls in cache and then returning it from cache itself later if needed.
  //we cannot pass password as it changes every moment and jaise hi change hoga cache update hogi and useEffect ki wajh se again and again passwordGenerator() call hoga and infinite loop.

  //passwordGenerator()//we cannot call this function like this because we have used useCallback.

  //now we will study about useEffect hook.

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  //ab upar ek gadbad hai comments mai... hence useCallback() se optimization hoti hai and useEffect() ka kaam hai state ya props ya dependencies change hone par side effects/function ko execute karna.

  //creatting copyPassword function for copying:-

  const copyPassword = useCallback(() => {
    //we can only use window.navigator.clipboard.writeText(password)..... but only use in react when we use nextJs it will not work as it will not have access to window then.
    passwordRef.current?.select(); //ab jaha jaha ye reference hogi usko ham access kr skte hai.. due to useRef hook.
    passwordRef.current?.setSelectionRange(0, 101); //select first 3 values. if we replace 101 with 3.
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password" //jo input box ke andar likha aata hai!
          readOnly
          ref={passwordRef} //ab is input field ke pass reference hai hence ab agr hame iska kuch chahiye to with the help of this reference we can get it.
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer transition duration-300 hover:bg-red-500"
          onClick={copyPassword}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2 ">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6} //used for making input for length
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label style={{ color: "orange" }}>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={number} //used for making input for Number
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label style={{ color: "orange" }}>Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={character} //used for making input for Character
            id="characterInput"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label style={{ color: "orange" }}>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
