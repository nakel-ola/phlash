import * as React from "react";
import { useLatestValue } from "./use-latest-value";
import usePrevious from "./use-previous";

const useChange = <T extends any>(
  value: T,
  onChange: (current: T, prev: T) => any
) => {
  const storedOnChange = useLatestValue(onChange);
  const prevValue = usePrevious(value, value);
  React.useEffect(() => {
    if (value !== prevValue) storedOnChange.current(value, prevValue);
  }, [value, prevValue, storedOnChange]);
};

export { useChange };
