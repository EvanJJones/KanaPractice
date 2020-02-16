import React, { useState, useEffect } from "react";
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
  const [options, setOptions] = useState({});

  const initialData = props.data;

  const startGame = () => {
    // sets basics for the game, initializes options
    // nextCharacter();
    console.log(options);
    // filter based on checkboxes
    const filteredKana = initialData.filter(kana => {
      if (options.Basic === false && kana.type === "basic") {
        return false;
      }
      if (options.Voiced === false && kana.type === "voiced") {
        return false;
      }
      if (options.Combo === false && kana.type === "combo") {
        return false;
      }
      return true;
    });

    setCount(count + 1);
    console.log(count);
    let rand = Math.floor(Math.random() * filteredKana.length);
    const newChar = filteredKana[rand];
    filteredKana.splice(rand, 1);
    setCurrentChar(newChar);
    setAllKana(filteredKana);
  };

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

  function optionCallBack(childOptions) {
    setOptions(childOptions);
  }

  return (
    <main className="center">
      <Options callBack={optionCallBack} />

      {currentChar ? (
        <div id="main">{currentChar.character}</div>
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
