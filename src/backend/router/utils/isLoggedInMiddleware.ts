
export const isLoggedInMiddleware = async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new Error('you must be logged in');
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.session.user.id,
    },
  });
}