import xrray from "xrray"
import util, { alphabetIndex, prepText } from "./util"
const { toNumbers, toString, setAlphabet: _setAlphabet, setOffset, getAlphabet } = util()
export { setOffset, alphabetIndex }
xrray(Array)

export function setAlphabet(to: string | Symbol) {
  let e = _setAlphabet(to)
  updateNumMinSize()
  return e
}

let numMinSize: number
function updateNumMinSize() {
  numMinSize = Math.floor(Math.log10(getAlphabet().length)) + 1
}
updateNumMinSize()

const blockSize = 3
export function numbersToBlocks(numbers: number[]) {
  let curSize = 0
  let blocks = [0]
  numbers.forEach((num) => {

    curSize += numMinSize

    let over = (curSize - blockSize) * -1
    if (over < 0) {
      
      let pow = Math.pow(10, blockSize + over - 1)
      if (pow !== 1) {
        blocks.last += Math.floor(num / pow)
        blocks.add((num % pow) * pow * 10)
      }
      else {
        blocks.add(num * Math.pow(10, blockSize + over))
      }
      
      curSize = over * -1
    }
    else {
      blocks.last += num * Math.pow(10, over)
    }
  })
  return blocks
}

export function toBlocks(numbers_text: number[] | string) {
  let numbers: number[]
  if (typeof numbers_text === "string") {
    numbers = toNumbers(numbers_text, true)
  }
  else numbers = numbers_text

  return numbersToBlocks(numbers)
}

