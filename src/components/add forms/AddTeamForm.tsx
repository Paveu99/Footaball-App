import { FormEvent, useEffect, useState } from "react"
import { Player, TeamDto } from "../../utils/types"
import { useForm } from "../hooks/useForm"
import "../../styles/AddPlayerForm.scss"
import { SubmitButton } from "../buttons/SubmitButton"
import infoSign from "../../styles/images/info.png"
import { useGetPlayersQuery } from "../queries/players/useGetPlayersQuery"
import { usePostTeamsMutation } from "../queries/teams/usePostTeamsMutation"
import { useBatchEditPlayersMutation } from "../queries/players/useEditBatchPlayersMutation"
import { PlayersToAdd } from "./PlayersToAdd"
import styled from "styled-components"

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

export const AddTeamForm = () => {
  const { data: players, error: playersError, isLoading } = useGetPlayersQuery()
  const {
    data: team,
    error,
    isPending,
    mutate,
    isSuccess,
  } = usePostTeamsMutation()
  const {
    error: errorEditingPlayers,
    isPending: isPendingEditingPlayers,
    mutate: mutatePlayers,
    isSuccess: isSuccessEditingPlayers,
  } = useBatchEditPlayersMutation()

  const [correctName, setCorrectName] = useState<boolean>(false)
  const [showEditMessage, setShowEditMessage] = useState<boolean>(false)
  const [correctLocation, setCorrectLocation] = useState<boolean>(false)
  const [correctYear, setCorrectYear] = useState<boolean>(false)
  const [unlockButton, setUnlockButton] = useState<boolean>(false)

  const [availablePlayers, setAvailablePlayers] = useState<
    Player[] | undefined
  >(players)
  const [playersToAdd, setPlayersToAdd] = useState<Player[]>([])

  const [form, handleChange, clear] = useForm<TeamDto>({
    team_name: "",
    team_location: "",
    team_year: 1857,
    total_goals: 0,
  })

  const handlePlayerChosing = (e: FormEvent) => {
    const selectedPlayerId = (e.target as HTMLSelectElement).value
    const selectedPlayer = availablePlayers?.find(
      (player) => player.id === selectedPlayerId,
    )

    if (selectedPlayer) {
      setPlayersToAdd((prevPlayers) => [...prevPlayers, selectedPlayer])
      setAvailablePlayers((prevPlayers) =>
        prevPlayers?.filter((player) => player.id !== selectedPlayerId),
      )
    }
  }

  const undoPlayer = (playerId: string) => {
    const playerToUndo = playersToAdd.find((player) => player.id === playerId)

    if (playerToUndo) {
      setPlayersToAdd((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId),
      )
      setAvailablePlayers((prevPlayers) =>
        prevPlayers ? [...prevPlayers, playerToUndo] : [playerToUndo],
      )
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

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
    setUnlockButton(correctName && correctLocation && correctYear)
  }, [correctName, correctLocation, correctYear])

  useEffect(() => {
    setAvailablePlayers(players)
  }, [isSuccessEditingPlayers])

  useEffect(() => {
    if (!isPending && team && playersToAdd.length > 0) {
      const updatedPlayers = playersToAdd.map((player) => ({
        ...player,
        teamId: team.id,
      }))
      mutatePlayers(updatedPlayers)
      clear()
      setCorrectName(false)
      setCorrectLocation(false)
      setCorrectYear(false)
      setUnlockButton(false)
      setPlayersToAdd([])
      setShowEditMessage(true)
      setTimeout(() => {
        setShowEditMessage(false)
      }, 2000)
    }
  }, [isSuccess])

  if (error) return <p>Error while adding team occured</p>
  if (isLoading) return <p>Loading add form...</p>
  if (isPending) return <p>Loading...</p>

  if (errorEditingPlayers) return <p>Error while adding team occured</p>
  if (isPendingEditingPlayers) return <p>Loading...</p>

  return (
    <form onSubmit={handleSubmit}>
      {showEditMessage && <Confirmation>Team was created</Confirmation>}
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
          min={1857}
          max={new Date().toISOString().slice(0, 4)}
        />
        {!correctYear && (
          <img
            className="info-button"
            src={infoSign}
            title="Minimum value is 1857"
          />
        )}
      </div>
      {playersToAdd.length > 0 && (
        <div className="form-row">
          <div>
            <label htmlFor="">Players to add:</label>
            <ul>
              {playersToAdd.map((el) => (
                <li key={el.id}>
                  <PlayersToAdd player={el} undo={undoPlayer} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="form-row">
        <label htmlFor="playerId">Add Player:</label>
        <select name="playerId" onChange={handlePlayerChosing}>
          <option value="">Select a player</option>
          {players?.filter((el) => !el.teamId)?.length === 0 || playersError ? (
            <option>Loading...</option>
          ) : (
            players
              ?.filter((el) => !el.teamId)
              .map((player: Player) => (
                <option value={player.id} key={player.id}>
                  {player.player_name} {player.player_surname}
                </option>
              ))
          )}
        </select>
      </div>
      <SubmitButton view="SUBMIT" disabled={!unlockButton} />
    </form>
  )
}
