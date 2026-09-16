# Beyond Bancard: 6-page design demo

Interactive demo of the Beyond Bancard website revamp. Spec: [`docs/PRD.md`](docs/PRD.md) · decisions: [`docs/DECISIONS.md`](docs/DECISIONS.md) · open client questions: [`docs/CONFIRM_LIST.md`](docs/CONFIRM_LIST.md).

## Pages

| Route | Template |
|---|---|
| `/` | Homepage |
| `/accept/high-risk-processing` | Solution detail |
| `/industries` | Hub |
| `/industries/nutra-supplements` | Industry detail |
| `/partners/isos-agents` | Partner detail |
| `/live-form` | Apply (conversion) |

Every other internal link goes to `/coming-soon?from=<path>`. `/dev/styleguide` shows tokens and components in development.

## Commands

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm typecheck
pnpm build               # all routes static
pnpm test:e2e            # Playwright + axe against `pnpm start` on :3300
pnpm confirm-list        # regenerate docs/CONFIRM_LIST.md
pnpm screenshots         # needs `pnpm start --port 3300` running
```

`NEXT_PUBLIC_DEMO_MODE=true` (default) outlines unconfirmed content in amber. Set it to `false` to preview production behaviour, where unconfirmed content is hidden.
