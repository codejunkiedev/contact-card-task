import produce from "immer"
import { useState, useEffect, useRef, useCallback } from "react"
// export const useImmer: <T>(initialState: T) => [T, (setter: T | ((newstate: T) => void)) => void, () => T] = <T,>(
export const useImmer: <T>(initialState: T) => [T, (setter: (newstate: T) => void) => void, () => T] = <T,>(
  initialState: T
) => {
  const [state, setState] = useState<T>(initialState)
  const set = (setter: T | ((newstate: T) => void)) => {
    if (typeof setter === "function") {
      setState(
        produce((draft: any) => {
          //@ts-ignore
          setter(draft)
        })
      )
    } else {
      setState(setter)
    }
  }
  let get = () => {
    let newState = state
    setState((s) => {
      newState = s
      return s
    })
    return newState
  }
  // return [{ ...state, ...get }, set]
  return [state, set, get]
}
export const useDynamicCallback = (callback: (...args: any) => void) => {
  const ref = useRef(callback)
  useEffect(() => {
    ref.current = callback
  }, [callback])
  return useCallback((...args) => ref.current(...args), [])
}
