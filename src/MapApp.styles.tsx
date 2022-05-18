import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --c-black: #212529;
    --c-white: #fff;
    --c-offWhite: #ebebeb;
    --c-greenWhite:#E5F0D2;
    --c-grey: #bdbdbd;
    --c-green: #4B823A;
    --c-greenLight: #a3cd3d;
    --c-greenDark: #263b1c;
    --c-red:#e91e63;
    --c-redDark: #c2185b;
    --c-teal:#3f7d8b;
    --c-tealLight:#9BD2CC;

    --fontBody: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --fontTitle: 'PontiacRegular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  p {
    margin:0 0 1rem;

    &::last-of-type {
      margin-bottom:0;
    }
  }
`

export default GlobalStyles
