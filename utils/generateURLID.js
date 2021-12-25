// a table includes 0~9, a~z & A~Z
const BASE_CHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//minimum of table
const MIN = 0

//maximum of table
const MAX = 61

function generateURLID(length) {
  let result = ''

  for(let i=0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    result += BASE_CHAR[randomIndex]
  }
  return result
}

module.exports = generateURLID