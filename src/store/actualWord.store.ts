import { useTable } from '@/store/store'
import { WordOfTheDay, primaryKey } from '@/models/WordOfTheDay.model'
import { PrimaryKeyFillStrategy } from '@/base/types'

export const actualWordStore = useTable<WordOfTheDay, typeof primaryKey>(
  'actualWord',
  primaryKey,
  { pkStrategy: PrimaryKeyFillStrategy.Hash },
)

export default actualWordStore
