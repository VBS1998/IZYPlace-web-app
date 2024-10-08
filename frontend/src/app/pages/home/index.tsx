import { getHello } from "@/app/api/requests/hello";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [label, setLabel] = useState("No connection. :(")

  useEffect(() => {
    getHello().then((res) => {
      setLabel(res)
    })
  }, [])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {label}
    </div>
  );
}
