"use client"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function Updates() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        alert("NIGGA")
        toast({
          description: "Please donot leave out an empty query",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
