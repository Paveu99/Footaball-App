export type Views = "a" | "b" | "c" | "d"

export type Theme = "light" | "dark"

export type Player = {
  id: string
  player_name: string
  player_surname: string
  teamId?: string
}

export type PlayerDto = {
  player_name: string
  player_surname: string
  teamId?: string
}

export type Team = {
  id: string
  team_name: string
  team_year: string | number
  team_location: string
  total_goals: number
}

export type TeamDto = {
  team_name: string
  team_year: string | number
  team_location: string
  total_goals: number
}

export type Game = {
  id: string
  game_date: string
  game_name: string
  game_place: string
  game_time: number
  game_result: string
  team_a: string
  team_b: string
  team_a_goals: number
  team_b_goals: number
}

export type GameDto = {
  game_date: string
  game_name: string
  game_place: string
  game_time: number
  game_result: string
  team_a: string
  team_b: string
  team_a_goals: number
  team_b_goals: number
}
