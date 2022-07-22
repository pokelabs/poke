export const selectRandom = <T>(listOfOptions: T[]): T =>
  listOfOptions[Math.floor(Math.random() * listOfOptions.length)]
