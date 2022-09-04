import { platform } from 'node:os'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'

const aria2cPath = resolve(__dirname, `./${platform()}/aria2c`)

const ariaInstance = spawn(
  aria2cPath,
  ['--enable-rpc', '--rpc-listen-all=true', '--rpc-allow-origin-all'],
  {
    windowsHide: false,
    stdio: 'pipe',
  },
)

ariaInstance.on('spawn', () => console.log('Started Aria2'))

ariaInstance.stdout.on('data', (data: string) => {
  console.log(data.toString())
})

ariaInstance.stderr.on('data', (data: string) => {
  console.log(data.toString())
})
