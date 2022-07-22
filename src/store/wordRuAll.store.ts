import { useTable } from '@/store/store'
import { Word, primaryKey } from '@/models/Word.model'
import { PrimaryKeyFillStrategy } from '@/base/types'
import { logEvent } from '@/utils/logEvent'
import ruAll from '@/assets/ru/ruAll.json'

export const wordRuAllStore = useTable<Word, typeof primaryKey>(
  'wordRuAll',
  primaryKey,
  { pkStrategy: PrimaryKeyFillStrategy.AutoIncrement },
)

logEvent('Loading Russian Dictionary...')
ruAll
  .map((v, i) => ({ [primaryKey]: i, lang: 'ru', word: v } as Word))
  .forEach(v => wordRuAllStore.insert(v.id, v))
logEvent('Russian Dictionary loaded.')

export default wordRuAllStore
