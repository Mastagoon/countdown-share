'use client'
import { useEffect, useState } from "react"

export default function Home() {
  const [days, setDays] = useState("0")
  const [hours, setHours] = useState("0")
  const [minutes, setMinutes] = useState("0")
  const [seconds, setSeconds] = useState("0")
  const [countdownDate, setcoutndownDate] = useState(new Date("June 10, 2023 01:30:00").getTime())

  const dateToHoursMinutseSeconds = (date: number) => {
    const days = Math.floor(date / (1000 * 60 * 60 * 24))
    const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((date % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const addZeroToTheLeft = (number: number | string) => Number(number) < 10 ? `0${number}` : number


  useEffect(() => {
    if (countdownDate - new Date().getTime() > 0) {
      setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownDate - now
        const { days, hours, minutes, seconds } = dateToHoursMinutseSeconds(distance)
        setDays(addZeroToTheLeft(days))
        setHours(addZeroToTheLeft(hours))
        setMinutes(addZeroToTheLeft(minutes))
        setSeconds(addZeroToTheLeft(seconds))
      }, 1000)
    }
  }, [])

  return <div className="flex h-screen w-screen justify-center items-center">
    <div class="flex flex-row gap-20">
      <div className="text-8xl font-bold">
        {days}d
      </div>
      <div className="text-8xl font-bold">
        {hours}h
      </div>
      <div className="text-8xl font-bold">
        {minutes}m
      </div>
      <div className="text-8xl font-bold">
        {seconds}s
      </div>
    </div>
  </div>
}
