interface ReturnType {
  field: string;
  value: any;
}

interface PropsType {
    [key: string]: any
}

const objToArray = (obj: PropsType): ReturnType[] => {
  let array = [];

  for (var propName in obj) {
    array.push({
      field: propName,
      value: obj[propName],
    });
  }
  return array;
};

export default objToArray;
