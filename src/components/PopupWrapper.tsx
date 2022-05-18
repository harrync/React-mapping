import { useContext, useRef } from 'react'
import {
  AppState,
  DispatchContextT,
  MarkerEntity,
  RouteEntity,
  StateContextT,
} from '../utils/types'
import { DispatchContext, StateContext } from '../MapApp'
import { Popup } from 'react-leaflet'
import InfoWindow from './infoWindow/InfoWindow'
import headerScrollAmend from '../helpers/headerScroll'

type Props = {
  infoContent: MarkerEntity | RouteEntity
}

/**
 * Map popups wrapper
 */
export default function PopupWrapper({ infoContent }: Props) {
  const { state } = useContext(StateContext) as StateContextT
  const { dispatch } = useContext(DispatchContext) as DispatchContextT
  const { mapRef } = state
  const popup = useRef(null)

  function closePopusOnClick() {
    // @ts-ignore
    popup.current._closeButton.click()

    dispatch({ type: AppState.SHOW_INFO_BAR, mode: infoContent })

    mapRef && mapRef?.current?.scrollIntoView({ behavior: 'smooth' })

    headerScrollAmend()
  }

  return (
    <>
      <Popup ref={popup} maxWidth={250}>
        <InfoWindow
          infoContent={infoContent}
          clicked={() => closePopusOnClick()}
        />
      </Popup>
    </>
  )
}
