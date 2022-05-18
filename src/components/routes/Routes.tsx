import { useContext } from 'react'
import { StateContext } from '../../MapApp'
import { StateContextT } from '../../utils/types'
import Route from './Route'
import useFilters from '../../hooks/useFilters'

/**
 * Map routes
 */
export default function Routes() {
  const { state } = useContext(StateContext) as StateContextT
  const { routeData, activeRouteFilters } = state

  // Get filtered results based on state
  const results = useFilters(routeData, activeRouteFilters)

  return (
    <>
      {results.map(route => {
        return <Route key={route.id} route={route} />
      })}
    </>
  )
}
