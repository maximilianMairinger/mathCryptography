export let alphabetIndex = {
  default: Symbol("Default"),
  withoutSpace: Symbol("withoutSpace")
}

let alphabetPresets: any = {}
alphabetPresets[alphabetIndex.default] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "
alphabetPresets[alphabetIndex.withoutSpace] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


export default function() {

  let offset: number
  function setOffset(to: number = 0) {
    offset = to
  }
  setOffset()
  
  
  let letters: string
  function setAlphabet(to: string | Symbol = alphabetIndex.default) {
    if (typeof to === "symbol") letters = prepText(alphabetPresets[to])
    else letters = prepText(to as any)
  }
  setAlphabet()

  function getAlphabet() {
    return letters
  }


  
  function toNumbers(text: string, strict: true): number[]
  function toNumbers(text: string, strict?: false): (number | string)[]
  function toNumbers(text: string, strict: boolean = false) {
    return text.split("").map(function (s) {
      let i = letters.indexOf(s)
      if (i === -1) {
        if (strict) throw new Error("Unable to parse text, letter \"" + s + "\" is not in charset: \"" + letters + "\".")
        else return s
      }
      return i + offset
    })
  }
  
  
  function toString(numbers: (number | string)[]) {
    return numbers.map(function (i) {
      if (typeof i === "string") return i
      i -= offset
      return letters[i >= 0 ? i % letters.length : letters.length + (i % letters.length)]
    }).join("")
  }

  return {toNumbers, toString, setOffset, setAlphabet, getAlphabet}
}

export function prepText(text: string) {
  return text.toLowerCase()
}
