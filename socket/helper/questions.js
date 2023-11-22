const fs = require("fs");

const englishWords = fs.readFileSync("../dictionary/eng-fil.txt", { encoding: "utf-8" }).split("\r\n");
const indonesiaWords = fs.readFileSync("../dictionary/id-fil.txt", { encoding: "utf-8" }).split("\r\n");

function getRandomWord(lang) {
  let wordList;
  if (lang === "en") wordList = englishWords;
  if (lang === "id") wordList = indonesiaWords;

  while (true) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const word = wordList[randomIndex];

    const length = word.length - 3;
    const startIndex = Math.floor(Math.random() * length);

    const sliced = word.slice(startIndex, startIndex + 3);

    let matchCount = 0;
    for (const testWord of wordList) {
      if (testWord.includes(sliced)) matchCount++;

      if (matchCount > 100) return sliced;
    }
  }
}

function verifyWord(lang, word) {
  let wordList;
  if (lang === "en") wordList = englishWords;
  if (lang === "id") wordList = indonesiaWords;

  return wordList.includes(word);
}

module.exports = { getRandomWord, verifyWord };
