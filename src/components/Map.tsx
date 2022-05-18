import { useContext, useMemo } from 'react'
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMap,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { latLngBounds, LatLngExpression } from 'leaflet'
import { apiKey, serviceUrl } from '../helpers'
import { aonbArea, aonbOptions } from '../data/chilternsAonbArea'
import { StateContext } from '../MapApp'
import { MarkerEntity, StateContextT } from '../utils/types'
import Markers from './markers/Markers'
import Routes from './routes/Routes'
import MapStyles from './Map.styles'

/**
 * Render map
 */
export default function map() {
  // const [mapZoom, setMapZoom] = useState(10)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state } = useContext(StateContext) as StateContextT
  const {
    showAonbArea,
    markerData,
    routeData,
    infoBarContent,
    activeMarkerFilters,
    activeRouteFilters,
  } = state

  // function windowSize() {
  //   window.innerWidth < 1024 ? setMapZoom(8) : setMapZoom(12)
  //   console.log(window.innerWidth < 1024)

  //   if (window.innerWidth < 1024) {
  //     setMapZoom(8)
  //   }

  //   console.log(mapZoom)
  // }

  // Set map default zoom based on screen size
  // useEffect(() => {
  //   windowSize()

  //   window.addEventListener('resize', () => {
  //     setTimeout(windowSize, 200)
  //   })
  // }, [])

  // Set bounds of map based on available markers
  function SetBounds(): any {
    // When filters are empty, don't relocate map focus
    if (activeMarkerFilters.length === 0 && activeRouteFilters.length === 0) {
      return null
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const map = useMap()

    // Get active markers
    const currentMarkers = markerData.filter(marker => {
      const matchedCategory = marker.categories?.filter(function (id) {
        return activeMarkerFilters.indexOf(id) !== -1
      })
      if (!matchedCategory) return null
      return matchedCategory.length > 0
    })

    // Get lat/lng for each active marker
    const markerPositions = currentMarkers.map((marker: MarkerEntity) => {
      return marker.position
    })

    if (markerPositions.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/rules-of-hooks -- map.fitBounds needs to be used
      const mapBounds = useMemo(() => {
        // Generate bounds based on current marker data
        const bounds = latLngBounds(markerPositions)
        markerPositions.forEach((coords: LatLngExpression) => {
          bounds.extend(coords)
        })

        // Update bounds of map
        map.flyToBounds(bounds, { padding: [0, 0], maxZoom: 13 })
        return bounds
      }, [map, markerPositions])
    }

    return null
  }

  return (
    <MapStyles className={`${infoBarContent && 'disabled'}`}>
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        zoom={10}
        maxZoom={18}
        minZoom={8}
        scrollWheelZoom={false}
        center={[51.6858401, -0.79]}
        dragging={!L.Browser.mobile}
      >
        <TileLayer
          attribution={`Contains OS data &copy; Crown copyright and database rights ${new Date().getFullYear()}`}
          url={`${serviceUrl}/Outdoor_3857/{z}/{x}/{y}.png?key=${apiKey}`}
        />

        {markerData && <Markers />}

        {routeData && <Routes />}

        {showAonbArea && (
          <Polygon pathOptions={aonbOptions} positions={aonbArea}>
            <Tooltip sticky={true}>Chilterns AONB area</Tooltip>
          </Polygon>
        )}

        <SetBounds />
      </MapContainer>
      <span className="os-api-branding logo"></span>
    </MapStyles>
  )
}
