export const faqs: {question: string, answer: string}[] = [{
    question: "How does it work?",
    answer: "A Logistic Regression algorithm has been trained on over 10,000 previous games. " +
        "The algorithm looks at 85 features in all - going over things like difficulty of previous games, xG, H2H between the teams," +
        " team lineups, goals scored... and more that you'd expect. These stats are calculated for upcoming games and run through the algorithm, creating a prediction. " +
        "This is then compared to the prediction given by the bookies. A bet is recommended if our prediction is the most likely outcome, and is over 20% higher than the bookie's prediction."
},{
    question: "How are the probabilities from the bookies calculated?",
    answer: "You can do 1 divided by the decimal odds to get their probability of the result. i.e. odds of 2.37,3.5,2.9 have probabilities of 42%,29%,34% If you add them all together, you'll see that the total probability offered by " +
        "the bookies comes to ~105% rather than 100%. This extra 5% cushion is how they make money."
}, {
    question: "Why are there no predictions early on in the season?",
    answer: "The model uses almost no data from previous seasons (only using the H2H results from past seasons). Because of this, it can take a number of games " +
        "for the statistics to accurately reflect team performance. I've therefore stopped the model from predicting in the first 7 games to account for the innaccuracy of early matches. Note as well that " +
        " the model will provide more accurate predictions as more games have been played."
}]
