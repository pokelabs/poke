import { Router } from 'express'
import { SchemaItem } from '@/services/schema/models/SchemaItem.model'
import { brokerRegistrar } from '@/transporters/broker/broker.registrar'
import { restRegistrar } from '@/transporters/rest/rest.registrar'
import { websocketRegistrar } from '@/transporters/websocket/websocket.registrar'
import {
  Controller,
  ControllerRegistrarParameters,
} from '@/types/controllerRelated.types'
import { authenticationSocketMiddleware } from '@/utils/authentication/authenticationMiddleware'
import { createGraph } from '@/utils/graph/createGraph'
import { justLog } from '@/utils/justLog'

export const createControllerRegistrar = (
  controllers: Controller[],
  { ws, rest, broker }: ControllerRegistrarParameters,
): {
  registerAllEventControllers: () => void
  registerAllRestControllers: () => Router
  registerAllBrokerControllers: () => void
} => {
  const registerAllEventControllers = () => {
    // auto registration socket routes for each client
    ws.io.on('connection', socket => {
      authenticationSocketMiddleware(
        socket.client.request.headers.authorization,
      ).then(context => websocketRegistrar(ws.io, socket, context)(controllers))
    })
  }

  const registerAllRestControllers = () => {
    const schema: SchemaItem[] = []
    restRegistrar(rest.router)(controllers, schema)
    const builtSchema = createGraph(schema)
    rest.router.get('/', (req, res) => {
      res.json({ schema: builtSchema })
    })
    return rest.router
  }

  const registerAllBrokerControllers = () => {
    brokerRegistrar(broker.subscription)(controllers)
  }

  return {
    registerAllEventControllers,
    registerAllRestControllers,
    registerAllBrokerControllers,
  }
}
