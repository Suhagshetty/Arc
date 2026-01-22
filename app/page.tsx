"use client"
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Arc(){
  const {setTheme} = useTheme()
  return(
    <div>
      <h2 className="text-3xl font-extrabold text-red-400 text-center">Welcome to Arc</h2>
      <Button>Hello</Button>
      <Button onClick={()=>setTheme("light")}>Light Mode</Button>
      <Button onClick={()=>setTheme("dark")}>Dark Mode</Button>
    </div>
  )
}