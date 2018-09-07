
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
  },

  isValidItem: (product) => {
    let item = product.trim().toUpperCase();
    let length = product.length;

    if (length < 8 || length > 9) { return false };
    if (length === 9) {
      return (item.substring(0,1) === 'S') ? true : false;
    }
    return true;
  }
}

export default queryReducer;
