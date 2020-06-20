import caesar, { crackGermanCypherText, alphabetIndex } from "./caesar"
import { toBlocks, setOffset } from "./rsa"


console.log("Caesar")

console.log("7.30")
console.log("1)")
console.log("Der Schlüssel sollte nicht mod letters.length (27) = 0 sein. Also nicht 0 oder ein vielfaches von 27.")

console.log("2)")
let ces = caesar(6)

let plain = "treffpunkt morgen mittag an der alten eiche"
console.log("Plaintext:", plain)
let enc = ces.encrypt("treffpunkt morgen mittag an der alten eiche")
console.log("Encrypted:", enc)
let dec = ces.decrypt(enc)
console.log("Decrypted:", dec)


console.log("7.31")
let encrypted = "uwbnoha zuffy"
console.log("crack:", crackGermanCypherText(encrypted, {alphabet: alphabetIndex.withoutSpace})[0])


console.log("RSA")
console.log("7.29")
setOffset(1)
let blocks = toBlocks("igel")
console.log(blocks)




