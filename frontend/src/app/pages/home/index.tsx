import { getHello } from "@/app/api/requests/hello";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [label, setLabel] = useState("No connection. :(")
  const router = useRouter()

  useEffect(() => {
    getHello().then((res) => {
      setLabel(res)
    })
  }, [])


  const red = () => {
    router.push('/home2/home-page')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a onClick={red}>{label}</a>
    </div>
  );
}
