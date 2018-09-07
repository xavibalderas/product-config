
const queryReducer = {

  reduce : (results)=>{


  },

  reduceItems: (combinations) => {
    let partNumbers = [];
    combinations.forEach((combination, index) => {
      (combination.bed.trim().length===8 || combination.bed.trim().length===9) ? partNumbers.push(combination.bed.toUpperCase()) : null;
      combination.mattress.trim().length===8 ? partNumbers.push(combination.mattress.toUpperCase()) : null;
      combination.slat.trim().length===8 ? partNumbers.push(combination.slat.toUpperCase()) : null;
      combination.extra.trim().length===8 ? partNumbers.push(combination.extra.toUpperCase()) : null;
    });
    return partNumbers;
  }

}

export default queryReducer;
