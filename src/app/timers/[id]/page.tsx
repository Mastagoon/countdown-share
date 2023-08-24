import CountdownComponent from "@/components/Countdown";
import Loading from "@/components/Loading";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";

interface CountdownPageProps {
  params: {
    id: string;
  }
}

const CountdownPage: React.FC<CountdownPageProps> = async ({ params: { id } }) => {
  const client = new PrismaClient()
  const result = await client.countdown.findFirst({ where: { id: id } })

  if (!result) return <h1>Not found.</h1>

  return <Suspense fallback={<Loading />}>
    <CountdownComponent countdown={result} />
  </Suspense>
}

export default CountdownPage
