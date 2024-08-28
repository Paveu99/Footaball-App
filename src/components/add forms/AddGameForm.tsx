import { FormEvent, useEffect, useState } from "react"
import { GameDto, Team } from "../../utils/types"
import { FormChangeEvent, useForm } from "../hooks/useForm"
import "../../styles/AddForm.scss"
import { SubmitButton } from "../buttons/SubmitButton"
import infoSign from "../../styles/images/info.png"
import { useGetTeamsQuery } from "../queries/teams/useGetTeamsQuery"
import { usePostGamesMutation } from "../queries/games/usePostGamesMutation"
import { useBatchEditTeamsMutation } from "../queries/teams/useEditBatchTeamsMutation"
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

export const AddGameForm = () => {
  const {
    data: teamsData,
    error: teamsError,
    isLoading: loadingTeams,
  } = useGetTeamsQuery()
  const {
    mutate,
    data: game,
    isPending,
    error,
    isSuccess,
  } = usePostGamesMutation()
  const { mutate: mutateTeams } = useBatchEditTeamsMutation()

  const [correctDate, setCorrectDate] = useState<boolean>(false)
  const [correctName, setCorrectName] = useState<boolean>(false)
  const [correctPlace, setCorrectPlace] = useState<boolean>(false)
  const [correctTime, setCorrectTime] = useState<boolean>(false)
  const [correctTeamA, setCorrectTeamA] = useState<boolean>(false)
  const [correctTeamB, setCorrectTeamB] = useState<boolean>(false)
  const [showEditMessage, setShowEditMessage] = useState<boolean>(false)
  const [unlockButton, setUnlockButton] = useState<boolean>(false)
  const [selectedTeams, setSelectedTeams] = useState<{
    team_a: Team | undefined
    team_b: Team | undefined
  }>({
    team_a: undefined,
    team_b: undefined,
  })

  const [form, handleChange, clear] = useForm<GameDto>({
    game_date: "",
    game_name: "",
    game_place: "",
    game_time: 0,
    team_a: "",
    team_b: "",
    team_a_goals: 0,
    team_b_goals: 0,
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      if (selectedTeams.team_a && selectedTeams.team_b) {
        setSelectedTeams({
          team_a: {
            ...selectedTeams.team_a,
            total_goals: selectedTeams.team_a?.total_goals + form.team_a_goals,
          },
          team_b: {
            ...selectedTeams.team_b,
            total_goals: selectedTeams.team_b?.total_goals + form.team_b_goals,
          },
        })
        mutate(form)
      }
    } catch (e) {
      return <p>Both teams must be chosen!!!</p>
    }
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
    if (
      isSuccess &&
      !isPending &&
      game &&
      selectedTeams.team_a &&
      selectedTeams.team_b
    ) {
      const teamsToUpdate = [selectedTeams.team_a, selectedTeams.team_b]
      mutateTeams(teamsToUpdate)
      clear()
      setCorrectDate(false)
      setCorrectName(false)
      setCorrectPlace(false)
      setCorrectTime(false)
      setCorrectTeamA(false)
      setCorrectTeamB(false)
      setShowEditMessage(true)
      setTimeout(() => {
        setShowEditMessage(false)
      }, 2000)
    }
  }, [isSuccess])

  if (teamsError) return <p>Error while loading teams</p>
  if (loadingTeams) return <p>Loading form...</p>
  if (error) return <p>Couldn't add the game. Try again!</p>

  return (
    <form onSubmit={handleSubmit}>
      {showEditMessage && <Confirmation>Game was created</Confirmation>}
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
          <img className="info-button" src={infoSign} title="No date chosen!" />
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
          <img className="info-button" src={infoSign} title="Choose a team!" />
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
          <img className="info-button" src={infoSign} title="Choose a team!" />
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
      <SubmitButton view="SUBMIT" disabled={!unlockButton} />
    </form>
  )
}
