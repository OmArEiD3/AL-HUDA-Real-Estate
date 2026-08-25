---
name: OpenAPI and Zod compatibility
description: Integer schema compatibility in the generated Zod client
---

Generated validation currently targets a Zod runtime without the newer `z.int()` helper. Prefer numeric OpenAPI fields when the generated client must remain compatible with the workspace's installed Zod version.

**Why:** Code generation can succeed while the shared library typecheck fails if the schema emits helpers unavailable in the installed runtime.

**How to apply:** After changing the OpenAPI contract, run codegen and the shared library typecheck before wiring server routes.