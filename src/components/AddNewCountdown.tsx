"use client"
import { addCountdown } from "@/actions"
import FormLoading from "./AddCountdownFormSubmitButton"
import { redirect } from "next/navigation"

const AddNewCountdownForm = () => {

  return <form action={async (d) => {
    const result = await addCountdown(d)
    if (result.isSuccess) redirect("/timers/" + result.result)
  }} className="flex flex-col gap-3">
    <FormLoading />
    <div className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" className="py-1 rounded-md border-2 border-slate-500 outline-none text-black px-2" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="url">Redirect Url</label>
      <input type="text" name="url" className="py-1 rounded-md border-2 border-slate-500 outline-none text-black px-2" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="date">Date</label>
      <input min={new Date().toISOString().split("T")[0] + "T00:00:00.000"} type="datetime-local" name="date" className="py-1 rounded-md border-2 border-slate-500 outline-none text-black px-2" />
    </div>

    <button type="submit" className="border-2 rounded-md py-2 cursor-pointer transition-all
      hover:bg-white hover:text-black
      " >Submit</button>
  </form>
}

export default AddNewCountdownForm
