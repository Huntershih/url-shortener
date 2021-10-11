const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCases = upperCases.toLowerCase()
const numbers = '1234567890'
const letters = [...upperCases, ...lowerCases, ...numbers]

const generateCode = (length) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * letters.length)
    code += letters[index]
  }
  return code
}

module.exports = generateCode