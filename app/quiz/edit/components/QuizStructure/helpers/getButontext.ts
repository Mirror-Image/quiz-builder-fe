export const getButontext = (id: string) => {
  switch (id) {
    case '1':
      return 'Single Choise Question'
    case '2':
      return 'Multiple Choise Question'
    case '3':
      return 'Text Question'
    default:
      return null
  }
}
