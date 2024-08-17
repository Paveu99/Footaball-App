import { ChangeEvent, useRef, useState } from "react"

type FormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

type UseFormReturn<T> = [
  T,
  (e: FormChangeEvent) => void,
  () => void,
  (newState: T) => void,
]

export const useForm = <T>(initialValues: T): UseFormReturn<T> => {
  const [formState, setFormState] = useState<T>(initialValues)
  const form = useRef(initialValues)

  const getValue = (target: FormChangeEvent["target"]) => {
    if (target.type === "number") {
      if (target.value === "") {
        return ""
      } else {
        return Number(target.value)
      }
    }
    return target.value
  }

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value === "" ? "" : getValue(e.target),
    }))
  }

  const clearForm = () => {
    setFormState(form.current)
  }

  const updateFormState = (newState: T) => {
    setFormState(newState)
  }

  return [formState, handleChange, clearForm, updateFormState]
}
