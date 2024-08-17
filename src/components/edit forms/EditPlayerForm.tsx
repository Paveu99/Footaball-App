import { FormEvent, useEffect, useState } from "react"
import { Player, Team } from "../../utils/types"
import { useForm } from "../hooks/useForm"
import { useDeletePlayersMutation } from "../queries/players/useDeletePlayersMutation"
import { useEditPlayersMutation } from "../queries/players/useEditPlayersMutation"
import { useGetTeamsQuery } from "../queries/teams/useGetTeamsQuery"
import { SubmitButton } from "../buttons/SubmitButton"
import infoSign from "../../styles/images/info.png"
import { Button } from "../buttons/Button"
import compare from "lodash"
import styled from "styled-components"

type Props = {
  player: Player
  clearForm: () => void
}

const Confirmation = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.mainScreenBgc};
  color: ${(props) => props.theme.colors.secondaryTextColor};
  margin-bottom: 10px;
  margin-right: 15px;
  padding: 10px;
  border-radius: 10px;
`

export const EditPlayerForm = ({ player, clearForm }: Props) => {
  const { error, isPending, mutate, isSuccess } = useEditPlayersMutation()
  const {
    error: deleteError,
    isPending: deleteIsPending,
    mutate: deleteMutate,
    isSuccess: deleteIsSuccess,
  } = useDeletePlayersMutation()
  const { data: teamsData, error: teamsError, isLoading } = useGetTeamsQuery()

  const [correctName, setCorrectName] = useState<boolean>(false)
  const [correctSurname, setCorrectSurname] = useState<boolean>(false)
  const [unlockButton, setUnlockButton] = useState<boolean>(false)
  const [showEditMessage, setShowEditMessage] = useState<boolean>(false)
  const [initialState, setIinitialState] = useState<Player>(player)
  const [confirmDeleting, setConfirmDeleting] = useState<boolean>(false)

  const [form, handleChange, clear, update] = useForm<Player>(player)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  const handleDelete = (id: string) => {
    deleteMutate(id)
    clear()
    setTimeout(() => {
      clearForm()
    }, 2000)
  }

  useEffect(() => {
    if (isSuccess) {
      setIinitialState(form)
      setShowEditMessage(true)
      setTimeout(() => {
        setShowEditMessage(false)
      }, 2000)
    }
  }, [isSuccess])

  useEffect(() => {
    setIinitialState(player)
    setConfirmDeleting(false)
    update({
      id: player?.id,
      player_name: player?.player_name,
      player_surname: player?.player_surname,
      teamId: player?.teamId,
    })
  }, [player])

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

  if (error) return <p>Error while editig player occured...</p>
  if (deleteError) return <p>Error while deleting player occured...</p>
  if (isLoading) return <p>Loading teams...</p>
  if (isPending) return <p>Loading...</p>
  if (deleteIsPending) return <p>Deleting player</p>
  if (deleteIsSuccess) return <p>Player was deleted</p>

  return (
    <form onSubmit={handleSubmit}>
      {showEditMessage && <Confirmation>Player was edited</Confirmation>}
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
      <div style={{ marginBottom: "15px" }} className="form-row">
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
      <div style={{ display: "flex", gap: "10px" }}>
        {!compare.isEqual(initialState, form) && (
          <SubmitButton view="SUBMIT" disabled={!unlockButton} />
        )}
        {!initialState.teamId && (
          <Button view="DELETE" onClick={() => setConfirmDeleting(true)} />
        )}
      </div>
      <div>
        {confirmDeleting && (
          <div>
            <p>Are you sure that you want to delete a player from databse?</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button view="Yes" onClick={() => handleDelete(player.id)} />
              <Button view="No" onClick={() => setConfirmDeleting(false)} />
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
