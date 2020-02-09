import React, { useState } from "react";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

import Options from "../components/Options";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}
function Index(props) {
  const [currentChar, setCurrentChar] = useState();
  const [allKana, setAllKana] = useState();
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");

  const initialData = props.data;

  function startGame() {
    // sets basics for the game, initializes options
    // nextCharacter();

    setCount(count + 1);
    console.log(count);
    let rand = Math.floor(Math.random() * initialData.length);
    const newChar = initialData[rand];
    initialData.splice(rand, 1);
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

  function checkAnswer(event) {
    event.preventDefault();
    // correct answer
    if (currentChar.romanization === input.toLowerCase()) {
      setInput("");
      console.log("correct");
      setScore(score + 1);
      nextCharacter();
    } else {
      // what happens if incorrect answer
    }
  }

  return (
    <main className="center">
      <Options />
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

      <div className="score">{score}</div>

      <form onSubmit={checkAnswer}>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Romanization"
          name="Input"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <style jsx>{`
        main {
          text-align: center;
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
        .score {
          font-size: 20px;
        }
      `}</style>
    </main>
  );
}

Index.getInitialProps = async () => {
  const data = await fetcher(
    // "https://kana-practice-dyescbe7b.now.sh/api/allKatakana"
    "http://localhost:3000/api/allKatakana"
  );
  return { data };
};

export default Index;
