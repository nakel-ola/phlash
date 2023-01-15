import { useMemo } from 'react'
import { getOwnerDocument } from '../utils/owner'

export function useOwnerDocument(...args: Parameters<typeof getOwnerDocument>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getOwnerDocument(...args), [...args])
}
