function cleanfun(obj: any) {
  const newObject = { ...obj };
  console.log(newObject);
  for (var propName in newObject) {
    // console.log(obj[propName]);
    if (newObject[propName] === null || newObject[propName] === undefined) {
      delete newObject[propName];
    }
  }

  console.log(newObject);
  return newObject;
}
export default cleanfun;
