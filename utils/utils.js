const timestampToDate = arr => {
  console.log(arr);
  
  let newData = [];

  arr.forEach(obj => {
    obj['created_at'] = new Date(obj['created_at']);
    delete obj.timestamp;
    newData.push(obj);
  })
  
  return newData;
};

module.exports = { timestampToDate };
