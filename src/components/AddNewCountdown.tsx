import { PrismaClient } from "@prisma/client"

const AddNewCountdownForm = () => {
  const addCountdown = async (d: FormData) => {
    'use server'
    const title = d.get("title")
    const date = d.get("date")
    if (!title || !date) return
    const client = new PrismaClient()
    const data = {
      title: title.toString(),
      date: date.toString()
    }
    const result = await client.countdown.create({ data })
    console.log(result)
  }

  return <form action={addCountdown} className="flex flex-col gap-3">
    <div className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" className="py-1 rounded-md border-2 border-slate-500 outline-none text-black px-2" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="date">Date</label>
      <input min={new Date().toISOString().split("T")[0] + "T00:00:00.000"} type="datetime-local" name="date" className="py-1 rounded-md border-2 border-slate-500 outline-none text-black px-2" />
    </div>
    <input type="submit" title="Submit not query, well fuck you" className="border-2 rounded-md py-2 cursor-pointer transition-all
      hover:bg-white hover:text-black
      " />
  </form>
}

export default AddNewCountdownForm
