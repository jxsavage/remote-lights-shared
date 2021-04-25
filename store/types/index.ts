import { SocketDestination, SocketSource } from 'Shared/socket';



export interface EmittableActionSocketMeta {
  shouldEmit: boolean;
  hasEmitted: boolean;
  source: SocketSource;
  destination: string | SocketDestination;
}
export interface EmittableAction {
  meta: {
    socket: EmittableActionSocketMeta;
  };
}
