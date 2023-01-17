import produce from 'immer'
import { Database } from '@/services/database'

export interface StoreOption {
  name: string
  database: Database
}

export default class Store<T> {
  private name: string
  private db: Database

  constructor(options: StoreOption) {
    this.name = options.name
    this.db = options.database
  }

  get() {
    const { name, db } = this
    return db.getPath(name) as T
  }

  set(data: T) {
    const { name, db } = this
    db.setPath(name, data)
  }

  safeSet(fn: (data: T) => void) {
    this.set(produce(this.get(), fn))
  }
}
