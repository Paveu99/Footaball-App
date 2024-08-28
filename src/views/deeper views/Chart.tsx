import React, { useState, useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  format,
  subDays,
  subMonths,
  subYears,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { useGetGamesQuery } from "../../components/queries/games/useGetGamesQuery"
import { Game } from "../../utils/types"

type TimeFilter = "week" | "month" | "year"

const filterGamesByDate = (games: Game[], filter: TimeFilter): Game[] => {
  const now = new Date()
  let startDate: Date

  switch (filter) {
    case "week": {
      startDate = subDays(now, 7)
      break
    }
    case "month": {
      startDate = subMonths(now, 1)
      break
    }
    case "year": {
      startDate = subYears(now, 1)
      break
    }
    default:
      return games
  }

  return games.filter((game) => new Date(game.game_date) >= startDate)
}

const groupGamesByFilter = (games: Game[], filter: TimeFilter) => {
  const groupedGames: { [key: string]: number } = {}

  games.forEach((game) => {
    const gameDate = new Date(game.game_date)
    let key: string

    switch (filter) {
      case "week": {
        key = `${format(gameDate, "EEEE, dd.MM")}`
        break
      }
      case "month": {
        const weekStart = format(startOfWeek(gameDate), "d.MM")
        const weekEnd = format(endOfWeek(gameDate), "d.MM")
        key = `Week ${weekStart}-${weekEnd}`
        break
      }
      case "year": {
        key = `${format(gameDate, "MMMM yyyy")}`
        break
      }
      default: {
        key = format(gameDate, "yyyy-MM-dd")
      }
    }

    if (!groupedGames[key]) {
      groupedGames[key] = 0
    }
    groupedGames[key]++
  })

  return Object.keys(groupedGames).map((key) => ({
    key,
    count: groupedGames[key],
  }))
}

export const Chart: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week")

  const { data: games, isLoading, error: isError } = useGetGamesQuery()

  const filteredGames = useMemo(() => {
    if (games) {
      return filterGamesByDate(games, timeFilter)
    }
    return []
  }, [games, timeFilter])

  const histogramData = useMemo(
    () => groupGamesByFilter(filteredGames, timeFilter),
    [filteredGames, timeFilter],
  )

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div>
      <div>
        <label>Filter by:</label>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" minHeight={150}>
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="green" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
