import { stripe } from '../../../libs/stripe';

export default async function getSessionById(id: string) {
  return await stripe.checkout.sessions.retrieve(id);
}
