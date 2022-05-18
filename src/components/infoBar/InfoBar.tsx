import { useCallback, useContext, useEffect, useRef } from 'react'
import { DispatchContext } from '../../MapApp'
import { htmlDecode } from '../../helpers'
import {
  AppState,
  DispatchContextT,
  MarkerEntity,
  RouteEntity,
} from '../../utils/types'
import Button from '../../ui/Button'
import InfoBarStyles from './InfoBar.styles'

type Props = {
  data: MarkerEntity | RouteEntity
}

/**
 * InfoBar content
 */
export default function InfoBar({ data }: Props) {
  const { dispatch } = useContext(DispatchContext) as DispatchContextT
  const infoBar = useRef(null)

  // Close infoBar when pressing `Esc` key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        dispatch({ type: AppState.SHOW_INFO_BAR, mode: null })
      }
    },
    [dispatch]
  )

  useEffect(() => {
    // When infoBar open, listen for keypress, & set focus for correct tabbing control
    window.addEventListener('keydown', handleKeyDown)
    // @ts-ignore
    infoBar.current.focus()
    document.body.classList.add('locked')

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('locked')
    }
  }, [handleKeyDown])

  return (
    <InfoBarStyles ref={infoBar} tabIndex={0}>
      <Button
        clicked={() => dispatch({ type: AppState.SHOW_INFO_BAR, mode: null })}
        classes={'block-map__info__close'}
        ariaLabel={'Close info bar and return to map'}
      >
        <svg viewBox="0 0 22 28">
          <path d="M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z"></path>
        </svg>
      </Button>

      {data.image && (
        <img
          src={data.image}
          alt={data.imageAlt ? data.imageAlt : data.title}
        />
      )}

      <div className="info">
        <h3>{htmlDecode(data.title)}</h3>

        {data.content && (
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        )}

        {data.distance && (
          <>
            <h4>Distance</h4>
            <p>{data.distance}</p>
          </>
        )}

        {data.postcode && (
          <>
            <h4>Postcode</h4>
            <p>{data.postcode}</p>
          </>
        )}

        {data.accessibility_terrain_walk_info && (
          <>
            <h4>Accessibility/terrain/walk info</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: data.accessibility_terrain_walk_info,
              }}
            ></div>
          </>
        )}

        {data.facilities_accessibility && (
          <>
            <h4>Facilities &amp; accessibility</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: data.facilities_accessibility,
              }}
            ></div>
          </>
        )}

        {data.links && (
          <>
            <h4>More information</h4>

            <div className="links">
              {data.links.map((link, i) => (
                <a key={i} href={link.url} target={link.target}>
                  {link.title}
                </a>
              ))}
            </div>
          </>
        )}

        {data.download && (
          <>
            <h4>Download more information</h4>
            <a href={data.download} title="Download file" className="download">
              <svg
                width="50"
                height="63"
                viewBox="0 0 50 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M49.3 53.9001H47.3V14.6001L35.3 2.6001H7.59998V53.9001H5.59998V0.600098H36.2L49.3 13.8001V53.9001Z"
                  fill="#686867"
                />
                <path
                  d="M49.3 54.9001H41.7V52.9001H47.3V15.8001H34.1V2.6001H7.59998V52.9001H13.2V54.9001H5.59998V0.600098H36.1V13.8001H49.3V54.9001Z"
                  fill="#686867"
                />
                <path
                  d="M40.9 48.9L27.5 62.1L14.1 48.9H20.7V33H34.3V48.9H40.9Z"
                  fill="#A65F8A"
                />
                <path d="M29.8 8.8999H0V22.0999H29.8V8.8999Z" fill="#A65F8A" />
                <path
                  d="M10.5 14.0001C10.5 14.8001 10.2 15.5001 9.69998 15.9001C9.19998 16.3001 8.39998 16.6001 7.39998 16.6001H6.79998V19.4001H5.09998V11.6001H7.59998C8.59998 11.6001 9.29998 11.8001 9.79998 12.2001C10.3 12.6001 10.5 13.2001 10.5 14.0001ZM6.79998 15.3001H7.29998C7.79998 15.3001 8.19998 15.2001 8.39998 15.0001C8.69998 14.8001 8.79998 14.5001 8.79998 14.1001C8.79998 13.7001 8.69998 13.4001 8.49998 13.2001C8.29998 13.0001 7.99998 12.9001 7.49998 12.9001H6.79998V15.3001Z"
                  fill="white"
                />
                <path
                  d="M18.5 15.4001C18.5 16.7001 18.1 17.7001 17.4 18.4001C16.7 19.1001 15.6 19.4001 14.2 19.4001H12V11.6001H14.5C15.8 11.6001 16.8 11.9001 17.5 12.6001C18.2 13.3001 18.5 14.2001 18.5 15.4001ZM16.8 15.5001C16.8 13.8001 16.1 13.0001 14.6 13.0001H13.7V18.0001H14.4C16 18.0001 16.8 17.2001 16.8 15.5001Z"
                  fill="white"
                />
                <path
                  d="M21.7999 19.4001H20.2V11.6001H24.7V13.0001H21.7999V15.0001H24.5V16.4001H21.7999V19.4001Z"
                  fill="white"
                />
              </svg>
            </a>
          </>
        )}
      </div>
    </InfoBarStyles>
  )
}
