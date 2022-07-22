import { useTable } from '@/store/store'
import { Word, primaryKey } from '@/models/Word.model'
import { PrimaryKeyFillStrategy } from '@/base/types'
import { logEvent } from '@/utils/logEvent'
import enQuiz from '@/assets/en/enQuiz.json'

export const wordEnQuizStore = useTable<Word, typeof primaryKey>(
  'wordEnQuiz',
  primaryKey,
  { pkStrategy: PrimaryKeyFillStrategy.AutoIncrement },
)

logEvent('Loading QUIZ English Dictionary...')
enQuiz
  .map((v, i) => ({ [primaryKey]: i, lang: 'en', word: v } as Word))
  .forEach(v => wordEnQuizStore.insert(v.id, v))
logEvent('QUIZ English Dictionary loaded.')

export default wordEnQuizStore
