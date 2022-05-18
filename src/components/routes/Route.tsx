import { useContext, useEffect, useState } from 'react'
import { GeoJsonObject } from 'geojson'
import { GeoJSON, Tooltip } from 'react-leaflet'
import { RouteEntity, StateContextT } from '../../utils/types'
import PopupWrapper from '../PopupWrapper'
import { htmlDecode } from '../../helpers'
import { StateContext } from '../../MapApp'

type Props = {
  route: RouteEntity
}

/**
 * Route map element
 */
export default function Route({ route }: Props) {
  const { state } = useContext(StateContext) as StateContextT
  const { routeCategoryData } = state
  const [routeData, setRouteData] = useState(null)

  // Get data from shape file, convert to geoJSON object
  useEffect(() => {
    fetch(route.shape_file!)
      .then(blob => blob.json())
      .then(data => {
        setRouteData(data)
      })
      .catch(err => {
        throw Error(err)
      })
  }, [route.shape_file])

  if (routeData) {
    const routeColour = routeCategoryData.filter(
      category => category.tid === route.categories![0]
    )

    return (
      <GeoJSON
        key={route.id}
        data={routeData as GeoJsonObject}
        pathOptions={{
          color: routeColour[0].route_colour,
          weight: 5,
          stroke: true,
        }}
      >
        <PopupWrapper infoContent={route} />
        <Tooltip sticky={true}>{htmlDecode(route.title)}</Tooltip>
      </GeoJSON>
    )
  }

  return <></>
}
