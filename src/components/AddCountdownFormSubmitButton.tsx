"use client"
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Loading from "./Loading";

const FormLoading = () => {
  const { pending } = useFormStatus()

  if (!pending) return null

  return <Loading />
}

export default FormLoading
