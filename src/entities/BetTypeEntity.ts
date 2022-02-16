export type BetTypeEntity = {
    "Back Bet": Boolean,
    "Lay Bet": Boolean
}

export const BackBetDefinition = "A Back Bet is a bet where you put money on someone else's odds. An example would be betting on odds set by a bookmaker. This is what people typically think of when thinking about a bet."
export const LayBetDefinition = "A Lay Bet is where you post odds for someone else to bet on. You win the money someone else bets on your odds if the result doesn't win. If their bet wins, you're liable to pay their winnings."

export const BetTypeText = `${BackBetDefinition}\n
    ${LayBetDefinition} \n`;