import { FastifyError } from './error'
import { RawServerBase, RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression } from './utils'
import { FastifyRequest } from './request'

/**
 * Standard Fastify logging function
 */
export interface FastifyLogFn {
  (msg: string, ...args: any[]): void;
  (obj: object, msg?: string, ...args: any[]): void;
}

export type LogLevels = 'info' | 'error' | 'debug' | 'fatal' | 'warn' | 'trace'

export interface FastifyLoggerInstance {
  info: FastifyLogFn;
  warn: FastifyLogFn;
  error: FastifyLogFn;
  fatal: FastifyLogFn;
  trace: FastifyLogFn;
  debug: FastifyLogFn;
  child: FastifyLoggerInstance;
}

/**
 * Fastify Custom Logger options.
 */
export interface FastifyLoggerOptions<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>
> extends FastifyLoggerInstance {
  serializers?: {
    req: (req: RawRequest) => {
      method: string;
      url: string;
      version: string;
      hostname: string;
      remoteAddress: string;
      remotePort: number;
    };
    err: (err: FastifyError) => {
      type: string;
      message: string;
      stack: string;
      [key: string]: any;
    };
    res: (res: RawReply) => {
      statusCode: string | number;
    };
  };
  level?: string;
  genReqId?: (req: FastifyRequest<RawServer, RawRequest>) => string;
}
