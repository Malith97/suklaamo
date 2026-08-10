# suklaamo

## Order Email Notifications

Set these environment variables for production order notifications:

- `RESEND_API_KEY` - Resend API key used by the server route.
- `ORDER_NOTIFICATION_EMAIL` - Primary inbox that receives new order emails.
- `ORDER_NOTIFICATION_EMAIL_CC` - Secondary inbox that also receives the same order email.
- `RESEND_FROM_EMAIL` - Optional sender identity. Defaults to `Suklaamo <onboarding@resend.dev>`.

The order notification flow is implemented in [app/api/order/route.ts](app/api/order/route.ts) and uses helper utilities in [lib/order-email.ts](lib/order-email.ts).