import { createControllerRegistrar } from '@/common/createControllerRegistrators'
import { registerWordController } from '@/controllers/word.controller'
import { logEvent } from '@/utils/logEvent'

logEvent('Creating registration handles...')

export const { registerAllEventControllers, registerAllRestControllers } =
  createControllerRegistrar([registerWordController])
