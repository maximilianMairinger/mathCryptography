import caesar, { crackGermanCypherText, alphabetIndex } from "./caesar"
import * as rsa from "./rsa"


// console.log("Caesar")

// console.log("7.30")
// console.log("1)")
// console.log("Der Schlüssel sollte nicht mod letters.length (27) = 0 sein. Also nicht 0 oder ein vielfaches von 27.")

// console.log("2)")
// let ces = caesar(6)

// let plain = "treffpunkt morgen mittag an der alten eiche"
// console.log("Plaintext:", plain)
// let enc = ces.encrypt("treffpunkt morgen mittag an der alten eiche")
// console.log("Encrypted:", enc)
// let dec = ces.decrypt(enc)
// console.log("Decrypted:", dec)


// console.log("7.31")
// let encrypted = "uwbnoha zuffy"
// console.log("crack:", crackGermanCypherText(encrypted, {alphabet: alphabetIndex.withoutSpace})[0])


console.log("RSA")
let blocks = rsa.toBlocks("igel")
console.log("igel blocks:", blocks)

let igelPub = new rsa.PublicKey(149, 1517)
let igelEnc = rsa.encrypt(blocks, igelPub)
console.log("enc blocks:", igelEnc)
let igelPriv = rsa.crackPrivateKey(igelPub)
console.log("priv key:", igelPriv)
let igelDec = rsa.decrypt(igelEnc, igelPriv)
console.log("dec:", igelDec)



console.log("7.29")
let hasePub = new rsa.PublicKey(37, 1219)
let haseEnc = rsa.encrypt("hase", hasePub)
let hasePriv = rsa.crackPrivateKey(hasePub)
console.log(rsa.decrypt(haseEnc, hasePriv))

console.log("7.35")
let sternPub = new rsa.PublicKey(37, 2537)
let sternEnc = rsa.encrypt("sternschnuppe", sternPub)
console.log(sternEnc)

// let sternPriv = rsa.crackPrivateKey(sternPub)
// console.log(rsa.decrypt(sternEnc, sternPriv))


console.log("7.36")
let kontaktPub = new rsa.PublicKey(29, 1817)
let kontaktPriv = rsa.crackPrivateKey(kontaktPub)
console.log(kontaktPriv)
let kontaktEnc = rsa.decrypt([1751, 1384, 999, 1070], kontaktPriv)
console.log(kontaktEnc)


console.log("Selfcheck")
let hitPub = new rsa.PublicKey(27, 667)
let hitBlocks = rsa.toBlocks("hit")
console.log(hitBlocks)
let hitEnc = rsa.encrypt(hitBlocks, hitPub)
console.log(hitEnc)


