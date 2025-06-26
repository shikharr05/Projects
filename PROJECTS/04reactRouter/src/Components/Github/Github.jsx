import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export function Github(props) {
    const data  = useLoaderData()
    //either we can do by normal useEffect function by using promises and .then to fetch an api or we can also create a loader which optimizes to some further extent as in loader it fetches just as our mouse hovers to the gituhub button.
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch("https://api.github.com/users/hiteshchoudhary")
//       .then((res) => res.json())
//       .then((data) => setData(data));

    
//   });

  return (
    <>
      <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
        GitHub Followers: {data.followers}
        <img src={data.avatar_url} alt="git picture" width={300} />
      </div>
    </>
  );
}

export const githubInfoLoader = async () => {
    const response = await fetch("https://api.github.com/users/hiteshchoudhary");
    return response.json()
} 