"use client"

import  React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [show, setShow] = React.useState(false)

    return (
      <div className="relative w-full">
        <Input
          {...props}
          ref={ref}
          type={show ? "text" : "password"}
          className="pr-10" 
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"
