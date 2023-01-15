import { useRef, useCallback } from 'react';

function updateRef(ref: any, value: any) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  ref.current = value;
};

function useComposedRef(libRef: any, userRef: any) {
  var prevUserRef = useRef();
  return useCallback(function (instance: any) {
    libRef.current = instance;

    if (prevUserRef.current) {
      updateRef(prevUserRef.current, null);
    }

    prevUserRef.current = userRef;

    if (!userRef) {
      return;
    }

    updateRef(userRef, instance);
  }, [libRef, userRef]);
};

export default useComposedRef;
