import fs from 'fs'
import path from 'path'

export function readFile(file) {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'src', 'db', file))

    return JSON.parse(data)
  } catch (error) {
    console.log(error.message)
  }
}

export function writeFile(file, data) {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), 'src', 'db', file),
      JSON.stringify(data, null, 4)
    )
  } catch (error) {
    console.log(error.message)
  }
}
