import { ChangeEvent, useRef, useState } from "react"

type FormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

type UseFormReturn<T> = [T, (e: FormChangeEvent) => void, () => void]

export const useForm = <T>(initialValues: T): UseFormReturn<T> => {
  const [formState, setFormState] = useState<T>(initialValues)
  const form = useRef(initialValues)

  const getValue = (target: FormChangeEvent["target"]) => {
    if (target.type === "number") return Number(target.value)

    return target.value
  }

  const handleChange = (e: FormChangeEvent) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: getValue(e.target),
    }))
  }

  const clearForm = () => {
    setFormState(form.current)
  }

  return [formState, handleChange, clearForm]
}
