import styled from 'styled-components'

const buttonStyles = styled.button`
  border-radius: 0.5rem;
  color: var(--c-white);
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-align: center;
  background-color: var(--c-teal);
  border: 0;
  font-size: clamp(1rem, 2vw, 1.25rem);

  &:focus,
  &:hover {
    background-color: var(--c-tealLight);
    color: var(--c-black);
  }
`

export default buttonStyles
