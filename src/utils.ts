export const dateToHoursMinutseSeconds = (date: number) => {
  const days = Math.floor(date / (1000 * 60 * 60 * 24)).toString()
  const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString()
  const minutes = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60)).toString()
  const seconds = Math.floor((date % (1000 * 60)) / 1000).toString()

  return { days, hours, minutes, seconds }
}

export const addZeroToTheLeft = (number: string): string => Number(number) < 10 ? `0${number}` : number
