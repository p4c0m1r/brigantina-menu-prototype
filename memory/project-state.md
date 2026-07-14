---
name: project-state
description: Implementation progress of the Brigantina ordering system — what is done, what is next
metadata:
  type: project
---

## Done

- **Cart UI** — CartContext (add/remove/setQty/clear/totalPrice), CartDrawer (cart step + checkout step + success step), add-to-cart buttons inline on every MenuCard
- **Email backend** — `server/` directory (Express + TypeScript + Resend). POST `/api/place-order` sends a styled HTML receipt to the customer and an order notification to the owner.
- **Frontend wired** — CartDrawer calls `VITE_API_URL/api/place-order`, shows loading/success/error states. `.env.local` sets `VITE_API_URL=http://localhost:3001` for dev.

## Resend setup required before going live

1. Sign up at resend.com
2. Create an API key → set `RESEND_API_KEY` in `server/.env`
3. Verify your sending domain → set `FROM_EMAIL` to that domain address
4. Set `OWNER_EMAIL` to the restaurant notification address
5. For local testing, `FROM_EMAIL=onboarding@resend.dev` works (but only delivers to your own Resend account email)

## Next steps

1. **Stripe payment** — `/create-payment-intent` endpoint, Stripe Elements on frontend, webhook `payment_intent.succeeded` → call the existing email helpers
2. **Thermal printer** — `node-thermal-printer` on a local server at the venue, triggered by the Stripe webhook
3. **Backend deployment** — Railway, Fly.io, or local machine with pm2 + ngrok for webhooks

**Why:** The owner wants full e-commerce: order → pay online → receipt printed at bar + emailed to customer.
**How to apply:** When adding Stripe, plug `sendOrderReceipt` / `sendOwnerNotification` into the webhook handler instead of the direct `/place-order` route.
