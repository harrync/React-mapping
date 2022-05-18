export default function headerScrollAmend() {
  // Account for sticky header
  const scrolledY = window.scrollY
  const header = document.querySelector('.fixed_header')
  const headerHeight = header?.clientHeight

  if (headerHeight && scrolledY) {
    window.scroll(0, scrolledY - headerHeight)
  }
}
