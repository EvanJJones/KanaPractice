import React, { useState } from "react";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}
function Index(props) {
  const [currentChar, setCurrentChar] = useState();
  const [allKana, setAllKana] = useState();
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const initialData = props.data;

  function startGame() {
    // nextCharacter();

    setCount(count + 1);
    console.log(count);
    let rand = Math.floor(Math.random() * initialData.length);
    const newChar = initialData[rand];
    initialData.splice(rand, 1);
    console.log(newChar);
    setCurrentChar(newChar);
    setAllKana(initialData);
  }

  function nextCharacter() {
    setCount(count + 1);
    console.log(count);
    let rand = Math.floor(Math.random() * allKana.length);
    const newChar = allKana[rand];
    allKana.splice(rand, 1);
    console.log(newChar);
    setCurrentChar(newChar);
  }

  function checkAnswer() {
    if (currentChar.romanization === input.toLowerCase()) {
      console.log("correct");
      nextCharacter();
    }
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
        <div onClick={() => startGame()}>Click to start</div>
      )}

      <input
        className="form-control"
        type="text"
        placeholder="Enter Romanization"
        name="Input"
        onChange={e => setInput(e.target.value)}
      />

      <button onClick={() => checkAnswer()}>Search</button>
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

Index.getInitialProps = async () => {
  const data = await fetcher(
    "https://kana-practice-dyescbe7b.now.sh/api/allKatakana"
  );
  return { data };
};

export default Index;
