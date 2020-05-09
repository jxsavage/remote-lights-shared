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
}

export enum SocketChannel {
  WEB_CLIENTS = 'WEB_CLIENTS',
  LIGHT_CLIENTS = 'LIGHT_CLIENTS',
}
