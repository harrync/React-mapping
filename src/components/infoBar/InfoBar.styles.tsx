import styled from 'styled-components'
import { sizes } from '../../helpers'

const InfoBarStyles = styled.div`
  button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--c-white);
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    padding: 0;

    @media ${sizes.sm} {
      top: 1rem;
      right: 1rem;
    }

    svg {
      height: 20px;
      width: 20px;
    }

    path {
      fill: var(--c-teal);
      transition: fill 0.2s ease-in-out;
    }

    &:focus,
    &:hover {
      background-color: var(--c-teal);

      path {
        fill: var(--c-white);
      }
    }
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .info {
    padding: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
    max-width: 94%;
    font-size: clamp(1.15rem, 2vw, 1.4rem);
  }

  h4 {
    color: var(--c-black);
    font-family: var(--fontBody);
    padding-top: 1rem;
    border-top: 1px solid var(--c-grey);
    margin-top: 1rem;
    font-size: clamp(1rem, 2vw, 1.15rem);
    font-weight: 400;
  }

  .links {
    display: flex;
    flex-wrap: wrap;

    a {
      margin-right: 1rem;
    }
  }

  a {
    color: var(--c-teal);
  }

  .download {
    &:hover {
      opacity: 0.7;
    }
  }
`

export default InfoBarStyles
