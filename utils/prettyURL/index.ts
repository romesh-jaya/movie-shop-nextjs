const prettyUrl = (string: string) => {
  const URL = string
    .split(' ')
    .filter(el => el !== '-' && el !== ' ' && el)
    .join('-')
    .toLowerCase()
  return URL
}

export default prettyUrl
