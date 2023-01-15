function merge(arr1: any[], arr2: any[], ref?: string) {
  const seen = new Set();

  const data = [...arr1, ...arr2];

  const result = data.filter((el) => {
    let newRef = ref ? el[ref] : el;
    const duplicate = seen.has(newRef);
    seen.add(newRef);
    return !duplicate;
  });

  return result;
}

export default merge;
