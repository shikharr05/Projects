//custom hook is nothing but just a function which return a array that contains two values one is variable and another is a function.
//for eg:-

// function hello(){
//     return[variable,function]; //it is also a custom hook
// }

// we can also use predefined hooks inside our custom hooks also
// hence we will use 2 predefined hooks i.e. useEffect and useState in our custom hooks.
import { useEffect, useState } from "react";

//basicalyy we want to fetch api via this hook and get the info of the currency.
function useCurrencyInfo(currency){
    //jaise hi koi naya change aaye ui pe tb ham chahte hai ki usi time api hamari fetch ho.
    //waise to ham directly bhi fetch() call kr skte the but due to above requirement we used a hook useEffect().
    //and ham chahte hai ki ui mai bhi instantly update ho to useState bhi banana pdega ek...
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        )
          .then((res) => {
            res.json();
          })
          .then((res) => setData(res[currency]));
        console.log(data);
    }, [currency])
    return data
}
export default useCurrencyInfo;

//aise hamne custom hook design kia 
//kuchni kia pehle ek function banaya normal and as we needed two predefined hooks so we used useEffect and useState
//now we fetch an api using fetch() and using .then() converted into json and again using .then() we accessed the currency details as in that object and set data using setData() as we had two things in object, date and currency rates. check by openeing the link and u will know.
//we passed currency as dependency as whenever currency changed we need to call that function again and again.
//