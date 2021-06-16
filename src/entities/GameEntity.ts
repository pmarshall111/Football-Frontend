export type GameEntity = {
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number,
    kickOff: string,
    prediction: PredictionEntity,
    bet: BetEntity,
    league: string
}

export type PredictionEntity = {
    predictionUsesLineups: true,
    predictions: HomeDrawAwayEntity,
    bookiePredictions: HomeDrawAwayEntity,
    bookieOdds: HomeDrawAwayEntity
}

export type BetEntity = {
    resultBetOn: number,
    stake: number,
    odds: number
}

export type HomeDrawAwayEntity = {
    home: number,
    draw: number,
    away: number
}