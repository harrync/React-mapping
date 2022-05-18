import { useContext, useEffect, useRef } from 'react'
import { StateContext, DispatchContext } from '../MapApp'
import Loader from '../ui/Loading'
import { AppState, DispatchContextT, StateContextT } from '../utils/types'
import Map from './Map'
import MapFilters from './filters/MapFilters'
import InfoBarContainer from './infoBar/InfoBarContainer'
import { MapContainerStyles, ErrorStyles } from './MapContainer.styles'

type Props = {
  showAonbArea: boolean
}

/**
 * Main app structure
 */
export default function MapContainer({ showAonbArea }: Props) {
  const { state } = useContext(StateContext) as StateContextT
  const { dispatch } = useContext(DispatchContext) as DispatchContextT
  const { loading, error } = state

  const containerRef = useRef(null)
  const mapRef = useRef(null)

  // Set state based on props passed from WP
  useEffect(() => {
    dispatch({ type: AppState.SHOW_AONB_AREA, mode: showAonbArea })
    dispatch({ type: AppState.MAP_REF, mode: mapRef })
    dispatch({ type: AppState.CONTAINER_REF, mode: containerRef })
  }, [dispatch, showAonbArea])

  if (error) {
    return (
      <ErrorStyles>
        Error! Looks like we've got lost walking around our beautiful
        countryside{' '}
        <span role="img" aria-label="Walking emoji">
          🚶‍♀️
        </span>
      </ErrorStyles>
    )
  }

  if (loading) {
    return <Loader />
  }

  return (
    <MapContainerStyles ref={containerRef}>
      <div className="map-wrapper">
        <MapFilters />
        <div className="map-wrapper__inner" ref={mapRef}>
          <Map />
        </div>
        <InfoBarContainer />
      </div>
    </MapContainerStyles>
  )
}
