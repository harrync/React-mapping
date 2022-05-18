import { MouseEvent } from 'react'
import { htmlDecode } from '../../helpers'
import { MarkerEntity, RouteEntity } from '../../utils/types'
import Button from '../../ui/Button'
import InfoWindowStyles from './InfoWindow.styles'

type Props = {
  infoContent: MarkerEntity | RouteEntity
  clicked: (e?: MouseEvent<HTMLElement>) => void
}

/**
 * Map info window content
 */
export default function InfoWindow({ infoContent, clicked }: Props) {
  const { title, image, imageAlt, summary } = infoContent

  return (
    <InfoWindowStyles className={`${image && 'image'}`}>
      {image && <img src={image} alt={imageAlt ? imageAlt : title} />}
      <h3>{htmlDecode(title)}</h3>
      {summary && <p>{htmlDecode(summary)}</p>}
      <Button
        clicked={clicked}
        ariaLabel={'More information about this location'}
      >
        More info
      </Button>
    </InfoWindowStyles>
  )
}
