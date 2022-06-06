import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
      console.log(process.env.NEXT_STRIPE_PUBLISHABLE_KEY, "Stripe api kye")
    stripePromise = loadStripe('pk_test_51L7ezGIYFkyV9ocHzlhbNLZ7xbUqwJ92UTb017D3o0GH4KVgGrNoRwrihle70S6cKogJqRuvJZ0jmOrh0WSEQ94800YqrXYAa1');
  }

  return stripePromise;
};

export default getStripe;
