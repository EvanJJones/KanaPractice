import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function Index(props) {
  const [currentChar, setCurrentChar] = useState();
  const [count, setCount] = useState(0);

  // const { query } = useRouter();
  const { data, error } = useSWR(`/api/allKatakana`, fetcher);
  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  const romanization = data && data[0].romanization;
  let character = data && data[0].character;
  let allKana = data;

  // console.log(query);
  // console.log(romanization);
  // console.log(character);
  if (!data) allKana = false;
  if (error) allKana = false;

  function nextCharacter(allKana) {
    setCount(count + 1);
    console.log(count);
    let rand = Math.floor(Math.random() * allKana.length);
    const newChar = allKana[rand];
    allKana.splice(rand, 1);
    console.log(newChar);
    setCurrentChar(newChar);
  }

  return (
    <main className="center">
      {/* {allKana ? (
        allKana.map(kana => <div key={kana.char_id}>{kana.character}</div>)
      ) : (
        <div>loading...</div>
      )} */}

      {currentChar ? (
        <div id="main" onClick={() => nextCharacter(allKana)}>
          {currentChar.character}
        </div>
      ) : (
        <div onClick={() => nextCharacter(allKana)}>error</div>
      )}
      <style jsx>{`
        main {
          text-align: center;
          font-size: 250px;
        }
        .character {
          font-family: cursive;
          color: #e243de;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .author {
          font-family: sans-serif;
          color: #559834;
          font-size: 20px;
        }
      `}</style>
    </main>
  );
}

export default Index;
