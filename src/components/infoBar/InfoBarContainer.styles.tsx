import styled from 'styled-components'
import { sizes } from '../../helpers'

const InfoBarContainerStyles = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 30vw;
  max-width: 500px;
  background: var(--c-white);
  overflow-y: scroll;
  box-shadow: 0 0 5px var(--c-grey);

  @media ${sizes.sm} {
    position: fixed;
    height: 100vh;
    width: 100%;
    max-width: none;
    z-index: 1006;
    padding: 1rem;
  }
`

export default InfoBarContainerStyles
