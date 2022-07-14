import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@/backend/router/router';

export const trpc = createReactQueryHooks<AppRouter>();
