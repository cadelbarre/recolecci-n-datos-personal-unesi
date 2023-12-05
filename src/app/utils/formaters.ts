import capitalize from 'just-capitalize'

export const capitalizeWords = (words: string): string => {
  const formatted = words.trim().split(' ').reduce((acc, el) => {
    acc += capitalize(el) + ' '
    return acc
  }, '').trim()

  return formatted
}
