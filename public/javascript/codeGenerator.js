const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCases = upperCases.toLowerCase()
const letters = [...upperCases, ...lowerCases]

function generateCode(length) {
  let code = []
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * letters.length)
    code.push(letters[index])
  }
  return code.join('').toString()
}

module.exports = generateCode