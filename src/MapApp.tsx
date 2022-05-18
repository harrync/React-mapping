import { useReducer, createContext, useEffect } from 'react'
import mapReducer, { initialState } from './reducers/mapReducer'
import { DispatchContextT, StateContextT } from './utils/types'
import MapContainer from './components/MapContainer'
import getData from './data/getData'
import GlobalStyles from './MapApp.styles'

export const StateContext = createContext<Partial<StateContextT> | null>(null)
export const DispatchContext = createContext<Partial<DispatchContextT> | null>(
  null
)

type Props = {
  showAonbArea: boolean
  categories: string
  routes: string
}

/**
 * App component
 */
export default function MapApp({ showAonbArea, categories, routes }: Props) {
  const [state, dispatch] = useReducer(mapReducer, initialState)

  // Get WP post data
  useEffect(() => {
    getData(dispatch, categories, routes)
  }, [categories, routes])

  return (
    <>
      <GlobalStyles />
      <DispatchContext.Provider value={{ dispatch }}>
        <StateContext.Provider value={{ state }}>
          <MapContainer showAonbArea={showAonbArea} />
        </StateContext.Provider>
      </DispatchContext.Provider>
    </>
  )
}
