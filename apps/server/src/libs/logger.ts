/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk'

export function log(...parameters: any[]) {
  console.log(chalk.whiteBright(parameters))
}

export function info(...parameters: any[]) {
  console.log(chalk.blueBright(parameters))
}

export function error(...parameters: any[]) {
  console.log(chalk.redBright(parameters))
}
