import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

export function setup() {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  return {
    caller,
    ctx,
  };
}
