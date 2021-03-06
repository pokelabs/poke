import { withIO } from '@/transporters/websocket/utils/withIO'
import { buildRoomName } from '@/utils/domain/buildRoomName'

export const broadcastRoom =
  (room: number | string) =>
  (event: string, ...args: any[]) =>
    withIO(io => io.to(buildRoomName(room)).emit(event, ...args))
