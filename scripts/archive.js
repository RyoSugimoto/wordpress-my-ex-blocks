const fs = require('fs')
const archiver = require('archiver')

const zipName = 'my-extra-blocks.zip'
const inputPattern = 'my-extra-blocks/**/*'

const archive = archiver('zip', {
  zlib: { level: 9 }
})

const output = fs.createWriteStream(zipName)

archive.pipe(output)

archive.glob(inputPattern, {})

archive.finalize()

output.on('close', () => {
  console.log(`${archive.pointer()}`)
})
