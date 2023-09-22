import { platform, arch } from 'node:os'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import readline from 'node:readline'

const cwd = process.cwd()

const aria2cPath = resolve(cwd, `./${platform()}/${arch()}/aria2c`)
const aira2configPath = resolve(cwd, `./aria2.conf`)
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })


const ariaInstance = spawn(
  aria2cPath,
  [`--conf-path=${aira2configPath}`, '--disable-ipv6'],
  {
    windowsHide: false,
    stdio: 'pipe',
  },
)

ariaInstance.on('spawn', () => console.log('*** Started Aria2 ***'))

ariaInstance.stdout.on('data', (data: string) => {
  console.log(data.toString())
})

ariaInstance.stderr.on('data', (data: string) => {
  console.log(data.toString())
})

ariaInstance.on('exit', () => {
  console.log('\n*** Stopped Aria2 ***')
  process.exit(0)
})

rl.on('SIGINT', () => {
  console.log('\n*** Stopping Aria2 ***')
  ariaInstance.kill('SIGINT')
})

