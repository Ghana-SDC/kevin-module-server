const sentencer = require('sentencer');
const opinionLexicon = require('opinion-lexicon');

const getNegativeNouns = () => {
  let negatives = [];
  while (negatives.length < 10000) {
    let noun = sentencer.make("{{ noun }}");
    (opinionLexicon.isNegative(noun)) && negatives.push(noun);
  }
  return negatives;
} 

const getPositiveNouns = () => {
  let positives = [];
  while (positives.length < 10000) {
    let noun = sentencer.make("{{ noun }}");
    (opinionLexicon.isPositive(noun)) && positives.push(noun);
  }
  return positives;
} 

const getNegativeAdjectives = () => {
  let negatives = [];
  while (negatives.length < 10000) {
    let adjective = sentencer.make("{{ adjective }}");
    (opinionLexicon.isNegative(adjective)) && negatives.push(adjective);
  }
  return negatives;
} 

const getPositiveAdjectives = () => {
  let positives = [];
  while (positives.length < 10000) {
    let adjective = sentencer.make("{{ adjective }}");
    (opinionLexicon.isPositive(adjective)) && positives.push(adjective);
  }
  return positives;
} 

let negNouns = getNegativeNouns();
let posNouns = getPositiveNouns();
let negAdj = getNegativeAdjectives();
let posAdj = getPositiveAdjectives();

module.exports = {
  negNouns,
  posNouns,
  negAdj,
  posAdj
}