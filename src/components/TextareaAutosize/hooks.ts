import * as React from 'react';
import {useLatestValue} from '../..//hooks/use-latest-value';

export { default as useComposedRef } from '../../hooks/use-composed-ref';

export const useWindowResizeListener = (listener: (event: UIEvent) => any) => {
  const latestListener = useLatestValue(listener);

  React.useLayoutEffect(() => {
    const handler: typeof listener = (event) => {
      latestListener.current(event);
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [latestListener]);
};
