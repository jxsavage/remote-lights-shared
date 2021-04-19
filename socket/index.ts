export enum SharedEmitEvent {
  ROOT_ACTION = 'ROOT_ACTION',
  RE_INIT_APP_STATE = 'RE_INIT_APP_STATE',
}
export enum WebEmitEvent {
  INIT_WEB_CLIENT = 'INIT_WEB_CLIENT',
}
export enum ClientEmitEvent {
  INIT_LIGHT_CLIENT = 'INIT_LIGHT_CLIENT',
  ADD_MICRO_CHANNEL = 'ADD_MICRO_CHANNEL',
  PORT_DISCONNECT = 'PORT_DISCONNECT',
  MICRO_DISCONNECT = 'MICRO_DISCONNECT'
}
export enum MicroEmitEvent {
  INIT_MICRO = 'INIT_MICRO',
  MICRO_DISCONNECT = 'MICRO_DISCONNECT',
  ADD_MICRO_CHANNEL = 'ADD_MICRO_CHANNEL'
}
export enum SeverEmitEvent {
  VALIDATE_MICROS = 'VALIDATE_MICROS'
}
/**
 * Channels joined by respective sockets.
 */
export enum SocketDestination {
  MICROS = 'MICROS',
  SERVER = 'SERVER',
  BROADCAST = 'BROADCAST',
  WEB_CLIENTS = 'WEB_CLIENTS',
  LIGHT_CLIENTS = 'LIGHT_CLIENTS',

}

export enum SocketSource {
  WEB_CLIENT = 'WEB_CLIENT',
  LIGHT_CLIENT = 'LIGHT_CLIENT',
  SOCKET_SERVER = 'SOCKET_SERVER',
}
