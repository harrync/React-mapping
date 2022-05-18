import styled from 'styled-components'

const InfoWindowStyles = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px 0 0;

  img {
    min-width: 230px;
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 1.25rem;
  }

  h3 {
    font-size: 1.15rem;
    margin-bottom: 1rem;
    color: var(--c-teal);
  }

  p {
    margin: 0 0 1rem;
  }

  button {
    align-self: flex-end;
    font-size: 1rem;
  }
`

export default InfoWindowStyles
