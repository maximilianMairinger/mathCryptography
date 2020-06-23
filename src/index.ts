import caesar, { crackGermanCypherText, alphabetIndex } from "./caesar"
import * as rsa from "./rsa"


console.log("Caesar")
/*
 Bei der Caesar verschlüsselung werden einfach indices der buchstaben herausgefunden und diese dann um einen Wert (der schlüssel) verschoben.
 Zum entschlüsseln wird das gleiche in gegenrichtung gemacht.
*/

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
/*
 Bei der RSA verschlüsselung gibt es einen entschlüsselungs-schlüssel und einen verschlüsselungs-schlüssel (deswegen asymitrisch; caesar war symetrisch).
 Der verschlüsselungkey wird frei propagiert und heißt deswegen auch public key, der entschlüsselungskey wird geheimgehalten und deswegen heißt private key. Jeder client hat ein eigenes RSA-key Paar.
 Beim senden holt sich der sender von empfänger den public key verschlüsselt mit dem; der empfänger bekommt die nachricht und nur er kann sie dann wieder entschlüsseln.

 Mathematisch wird das möglich gemacht durch das produkt von zwei primzahlen (teil des public keys) welches schnell errechnet werden kann, jedoch nur noch sehr langsam wirder zerlegt werden kann.
 Das (primfaktor) zerlegen einer sehr hohen zahl ist so aufwändig das es mit heutiger technologie nur über viele jahre möglich wäre so einen key zu knacken. 
*/



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


