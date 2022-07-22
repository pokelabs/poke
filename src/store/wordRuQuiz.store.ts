import { useTable } from '@/store/store'
import { Word, primaryKey } from '@/models/Word.model'
import { PrimaryKeyFillStrategy } from '@/base/types'
import { logEvent } from '@/utils/logEvent'
import ruQuiz from '@/assets/ru/ruQuiz.json'

export const wordRuQuizStore = useTable<Word, typeof primaryKey>(
  'wordRuQuiz',
  primaryKey,
  { pkStrategy: PrimaryKeyFillStrategy.AutoIncrement },
)

logEvent('Loading QUIZ Russian Dictionary...')
ruQuiz
  .map((v, i) => ({ [primaryKey]: i, lang: 'ru', word: v } as Word))
  .forEach(v => wordRuQuizStore.insert(v.id, v))
logEvent('QUIZ Russian Dictionary loaded.')

export default wordRuQuizStore
