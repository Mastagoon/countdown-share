import CountdownComponent from "@/components/Countdown";
import { PrismaClient } from "@prisma/client";

interface CountdownPageProps {
  params: {
    id: string;
  }
}

const CountdownPage: React.FC<CountdownPageProps> = async ({ params: { id } }) => {
  const client = new PrismaClient()
  const result = await client.countdown.findFirst({ where: { id: Number(id) } })

  if (!result) return <h1>Not found.</h1>

  return <CountdownComponent countdown={result} />
}

export default CountdownPage
