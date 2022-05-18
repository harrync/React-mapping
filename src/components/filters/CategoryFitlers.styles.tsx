import styled from 'styled-components'

const CategoryFiltersStyles = styled.div`
  button {
    color: var(--c-black);
    text-align: left;
    border-radius: 0;
    font-weight: normal;
    cursor: pointer;
  }

  .category-label {
    border-radius: 0;
    text-align: left;
    border-top: 1px solid var(--c-grey);
    background-color: transparent;
    padding: clamp(0.75rem, 1.5vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;

    &:last-of-type {
      border-bottom: 1px solid var(--c-grey);

      .filters-dropdowm {
        margin-bottom: 0;
      }
    }

    &.selected,
    &.active {
      background-color: var(--c-teal);
      color: var(--c-white);

      span {
        border-left-color: var(--c-white);
      }
    }

    &.selected {
      span {
        transform: rotate(0);
      }
    }

    &.active {
      span {
        transform: rotate(90deg);
      }
    }

    &:focus,
    &:hover {
      background-color: var(--c-teal);
      color: var(--c-white);

      span {
        border-left-color: var(--c-white);
      }
    }

    span {
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 0 6px 10.4px;
      border-color: transparent transparent transparent var(--c-teal);
      margin-right: 0.75rem;
      transition: 0.2s ease-in-out;
    }
  }

  .filters-dropdown {
    margin-bottom: 1.5rem;

    button {
      background-color: var(--c-offWhite);
      padding: clamp(0.75rem, 1.5vw, 0.5rem) clamp(1rem, 1.5vw, 1.5rem);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 1rem;

      &:focus,
      &:hover,
      &.active {
        background-color: var(--c-tealLight);
      }

      &.active {
        .check {
          &::after {
            content: '✓';
          }
        }
      }

      .check {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--c-white);
        color: var(--c-teal);
        height: 1rem;
        width: 1rem;
        min-width: 1rem;
        margin-right: 0.75rem;
      }

      img,
      .icon {
        margin-left: auto;
        display: block;
        width: 20px;
      }

      img {
        height: auto;
      }

      .icon {
        width: 17px;
        height: 17px;
        border-radius: 50%;
        border: 1px solid var(--c-black);
      }
    }
  }
`

export default CategoryFiltersStyles
