
const queryReducer = {

  reduce : (results)=>{


  },

  reduceItems: (items, initial = [])=>{
    return items.reduce((accumulator, currentValue)=>{
      const item = currentValue.itemno;
      const isValid = currentValue.isValid;
      const _a = accumulator
      if (isValid){
        const exists = accumulator.indexOf(item);
        if (exists === -1){
          _a.push(item);
        }
      }
      return _a;
    }, initial);
  },


  reduceCombinations: (combinations) => {
    return combinations.reduce((accumulator, currentValue)=>{
      const _a = accumulator;
      let _r = queryReducer.reduceItems(currentValue, _a);
      return _r;
    },[]);
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
