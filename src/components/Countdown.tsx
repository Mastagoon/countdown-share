'use client'
import { addZeroToTheLeft, dateToHoursMinutseSeconds } from "@/utils"
import { Countdown } from "@prisma/client"
import { useEffect, useState } from "react"
import ShareModal from "./ShareModal"
import { useRouter } from "next/navigation"
import Loading from "./Loading"

const CountdownComponent: React.FC<{ countdown: Countdown }> = ({ countdown }) => {
  const [showShareModal, setShowShareModal] = useState(false)

  const [days, setDays] = useState<string>()
  const [hours, setHours] = useState<string>()
  const [minutes, setMinutes] = useState<string>()
  const [seconds, setSeconds] = useState<string>()
  const [countdownDate, _] = useState(new Date(countdown.date).getTime())
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
  const router = useRouter()

  const redirect = (url: string | null) => {
    if (url) {
      setIsRedirecting(true)
      setTimeout(() => {
        console.log("Redirecting....")
        router.push(url)
      }, 500)
    }
  }

  const getTick = () => {
    const now = new Date().getTime()
    const distance = countdownDate - now
    if (distance > 0) {
      const { days, hours, minutes, seconds } = dateToHoursMinutseSeconds(distance)
      setDays(addZeroToTheLeft(days))
      setHours(addZeroToTheLeft(hours))
      setMinutes(addZeroToTheLeft(minutes))
      setSeconds(addZeroToTheLeft(seconds))
    } else {
      redirect(countdown.redirection_url)
    }
  }

  useEffect(() => {
    if (countdownDate - new Date().getTime() > 0) {
      getTick()
      let interval = setInterval(getTick, 1000)
      return () => clearInterval(interval)
    } else {
      redirect(countdown.redirection_url)
    }
  }, [])

  return <div className="flex flex-col justify-center items-center h-screen w-screen">
    {isRedirecting && <Loading t={`Redirecting to ${countdown.redirection_url}`} />}
    <h1 className="text-3xl">{countdown.title}</h1>
    <div className="flex  justify-center items-center">
      {seconds ?
        <div className="relative">
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
          <button
            onClick={() => setShowShareModal(true)}
            className="
            absolute border-2 px-8 py-1 rounded-md hover:opacity-80 hover:bg-white hover:text-black transition-all cursor-pointer
            left-1/2 -translate-x-1/2 translate-y-1/2
            ">Share</button>
        </div>
        :
        countdownDate - new Date().getTime() < 0 ?
          <h4>This countdown expired on {new Date(countdownDate).toISOString().split("T")[0] + " at " + new Date(countdownDate).toLocaleTimeString()}</h4>
          :
          null
      }
    </div>
    <ShareModal isOpen={showShareModal} setIsOpen={setShowShareModal} url={`${typeof window === 'undefined' ? '#' : `${window.location.protocol}//${window.location.hostname}/timers/${countdown.id}`}`} />
  </div>

}

export default CountdownComponent
