
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

  formatPrice: (price) => {
    if (price===undefined)
      return '';
    let _p = price.toString();
    if (_p.trim() ==='' )
      return '';

    let _pos = _p.indexOf('.');
    if (_pos === -1)
      return price;

    let _v = _p.substring(0, _pos);
    let _c = _p.substring(_pos);
    if (_c === '.00')
      return _v + '.-';

    return _p

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
