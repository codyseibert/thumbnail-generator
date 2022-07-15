import { RouterContext } from "@/pages/api/trpc/[trpc]";
import { TRPCError } from "@trpc/server";
import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
import { Session } from "next-auth";

interface AuthenticatedRouterContext extends RouterContext {
  session: Session;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Meta {
}

export const isLoggedInMiddleware: MiddlewareFunction<
  RouterContext,
  AuthenticatedRouterContext,
  Meta
> =
  async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this method.',
      });
    }
    return next({
      ctx: {
        ...ctx,
        session: ctx.session
      }
    })
  }