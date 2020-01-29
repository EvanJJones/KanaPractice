import allKatakana from "../../katakana.json";

export default (req, res) => {
  const { romanization } = req.query;
  let katakana = allKatakana;

  // console.log(katakana);
  // console.log(romanization);
  if (romanization) {
    katakana = katakana.filter(katakana =>
      katakana.romanization.toLowerCase().includes(romanization.toLowerCase())
    );
  }
  if (!katakana.length) {
    katakana = "not Found";
  }

  // const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // console.log(katakana);
  res.status(200).json(katakana);
};
