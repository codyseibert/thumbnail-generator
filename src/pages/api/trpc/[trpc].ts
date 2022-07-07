import { appRouter, AppRouter } from '@/backend/router';
import { inferProcedureOutput } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import * as trpc from '@trpc/server';

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session =
    req &&
    res &&
    (await getServerSession(req, res, authOptions));

  return {
    req,
    res,
    session,
  };
};

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export type RouterContext = trpc.inferAsyncReturnType<
  typeof createContext
>;

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;
