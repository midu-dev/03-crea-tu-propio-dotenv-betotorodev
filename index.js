const fs = require('node:fs')
const { join } = require('node:path')

// reference: https://www.npmjs.com/package/dotenv

function config (options = {}) {
  let data
  const path = options.path ?? join(__dirname, '.env')
  try {
    data = fs.readFileSync(path)
  } catch {
    return
  }
  if (!data) return
  const formatedData = data.toString('utf8')
  const listOfVaraibles = formatedData.split('\n')

  listOfVaraibles.forEach((item, index) => {
    let itemString
    if (item.includes('"')) {
      const startIndex = item.indexOf('"') + 1
      const endIndex = item.lastIndexOf('"')
      const result = item.substring(startIndex, endIndex)

      itemString = result
    } else {
      const startIndex = item.indexOf('=') + 1
      const result = item.slice(startIndex)

      itemString = result
    }

    index === 0
      ? (process.env.PORT = itemString)
      : (process.env.TOKEN = itemString)
  })

  console.log(process.env.PORT, process.env.TOKEN)
}

fs.writeFileSync('.env', 'PORT=3000\nTOKEN="123abc"')

config()

module.exports = { config }
