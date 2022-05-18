import { useContext } from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import { StateContext } from '../../MapApp'
import { htmlDecode } from '../../helpers'
import { markerIcons } from '../../data/markerIcons'
import { MarkerEntity, StateContextT } from '../../utils/types'
import L from 'leaflet'
import PopupWrapper from '../PopupWrapper'
import useFilters from '../../hooks/useFilters'

/**
 * Output markers on the map
 */
export default function Markers() {
  const { state } = useContext(StateContext) as StateContextT
  const { markerData, activeMarkerFilters } = state

  // Get filtered results based on state
  const results = useFilters(markerData, activeMarkerFilters)

  return (
    <>
      {
        // @ts-ignore
        results.map((marker: MarkerEntity) => {
          // Get custom icon by last picked TID, if not found use default icon
          const iconTid = +marker.categories!.filter(icon =>
            activeMarkerFilters.includes(icon)
          )
          const hasIcon = markerIcons.filter(icon => iconTid === icon)

          const icon = L.icon({
            iconUrl: `${
              window.location.origin
            }/wp-content/themes/chilterns/dist/img/map/pin/${
              hasIcon ? +hasIcon : 0
            }.svg`,
            iconSize: [28, 40],
            iconAnchor: [13, 39],
            popupAnchor: [3, -27],
          })

          return (
            <Marker
              key={marker.id}
              icon={icon}
              position={marker.position}
              riseOnHover={true}
            >
              <PopupWrapper infoContent={marker} />
              <Tooltip>{htmlDecode(marker.title)}</Tooltip>
            </Marker>
          )
        })
      }
    </>
  )
}
