import { FormEvent, useEffect, useState } from "react"
import { Player, Team } from "../../utils/types"
import { useForm } from "../hooks/useForm"
import { SubmitButton } from "../buttons/SubmitButton"
import infoSign from "../../styles/images/info.png"
import { Button } from "../buttons/Button"
import compare from "lodash"
import styled from "styled-components"
import { useEditTeamsMutation } from "../queries/teams/useEditTeamsMutation"
import { useGetPlayersFromTeamQuery } from "../queries/players/useGetPlayersFromTeamQuery"
import { useBatchEditPlayersMutation } from "../queries/players/useEditBatchPlayersMutation"
import { useDeleteTeamsMutation } from "../queries/teams/useDeleteTeamsMutation"
import { useGetGamesOfCertainTeamQuery } from "../queries/games/useGetGamesOfCertainTeamQuery"
import { PlayersToAdd } from "../add forms/PlayersToAdd"

type Props = {
  team: Team
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

export const EditTeamForm = ({ team, clearForm }: Props) => {
  const { error, isPending, mutate, isSuccess } = useEditTeamsMutation()
  const {
    error: deleteError,
    isPending: deleteIsPending,
    mutate: deleteMutate,
    isSuccess: deleteIsSuccess,
  } = useDeleteTeamsMutation()
  const { data: teamsData, error: teamsError } = useGetPlayersFromTeamQuery(
    team.id,
  )
  const { mutate: mutatePlayers } = useBatchEditPlayersMutation()
  const { data: gamesPlayed } = useGetGamesOfCertainTeamQuery(team.id)

  const [correctName, setCorrectName] = useState<boolean>(false)
  const [correctLocation, setCorrectLocation] = useState<boolean>(false)
  const [correctYear, setCorrectYear] = useState<boolean>(false)
  const [unlockButton, setUnlockButton] = useState<boolean>(false)
  const [showEditMessage, setShowEditMessage] = useState<boolean>(false)
  const [initialState, setIinitialState] = useState<Team>(team)
  const [confirmDeleting, setConfirmDeleting] = useState<boolean>(false)
  const [confirmDeletingPlayer, setConfirmDeletingPlayer] =
    useState<boolean>(false)

  const [availablePlayers, setAvailablePlayers] = useState<
    Player[] | undefined
  >(teamsData)
  const [playersToDelete, setPlayersToDelete] = useState<Player[]>([])

  const [form, handleChange, clear, update] = useForm<Team>(team)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  const handlePlayerChosing = (e: FormEvent) => {
    const selectedPlayerId = (e.target as HTMLSelectElement).value
    const selectedPlayer = availablePlayers?.find(
      (player) => player.id === selectedPlayerId,
    )

    if (selectedPlayer) {
      setPlayersToDelete((prevPlayers) => [...prevPlayers, selectedPlayer])
      setAvailablePlayers((prevPlayers) =>
        prevPlayers?.filter((player) => player.id !== selectedPlayerId),
      )
    }
  }

  const undoDeletingPlayer = (playerId: string) => {
    setConfirmDeletingPlayer(false)
    const playerToUndo = playersToDelete.find(
      (player) => player.id === playerId,
    )

    if (playerToUndo) {
      setPlayersToDelete((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId),
      )
      setAvailablePlayers((prevPlayers) =>
        prevPlayers ? [...prevPlayers, playerToUndo] : [playerToUndo],
      )
    }
  }

  const handleDeletingPlayer = () => {
    if (!isPending && team) {
      const allPlayers = [...(availablePlayers || []), ...playersToDelete]

      if (allPlayers.length > 0) {
        const updatedPlayers = allPlayers.map((player) => ({
          ...player,
          teamId: "",
        }))
        mutatePlayers(updatedPlayers)
      }
      setConfirmDeletingPlayer(false)
      setPlayersToDelete([])
    }
  }

  const handleEditingPlayer = () => {
    if (!isPending && team && playersToDelete.length > 0) {
      const updatedPlayers = playersToDelete.map((team) => ({
        ...team,
        teamId: "",
      }))
      mutatePlayers(updatedPlayers)
      setShowEditMessage(true)
      setTimeout(() => {
        setShowEditMessage(false)
        setConfirmDeletingPlayer(false)
      }, 2000)
      setPlayersToDelete([])
    }
  }

  const handleDelete = (id: string) => {
    deleteMutate(id)
    clear()
    setTimeout(() => {
      clearForm()
    }, 2000)
  }

  useEffect(() => {
    if (deleteIsSuccess) {
      handleDeletingPlayer()
    }
  }, [deleteIsSuccess])

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
    setIinitialState(team)
    setConfirmDeleting(false)
    update(team)
    setPlayersToDelete([])
  }, [team])

  useEffect(() => {
    setAvailablePlayers(teamsData)
  }, [teamsData])

  useEffect(() => {
    if (form.team_name.trim().length > 2 && !/\d/.test(form.team_name)) {
      setCorrectName(true)
    } else {
      setCorrectName(false)
    }
    if (
      form.team_location.trim().length > 2 &&
      !/\d/.test(form.team_location)
    ) {
      setCorrectLocation(true)
    } else {
      setCorrectLocation(false)
    }

    if (form.team_year !== "" && Number(form.team_year) >= 1857) {
      setCorrectYear(true)
    } else {
      setCorrectYear(false)
    }
  }, [form])

  useEffect(() => {
    if (correctName && correctLocation && correctYear) {
      setUnlockButton(true)
    } else {
      setUnlockButton(false)
    }
  }, [correctName, correctLocation, correctYear])

  useEffect(() => {
    update(initialState)
    setAvailablePlayers(teamsData)
    setPlayersToDelete([])
  }, [confirmDeleting])

  if (error) return <p>Error while editig player occured...</p>
  if (deleteError) return <p>Error while deleting player occured...</p>
  if (isPending) return <p>Loading...</p>
  if (deleteIsPending) return <p>Deleting team</p>
  if (deleteIsSuccess) return <Confirmation>Team was deleted</Confirmation>

  return (
    <form onSubmit={handleSubmit}>
      {showEditMessage && <Confirmation>Team was edited</Confirmation>}
      {showEditMessage && confirmDeletingPlayer && (
        <Confirmation>Players were deleted from the team </Confirmation>
      )}
      <fieldset disabled={confirmDeleting} style={{ border: "none" }}>
        <div className="form-row">
          <label htmlFor="team_name">Name:</label>
          <input
            type="text"
            name="team_name"
            value={form.team_name}
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
          <label htmlFor="team_location">Team's location:</label>
          <input
            type="text"
            name="team_location"
            value={form.team_location}
            onChange={handleChange}
          />
          {!correctLocation && (
            <img
              className="info-button"
              src={infoSign}
              title="At least 3 characters and no numbers"
            />
          )}
        </div>
        <div className="form-row">
          <label htmlFor="team_year">Established in:</label>
          <input
            type="number"
            name="team_year"
            value={form.team_year}
            onChange={handleChange}
            min={0}
          />
          {!correctYear && (
            <img
              className="info-button"
              src={infoSign}
              title="Minimum value is 1857"
            />
          )}
        </div>
        {playersToDelete.length > 0 && (
          <div className="form-row">
            <div>
              <label htmlFor="">Players to delete:</label>
              <ul>
                {playersToDelete.map((el) => (
                  <li key={el.id}>
                    <PlayersToAdd player={el} undo={undoDeletingPlayer} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="form-row">
          <label htmlFor="playerId">Available players:</label>
          <select name="playerId" onChange={handlePlayerChosing}>
            <option value="">Select a player</option>
            {availablePlayers?.length === 0 || teamsError ? (
              <option>No players in the team</option>
            ) : (
              availablePlayers?.map((player: Player) => (
                <option value={player.id} key={player.id}>
                  {player.player_name} {player.player_surname}
                </option>
              ))
            )}
          </select>
        </div>
      </fieldset>
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {!compare.isEqual(initialState, form) && (
            <SubmitButton view="UPDATE TEAM" disabled={!unlockButton} />
          )}
          {playersToDelete?.length > 0 && (
            <Button
              view="REMOVE PLAYERS"
              onClick={() => setConfirmDeletingPlayer(true)}
            />
          )}
        </div>
        {gamesPlayed?.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "5px",
            }}
          >
            <Button
              color="white"
              backgroundColor="red"
              view="DELETE TEAM"
              onClick={() => setConfirmDeleting(true)}
            />
            <small style={{ fontSize: "10px" }}>
              *team can be deleted, because it didn't play any games
            </small>
          </div>
        )}
      </div>
      <div>
        {confirmDeleting && (
          <div>
            <p>Are you sure that you want to delete the team from databse?</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button view="Yes" onClick={() => handleDelete(team.id)} />
              <Button view="No" onClick={() => setConfirmDeleting(false)} />
            </div>
          </div>
        )}
        {playersToDelete?.length > 0 && confirmDeletingPlayer && (
          <div>
            <p>Are you sure that you want to remove players from the team?</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button view="Yes" onClick={() => handleEditingPlayer()} />
              <Button
                view="No"
                onClick={() => setConfirmDeletingPlayer(false)}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
