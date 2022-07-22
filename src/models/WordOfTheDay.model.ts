export type WordOfTheDay = {
  word: string
  lang: 'ru' | 'en'
  date: string // YYYY-MM-dd
  id: string
}

export const primaryKey = 'id'
