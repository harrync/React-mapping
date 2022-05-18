import { MouseEvent, ReactNode } from 'react'
import ButtonStyles from './Button.styles'

/**
 * General purpose buttons
 */
type Props = {
  classes?: string
  disabled?: boolean
  clicked: (e?: MouseEvent<HTMLElement>) => void
  ariaLabel?: string
  children: ReactNode
}

export default function button({
  classes,
  disabled,
  clicked,
  ariaLabel,
  children,
}: Props) {
  return (
    <ButtonStyles
      type="button"
      className={classes}
      onClick={clicked}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </ButtonStyles>
  )
}
