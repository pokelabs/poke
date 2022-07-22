import { useTable } from '@/store/store'
import { Word, primaryKey } from '@/models/Word.model'
import { PrimaryKeyFillStrategy } from '@/base/types'
import enAll from '@/assets/en/enAll.json'
import { logEvent } from '@/utils/logEvent'

export const wordEnAllStore = useTable<Word, typeof primaryKey>(
  'wordEnAll',
  primaryKey,
  { pkStrategy: PrimaryKeyFillStrategy.AutoIncrement },
)

logEvent('Loading English Dictionary...')
enAll
  .map((v, i) => ({ [primaryKey]: i, lang: 'en', word: v } as Word))
  .forEach(v => wordEnAllStore.insert(v.id, v))
logEvent('English Dictionary loaded.')

export default wordEnAllStore
