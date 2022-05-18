import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InfoBar from './InfoBar'
import { StateContext } from '../../MapApp'
import InfoBarContainerStyles from './InfoBarContainer.styles'
import { StateContextT } from '../../utils/types'

/**
 * InfoBar wrapper
 */
export default function InfoBarContainer() {
  const { state } = useContext(StateContext) as StateContextT
  const { infoBarContent } = state

  return (
    <>
      <AnimatePresence>
        {infoBarContent && (
          <InfoBarContainerStyles
            tabIndex={0}
            as={motion.div}
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <InfoBar data={infoBarContent} />
          </InfoBarContainerStyles>
        )}
      </AnimatePresence>
    </>
  )
}
