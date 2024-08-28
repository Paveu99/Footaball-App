import { FormEvent, useEffect, useState } from "react"
import { Game, Team, TeamToEdit } from "../../utils/types"
import { FormChangeEvent, useForm } from "../hooks/useForm"
import { SubmitButton } from "../buttons/SubmitButton"
import infoSign from "../../styles/images/info.png"
import { Button } from "../buttons/Button"
import compare from "lodash"
import styled from "styled-components"
import { useEditGamesMutation } from "../queries/games/useEditGamesMutation"
import { useGetTeamsQuery } from "../queries/teams/useGetTeamsQuery"
import { useBatchEditTeamsMutation } from "../queries/teams/useEditBatchTeamsMutation"
import { useDeleteGamesMutation } from "../queries/games/useDeleteGamesMutation"

type Props = {
  game: Game
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

export const EditGameForm = ({ game, clearForm }: Props) => {
  const {
    data: teamsData,
    error: teamsError,
    isLoading: loadingTeams,
  } = useGetTeamsQuery()
  const { isPending, mutate, isSuccess } = useEditGamesMutation()
  const {
    mutate: mutateTeams,
    error: errorEditingTeams,
    isSuccess: editingBatchIsSuccess,
  } = useBatchEditTeamsMutation()
  const {
    error: deleteError,
    mutate: deleteMutate,
    isSuccess: deleteIsSuccess,
  } = useDeleteGamesMutation()

  const [showEditMessage, setShowEditMessage] = useState<boolean>(false)
  const [initialState, setIinitialState] = useState<Game>(game)
  const [confirmDeleting, setConfirmDeleting] = useState<boolean>(false)

  const [correctDate, setCorrectDate] = useState<boolean>(false)
  const [correctName, setCorrectName] = useState<boolean>(false)
  const [correctPlace, setCorrectPlace] = useState<boolean>(false)
  const [correctTime, setCorrectTime] = useState<boolean>(false)
  const [correctTeamA, setCorrectTeamA] = useState<boolean>(false)
  const [correctTeamB, setCorrectTeamB] = useState<boolean>(false)
  const [unlockButton, setUnlockButton] = useState<boolean>(false)
  const [selectedTeams, setSelectedTeams] = useState<{
    team_a: TeamToEdit | undefined
    team_b: TeamToEdit | undefined
  }>({
    team_a: {
      id: initialState.team_a,
      total_goals: initialState.team_a_goals,
    },
    team_b: {
      id: initialState.team_b,
      total_goals: initialState.team_b_goals,
    },
  })

  const [form, handleChange, clear, update] = useForm<Game>(game)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  const handleTeamChange = (e: FormChangeEvent) => {
    const { name, value } = e.target
    const selectedTeam = teamsData?.find((team) => team.id === value)
    if (name === "team_a") {
      setSelectedTeams((prevState) => ({
        ...prevState,
        team_a: selectedTeam,
      }))
    } else if (name === "team_b") {
      setSelectedTeams((prevState) => ({
        ...prevState,
        team_b: selectedTeam,
      }))
    }
    handleChange(e)
  }

  const handleDelete = (id: string) => {
    try {
      const teamA = teamsData?.find((el) => el.id === initialState.team_a)
      const teamB = teamsData?.find((el) => el.id === initialState.team_b)
      if (teamA && teamB) {
        setSelectedTeams({
          team_a: {
            id: initialState.team_a,
            total_goals: teamA?.total_goals - initialState.team_a_goals,
          },
          team_b: {
            id: initialState.team_b,
            total_goals: teamB?.total_goals - initialState.team_b_goals,
          },
        })
        deleteMutate(id)
      }
    } catch (e) {
      return <p>Game couldn't be deleted!!!</p>
    }
  }

  const handleDeletingGame = () => {
    const teamA = selectedTeams.team_a
    const teamB = selectedTeams.team_b
    if (!isPending && game && teamA && teamB) {
      const teamsToUpdate = [teamA, teamB]
      mutateTeams(teamsToUpdate)
      setIinitialState(form)
      clear()
      setTimeout(() => {
        clearForm()
      }, 2000)
    }
  }

  useEffect(() => {
    if (deleteIsSuccess) {
      handleDeletingGame()
    }
  }, [deleteIsSuccess])

  useEffect(() => {
    update(initialState)
  }, [confirmDeleting])

  useEffect(() => {
    setCorrectDate(form.game_date.trim().length > 2)
    setCorrectName(form.game_name.trim().length > 2)
    setCorrectPlace(form.game_place.trim().length > 2)
    setCorrectTime(form.game_time > 0)
    setCorrectTeamA(form.team_a.trim().length > 0)
    setCorrectTeamB(form.team_b.trim().length > 0)
  }, [form])

  useEffect(() => {
    setUnlockButton(correctName && correctTime && correctDate && correctPlace)
  }, [correctName, correctTime, correctDate, correctPlace])

  useEffect(() => {
    setIinitialState(game)
    setConfirmDeleting(false)
    update(game)
  }, [game])

  useEffect(() => {
    const updateTeamGoals = (
      initialTeamId: string,
      newTeamId: string,
      initialGoals: number,
      newGoals: number,
    ) => {
      const initialTeam = teamsData?.find((el) => el.id === initialTeamId)
      const newTeam = teamsData?.find((el) => el.id === newTeamId)

      if (compare.isEqual(initialTeamId, newTeamId) && initialTeam) {
        return [
          {
            id: initialTeamId,
            total_goals: initialTeam?.total_goals + newGoals - initialGoals,
          },
        ]
      } else if (!compare.isEqual(initialTeamId, newTeamId) && initialTeam) {
        const oldTeamUpdate: TeamToEdit = {
          id: initialTeamId,
          total_goals: initialTeam?.total_goals - initialGoals,
        }
        const newTeamUpdate: TeamToEdit = {
          id: newTeamId,
          total_goals: newTeam ? newTeam.total_goals + newGoals : newGoals,
        }
        return [oldTeamUpdate, newTeamUpdate]
      } else if (newTeam) {
        return [
          {
            id: newTeamId,
            total_goals: newTeam.total_goals + newGoals,
          },
        ]
      }

      return []
    }

    if (isSuccess && !isPending && game) {
      const teamsToUpdate: TeamToEdit[] = [
        ...updateTeamGoals(
          initialState.team_a,
          form.team_a,
          initialState.team_a_goals,
          form.team_a_goals,
        ),
        ...updateTeamGoals(
          initialState.team_b,
          form.team_b,
          initialState.team_b_goals,
          form.team_b_goals,
        ),
      ]

      mutateTeams(teamsToUpdate)
      setIinitialState(form)
    }
  }, [isSuccess])

  useEffect(() => {
    if (editingBatchIsSuccess) {
      setShowEditMessage(true)
      setTimeout(() => {
        setShowEditMessage(false)
      }, 2000)
    }
  }, [editingBatchIsSuccess])

  if (teamsError) return <p>Error while loading teams</p>
  if (loadingTeams) return <p>Loading form...</p>
  if (errorEditingTeams)
    return <Confirmation>Couldn't edit the game. Try again!</Confirmation>
  if (deleteError)
    return (
      <Confirmation>Error while deleting the game. Try again!</Confirmation>
    )
  if (deleteIsSuccess) return <Confirmation>Game was deleted</Confirmation>

  return (
    <form onSubmit={handleSubmit}>
      {showEditMessage && <Confirmation>Game was edited</Confirmation>}
      <fieldset disabled={confirmDeleting} style={{ border: "none" }}>
        <div className="form-row">
          <label htmlFor="game_date">Date:</label>
          <input
            type="date"
            name="game_date"
            value={form.game_date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />
          {!correctDate && (
            <img
              className="info-button"
              src={infoSign}
              title="No date chosen!"
            />
          )}
        </div>
        <div className="form-row">
          <label htmlFor="game_name">Game name:</label>
          <input
            type="text"
            name="game_name"
            value={form.game_name}
            onChange={handleChange}
          />
          {!correctName && (
            <img
              className="info-button"
              src={infoSign}
              title="At least 3 characters!"
            />
          )}
        </div>
        <div className="form-row">
          <label htmlFor="game_place">Game location:</label>
          <input
            type="text"
            name="game_place"
            value={form.game_place}
            onChange={handleChange}
          />
          {!correctPlace && (
            <img
              className="info-button"
              src={infoSign}
              title="At least 3 characters!"
            />
          )}
        </div>
        <div className="form-row">
          <label htmlFor="game_time">Game time:</label>
          <input
            type="number"
            name="game_time"
            value={form.game_time}
            onChange={handleChange}
            min={0}
          />
          {!correctTime && (
            <img
              className="info-button"
              src={infoSign}
              title="Must be more than 0 minutes!"
            />
          )}
        </div>
        <div className="form-row">
          <label htmlFor="team_a">First team:</label>
          <select name="team_a" value={form.team_a} onChange={handleTeamChange}>
            <option value="">Select a team</option>
            {teamsData
              ?.filter((team) => team.id !== form.team_b)
              .map((team: Team) => (
                <option value={team.id} key={team.id}>
                  {team.team_name}
                </option>
              ))}
          </select>
          {!correctTeamA && (
            <img
              className="info-button"
              src={infoSign}
              title="Choose a team!"
            />
          )}
        </div>
        <div className="form-row">
          <label htmlFor="team_a_goals">First team score:</label>
          <input
            type="number"
            name="team_a_goals"
            value={form.team_a_goals}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div className="form-row">
          <label htmlFor="team_b">Second team:</label>
          <select name="team_b" value={form.team_b} onChange={handleTeamChange}>
            <option value="">Select a team</option>
            {teamsData
              ?.filter((team) => team.id !== form.team_a)
              .map((team: Team) => (
                <option value={team.id} key={team.id}>
                  {team.team_name}
                </option>
              ))}
          </select>
          {!correctTeamB && (
            <img
              className="info-button"
              src={infoSign}
              title="Choose a team!"
            />
          )}
        </div>
        <div className="form-row">
          <label htmlFor="team_b_goals">Second team score:</label>
          <input
            type="number"
            name="team_b_goals"
            value={form.team_b_goals}
            onChange={handleChange}
            min={0}
          />
        </div>
      </fieldset>
      <div style={{ display: "flex", gap: "10px" }}>
        {!compare.isEqual(initialState, form) && (
          <SubmitButton view="SUBMIT" disabled={!unlockButton} />
        )}
        <Button
          color="white"
          backgroundColor="red"
          view="DELETE GAME"
          onClick={() => setConfirmDeleting(true)}
        />
      </div>
      <div>
        {confirmDeleting && (
          <div>
            <p>Are you sure that you want to delete the game from databse?</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button view="Yes" onClick={() => handleDelete(game.id)} />
              <Button view="No" onClick={() => setConfirmDeleting(false)} />
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
