import styled from 'styled-components'

export const MapStyles = styled.div`
  position: relative;
  transition: opacity 0.2s ease-in-out;
  height: 100%;
  width: 100%;
  /* min-height: 80vh; */

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`

export default MapStyles
