export const faqs: {question: string, answer: string}[] = [
{
    question: "What is the difference between a Back bet and a Lay bet?",
    answer: "A Lay bet is a bet where you provide odds for other people to bet on - in this situation you effectively act as a bookie." +
        " Lay bets can be placed via an exchange. " +
        "\n\nA Back bet is a regular bet, where you bet on odds the bookies provide. The types of bet shown " +
        "on each page can be filtered if you don't wish to view Lay bets."
},{
    question: "How are predictions made?",
    answer: "A weighted Logistic Regression algorithm has been trained on over 13,000 previous games and 160,000 simulated games. The simulated matches were created by inputting the xG into a Poisson Distribution for each team, then combined to create probabilities for each final score of the game." +
        "\n\nOverall there are 16 features in all - chosen by calculating R correlation to the final result of the training set." +
        " These features include weighted averages for xG, goals, player ratings and points, but also include extra features for things like comparing how well a team performed against their opponent in comparison to other teams."
},{
    question: "How are bets chosen?",
    answer: "A Back bet is recommended if our prediction is the highest probability by at least 10%, and also if it's 20% higher or more than the bookies probability." +
        "\n\nA Lay bet is recommended if an outcome is predicted as the lowest probability by at least 10%, and also if it's 15% lower than the bookies probability."
},{
    question: "How are the probabilities from the bookies calculated?",
    answer: "The implied probability from the bookies odds can be calculated by '1/(decimal odds)'" +
        "\n\n For example, odds of 2.37,3.5,2.9 have probabilities of 42%,29%,34%. " +
        "\n\n An interesting note is if you add the probabilities together, you'll see that the total probability offered by " +
        "the bookies generally comes to ~105%+ rather than 100%. This extra 5%+ margin is how they make money."
},{
    question: "Why are there no predictions early on in the season?",
    answer: "Statistics for each team are reset at the start of each season to account for the summer break and player transfers. " +
        "Because of this, it can take a number of games for the statistics to reflect team performance. The model therefore doesn't predict for the first 7 games of the season."
}]
