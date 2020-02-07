import { useRouter } from "next/router";
import useSWR from "swr";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Index() {
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
  let currentChar = false;

  if (allKana) {
    const rand = Math.floor(Math.random() * allKana.length);
    currentChar = allKana[rand];
    console.log(currentChar);
  }

  return (
    <main className="center">
      {/* {allKana ? (
        allKana.map(kana => <div key={kana.char_id}>{kana.character}</div>)
      ) : (
        <div>loading...</div>
      )} */}

      {currentChar ? <div>{currentChar.character}</div> : <div>error</div>}
      <style jsx>{`
        main {
          width: 90%;
          max-width: 900px;
          margin: 300px auto;
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
      `}</style>
    </main>
  );
}
