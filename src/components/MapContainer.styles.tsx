import styled from 'styled-components'
import { sizes } from '../helpers'

export const MapContainerStyles = styled.div`
  background-color: var(--c-white);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: stretch;
  width: 100%;

  h2 {
    font-family: var(--fontTitle);
    text-align: center;
    background-color: var(--c-teal);
    padding: clamp(1.5rem, 3vw, 3rem) 0;
    margin: 0;
    color: var(--c-white);
    font-size: clamp(1.75rem, 3vw, 2.4rem);
  }

  .map-wrapper {
    display: grid;
    grid-template-columns: 1fr 4fr;
    position: relative;
    height: 100vh;
    overflow: hidden;

    @media ${sizes.lg} {
      grid-template-columns: 1fr 2.5fr;
    }

    @media ${sizes.sm} {
      grid-template-columns: 1fr;
      min-height: none;
    }

    &__inner {
      position: relative;
      min-height: 80vh;
      height: 100%;
    }
  }
`

export const ErrorStyles = styled.p`
  max-width: 90%;
  margin: 1rem auto;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
`
