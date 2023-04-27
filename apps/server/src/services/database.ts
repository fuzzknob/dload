import fs from 'fs-extra'
import { get, set, throttle } from 'lodash'

const DATABASE_PATH = './data/database.json'

type DatabaseData = Record<string | number, string | number | [] | object>

const throttledUpdate = throttle(
  (data: DatabaseData) => {
    return fs.writeJson(DATABASE_PATH, data)
  },
  1000,
  { leading: false, trailing: true },
)

export class Database {
  private data: DatabaseData = {}
  private isLoaded = false

  async init() {
    try {
      await fs.ensureFile(DATABASE_PATH)
      let data: DatabaseData | null = await fs.readJSON(DATABASE_PATH, {
        throws: false,
      })
      if (!data) {
        data = { version: '1.0' }
      }
      await fs.writeJson(DATABASE_PATH, data)
      this.data = data
      this.isLoaded = true
    } catch (e) {
      const error = e as Error
      console.log(error.message)
      // console.log(e)
    }
  }

  getPath(path: string) {
    this.checkDatabaseLoaded()
    return get(this.data, path)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPath(path: string, data: any) {
    this.checkDatabaseLoaded()
    set(this.data, path, data)
    this.updateStorage()?.catch((error) => console.log(error))
  }

  getAll() {
    this.checkDatabaseLoaded()
    return this.data
  }

  setAll(data: DatabaseData) {
    this.checkDatabaseLoaded()
    this.data = data
    this.updateStorage()?.catch((error) => console.log(error))
  }

  updateStorage() {
    if (!this.isLoaded) return
    return throttledUpdate(this.data)
  }

  private checkDatabaseLoaded() {
    if (!this.isLoaded) {
      console.error('Database is not loaded')
    }
  }
}

export default new Database()
