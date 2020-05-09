/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Middleware, MiddlewareAPI, Dispatch, AnyAction,
} from 'redux';
import { SocketChannel } from 'Shared/socket';

export interface EmittableAction extends AnyAction {
  meta: {
    socket: {
      shouldEmit: boolean;
      hasEmitted: boolean;
    };
  };
}

export function convertToEmittableAction<A extends AnyAction>(
  action: A, destination: string | SocketChannel = 'BROADCAST'
  ): A & EmittableAction {
  const meta = action.meta ? action.meta : {};
  return {
    ...action,
    meta: {
      ...meta,
      socket: {
        shouldEmit: true,
        hasEmitted: false,
        destination
      },
    },
  };
}
function isEmittableAction(action: AnyAction): action is EmittableAction {
  return action.meta?.socket !== undefined;
}
type EmitAction = (action: AnyAction & EmittableAction) => void;
export function emitActionMiddleware<S>(emit: EmitAction): Middleware<{}, S> {
  const emitAction: Middleware<EmittableAction, S> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: MiddlewareAPI<Dispatch<AnyAction>, S>,
  ) => (
    next: Dispatch<AnyAction>,
  ) => (
    action: AnyAction,
  ) => {
    if (isEmittableAction(action)) {
      const { hasEmitted, shouldEmit } = action.meta.socket;
      if (shouldEmit && !hasEmitted) {
        // eslint-disable-next-line no-param-reassign
        action.meta.socket.hasEmitted = true;
        emit(action);
      }
    }
    next(action);
  };
  return emitAction;
}
