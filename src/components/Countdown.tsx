'use client'
import { addZeroToTheLeft, dateToHoursMinutseSeconds } from "@/utils"
import { Countdown } from "@prisma/client"
import { useEffect, useState } from "react"

const CountdownComponent: React.FC<{ countdown: Countdown }> = ({ countdown }) => {
  const [days, setDays] = useState<string>()
  const [hours, setHours] = useState<string>()
  const [minutes, setMinutes] = useState<string>()
  const [seconds, setSeconds] = useState<string>()
  const [countdownDate, _] = useState(new Date(countdown.date).getTime())

  const getTick = () => {
    const now = new Date().getTime()
    const distance = countdownDate - now
    if (distance > 0) {
      const { days, hours, minutes, seconds } = dateToHoursMinutseSeconds(distance)
      setDays(addZeroToTheLeft(days))
      setHours(addZeroToTheLeft(hours))
      setMinutes(addZeroToTheLeft(minutes))
      setSeconds(addZeroToTheLeft(seconds))
    }
  }

  useEffect(() => {
    if (countdownDate - new Date().getTime() > 0) {
      getTick()
      let interval = setInterval(getTick, 1000)
      return () => clearInterval(interval)
    } else {

    }
  }, [])


  return <div className="flex flex-col justify-center items-center h-screen w-screen">
    <h1 className="text-3xl">{countdown.title}</h1>
    <div className="flex  justify-center items-center">
      {seconds ?
        <div className="flex flex-row gap-20">
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
        :
        countdownDate - new Date().getTime() < 0 ?
          <h4>This countdown expired on {new Date(countdownDate).toISOString().split("T")[0] + " at " + new Date(countdownDate).toLocaleTimeString()}</h4>
          :
          null
      }
    </div>
  </div>

}

export default CountdownComponent
