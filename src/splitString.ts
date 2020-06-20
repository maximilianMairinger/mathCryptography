export default function splitStringAtEveryPossiblePosition(str: string) {
  if (str.length > 20) throw new Error("String is too long")
  let ar: string[][] = []
  for (let i = 1; i < str.length + 1; i++) {
    ar.push(...rec(str, i, 1))
  }

  return ar
}


function rec(str: string, splits: number, start: number) {
  let strt = start-1
  let ar: string[][] = []
  splits--
  if (splits > 0) {
    for (let i = start; i < str.length+1; i++) {
      let sub = str.substring(strt, i);
      rec(str, splits, i + 1).forEach((e) => {
        ar.push([sub, ...e])
      })
    }
  }
  else {
    for (let i = start; i < str.length; i++) {
      ar.push([str.substring(strt, i), str.substring(i)])
    }
  }
  

  return ar
}