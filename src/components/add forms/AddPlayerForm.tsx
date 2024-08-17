import { FormEvent, useEffect, useState } from "react"
import { PlayerDto, Team } from "../../utils/types"
import { useForm } from "../hooks/useForm"
import { useGetTeamsQuery } from "../queries/teams/useGetTeamsQuery"
import { usePostPlayersMutation } from "../queries/players/usePostPlayersMutation"
import "../../styles/AddPlayerForm.scss"
import { SubmitButton } from "../buttons/SubmitButton"
import infoSign from "../../styles/images/info.png"

export const AddPlayerForm = () => {
  const { data: teamsData, error: teamsError, isLoading } = useGetTeamsQuery()
  const { error, isPending, mutate } = usePostPlayersMutation()
  const [correctName, setCorrectName] = useState<boolean>(false)
  const [correctSurname, setCorrectSurname] = useState<boolean>(false)
  const [unlockButton, setUnlockButton] = useState<boolean>(false)

  const [form, handleChange, clear] = useForm<PlayerDto>({
    player_name: "",
    player_surname: "",
    teamId: "",
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    mutate(form)
    clear()
    setCorrectName(false)
    setCorrectSurname(false)
    setUnlockButton(false)
  }

  useEffect(() => {
    if (form.player_name.trim().length > 2 && !/\d/.test(form.player_name)) {
      setCorrectName(true)
    } else {
      setCorrectName(false)
    }
    if (
      form.player_surname.trim().length > 2 &&
      !/\d/.test(form.player_surname)
    ) {
      setCorrectSurname(true)
    } else {
      setCorrectSurname(false)
    }
  }, [form])

  useEffect(() => {
    if (correctName && correctSurname) {
      setUnlockButton(true)
    } else {
      setUnlockButton(false)
    }
  }, [correctName, correctSurname])

  if (error) return <p>Error while adding player occured</p>
  if (isLoading) return <p>Loading add form...</p>
  if (isPending) return <p>Loading...</p>

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="player_name">Name:</label>
        <input
          type="text"
          name="player_name"
          value={form.player_name}
          onChange={handleChange}
        />
        {!correctName && (
          <img
            className="info-button"
            src={infoSign}
            title="At least 3 characters and no numbers"
          />
        )}
      </div>
      <div className="form-row">
        <label htmlFor="player_surname">Surname:</label>
        <input
          type="text"
          name="player_surname"
          value={form.player_surname}
          onChange={handleChange}
        />
        {!correctSurname && (
          <img
            className="info-button"
            src={infoSign}
            title="At least 3 characters and no numbers"
          />
        )}
      </div>
      <div className="form-row">
        <label htmlFor="teamId">Team:</label>
        <select name="teamId" value={form.teamId} onChange={handleChange}>
          <option value="">Select a team</option>
          {teamsData?.length === 0 || teamsError ? (
            <option>Loading...</option>
          ) : (
            teamsData?.map((team: Team) => (
              <option value={team.id} key={team.id}>
                {team.team_name}
              </option>
            ))
          )}
        </select>
      </div>
      <SubmitButton view="SUBMIT" disabled={!unlockButton} />
    </form>
  )
}
