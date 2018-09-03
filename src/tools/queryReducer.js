
const queryReducer = {

  reduce : (results)=>{


  },

  reduceItems: (combinations) => {
    let partNumbers = [];
    combinations.forEach((combination, index) => {
      combination.bed.trim().length===8 ? partNumbers.push(combination.bed) : null;
      combination.mattress.trim().length===8 ? partNumbers.push(combination.mattress) : null;
      combination.slat.trim().length===8 ? partNumbers.push(combination.slat) : null;
      combination.extra.trim().length===8 ? partNumbers.push(combination.extra) : null;
    });
    return partNumbers;
  }

}

export default queryReducer;
