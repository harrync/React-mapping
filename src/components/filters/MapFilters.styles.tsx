import styled from 'styled-components'
import { sizes } from '../../helpers'

const FiltersStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: clamp(1rem, 2vw, 3rem);
  padding-bottom: 1rem;
  max-height: 80vh;

  @media ${sizes.sm} {
    max-height: none;
  }

  .controls {
    margin-top: auto;
  }

  h3 {
    font-family: var(--fontTitle);
    color: var(--c-teal);
    margin-bottom: 2rem;
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    line-height: 1.4;

    @media ${sizes.sm} {
      text-align: center;
      margin: 0.5rem 0 1.5rem;
    }
  }

  button {
    width: 100%;
    cursor: pointer;
  }

  .reset {
    margin-top: clamp(1rem, 2vh, 1.5rem);
    background-color: var(--c-red);
    font-size: 1rem;

    &:hover {
      background-color: var(--c-redDark);
    }
  }
`

export default FiltersStyles
