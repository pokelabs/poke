import { wordEnAllStore } from '@/store/wordEnAll.store'
import { wordEnQuizStore } from '@/store/wordEnQuiz.store'
import { wordRuAllStore } from '@/store/wordRuAll.store'
import { wordRuQuizStore } from '@/store/wordRuQuiz.store'
import { actualWordStore } from '@/store/actualWord.store'
import { Controller } from '@/types'
import { createController } from '@/common/createController'
import { Word } from '@/models/Word.model'
import { exists } from '@/utils/exists'
import { selectRandom } from '@/utils/helpers/selectRandom'
import { DateTime } from 'luxon'

const createRandomWord = (lang: 'ru' | 'en') =>
  actualWordStore.create({
    ...selectRandom(
      (lang === 'en' ? wordEnQuizStore : wordRuQuizStore).dumpToArray(),
    ),
    date: DateTime.now().toFormat('yyyy-MM-dd'),
  })

export const registerWordController: Controller = createController({
  scope: 'word',
  requireAuth: false,
  transport: ['rest', 'ws'],
  register: addListener => {
    addListener<{ word: string; lang: 'ru' | 'en' }>(
      'check',
      (resolve, reject, context) =>
        ({ word, lang }) => {
          if (!['en', 'ru'].includes(lang)) reject({ reason: 'UNKNOWN_LANG' })
          const result = (lang === 'en' ? wordEnAllStore : wordRuAllStore).find(
            item => item.word === word,
          )
          resolve({ word, language: lang, correct: exists(result) })
        },
      ['rest'],
    )

    addListener<{ lang: 'en' | 'ru' }>(
      'get',
      (resolve, reject, context) =>
        ({ lang }) => {
          if (!['en', 'ru'].includes(lang)) reject({ reason: 'UNKNOWN_LANG' })
          let wotd = actualWordStore.find(
            item =>
              item.date === DateTime.now().toFormat('yyyy-MM-dd') &&
              item.lang === lang,
          )
          if (!exists(wotd)) {
            wotd = createRandomWord(lang)
          }
          resolve({
            word: wotd.word,
            lang: wotd.lang,
            timeToNext: DateTime.now()
              .plus({ day: 1 })
              .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              .toUnixInteger(),
          })
        },
    )

    addListener('renew', (resolve, reject, context) => () => {
      const oldIds = actualWordStore.findAllIds(
        item => item.date === DateTime.now().toFormat('yyyy-MM-dd'),
      )
      oldIds.forEach(id => actualWordStore.delete(id))
      const newEnWord = createRandomWord('en')
      const newRuWord = createRandomWord('ru')
      resolve({ words: [newEnWord, newRuWord] })
    })
  },
})
