import xrray from "xrray"
import util, { alphabetIndex, prepText, toBigInt, toNumber } from "./util"
import * as bigMath from "bigint-math"
const { toNumbers, toString, setAlphabet: _setAlphabet, setOffset, getAlphabet } = util()
export { alphabetIndex, toNumbers }
xrray(Array)
setOffset(1)

export function setAlphabet(to: string | Symbol) {
  let e = _setAlphabet(to)
  updateNumMinSize()
  return e
}

let numberSize: number
function updateNumMinSize() {
  numberSize = Math.floor(Math.log10(getAlphabet().length)) + 1
}
updateNumMinSize()


const defaultBlockSize = 3
function numbersToBlocks(numbers: number[], blockSize = defaultBlockSize) {
  let curSize = 0
  let blocks = [0]
  numbers.forEach((num) => {

    curSize += numberSize

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

export function toBlocks(numbers_text: number[] | string, blockSize?: number) {
  let numbers: number[]
  if (typeof numbers_text === "string") {
    numbers = toNumbers(numbers_text, true)
  }
  else numbers = numbers_text

  return numbersToBlocks(numbers, blockSize)
}

export function fromBlocksToNumbers(blocks: number[], blockSize = defaultBlockSize): number[] {
  let numbers: number[] = []
  let blockToNumbersDelta = defaultBlockSize - numberSize
  let lastOverflow: number | undefined = undefined
  let numSizePot = Math.pow(10, numberSize)

  blocks.forEach((q) => {
    if (q === 51) debugger
    //debugger
    
    let into = lastOverflow === undefined ? 0 : -(lastOverflow <= 1 ? 1 : Math.ceil(Math.log10(lastOverflow)))
    while(into < blockSize) {
      
      let cut = blockToNumbersDelta - into
      
      if (cut < 0) {
        let p = Math.pow(10, cut)
        lastOverflow = (Math.floor(q / p) % numSizePot) * p
      }
      else {
        let add = Math.floor(q / Math.pow(10, cut)) % numSizePot
        if (into < 0) {
          add += lastOverflow as any * Math.pow(10, numberSize + into)
          lastOverflow = undefined
        }
        if (add !== 0) numbers.add(add)
      }
      
      
      into += numberSize
    }
  })
  return numbers
}

export function fromBlocks(blocks: number[], blockSize?: number): string {
  return toString(fromBlocksToNumbers(blocks, blockSize))
}

export function encodeBlocks(blocks: number[], e: number | bigint, n: number | bigint) {
  let ee = toBigInt(e)
  let nn = toBigInt(n)

  return blocks.map((b) => {
    return (toBigInt(b) ** ee) % nn
  })
}

export function encode(blocks_string: number[] | string, e: number, n: number) {
  let blocks: number[]
  if (typeof blocks_string === "string") {
    blocks = toBlocks(blocks_string)
  }
  else blocks = blocks_string

  return toNumber(encodeBlocks(blocks, e, n))
}


