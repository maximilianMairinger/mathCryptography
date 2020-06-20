import germanWordsTableRaw from "all-the-german-words"
import splitStringAtEveryPossiblePosition from "./splitString"
import util, { prepText, alphabetIndex } from "./util"
const { toNumbers, toString, setAlphabet, setOffset, getAlphabet } = util()
export {setAlphabet, alphabetIndex, setOffset}




export default function caesar (key: number) {
  if (key % getAlphabet().length === 0) throw new Error("Bad key: " + key)
  key = key % getAlphabet().length

  return {
    encrypt(plainText: string) {
      plainText = prepText(plainText)

      let numbers = toNumbers(plainText)
      let encryptedNumbers = numbers.map(function (e) {
        if (typeof e === "string") return e
        return e + key
      })
      return toString(encryptedNumbers)
    },
    decrypt(cypherText: string) {
      cypherText = prepText(cypherText)

      let numbers = toNumbers(cypherText)
      let encryptedNumbers = numbers.map(function (e) {
        if (typeof e === "string") return e
        return e - key
      })
      return toString(encryptedNumbers)
    }
  }
}



let germanWordsTable = germanWordsTableRaw.map(prepText)

export function crackGermanCypherText(cypherText: string, options?: {offset?: number, alphabet: string | Symbol}) {
  if (options) {
    if (options.offset) setOffset(options.offset)
    if (options.alphabet) setAlphabet(options.alphabet)
  }
  

  let allMatches: {liklynes: number, text: string, key: number}[] = []
  for (let key = 1; key < getAlphabet().length; key++) {

    let maybeTheDecryptedText = caesar(key).decrypt(cypherText)

    let wordsCombination: string[][]
    if (maybeTheDecryptedText.includes(" ")) {
      wordsCombination = [maybeTheDecryptedText.split(" ")]
    }
    else {
      if (germanWordsTable.includes(maybeTheDecryptedText)) {
        allMatches.push({liklynes: Infinity, text: maybeTheDecryptedText, key})
        wordsCombination = []
      }
      else {
        try {
          wordsCombination = splitStringAtEveryPossiblePosition(maybeTheDecryptedText)
        }
        catch(e) {
          wordsCombination = []
          allMatches.push({liklynes: -1, text: maybeTheDecryptedText, key})
        }
      }      
    }


    wordsCombination.forEach((words) => {
      let matchesCount = 0
      words.forEach(function (word) {
        if (germanWordsTable.includes(word)) matchesCount++
      })
      if (matchesCount > 0) allMatches.push({liklynes: matchesCount / (Math.pow(words.length, 2)), text: words.join(" "), key})
      else allMatches.push({liklynes: -1, text: words.join(" "), key})
    })
  }

  let end = allMatches.sort(function (a, b) {
    return b.liklynes - a.liklynes
  }).map(function (q) {
    return q.text
  })

  if (options) {
    if (options.offset) setOffset()
    if (options.alphabet) setAlphabet()
  }


  return end
}


