
const queryReducer = {

  reduce : (results)=>{

    
  },

  reduceItems: (combinations) => {
    let partNumbers = [];
    combinations.forEach((combination, index) => {
      partNumbers.push(combination.bed);
      partNumbers.push(combination.mattress);
      partNumbers.push(combination.slat);
      partNumbers.push(combination.extra);
    });
    return partNumbers;
  }

}

export default queryReducer;
