(() => {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  const button = form.querySelector('button');
  const status = document.getElementById('checkout-status');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    status.textContent = 'Opening secure test checkout…';
    try {
      const response = await fetch(form.action, {
        method: 'POST', credentials: 'same-origin', redirect: 'error',
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)),
      });
      if (!response.ok) throw new Error('Checkout unavailable');
      const data = await response.json();
      const destination = new URL(data.url);
      if (destination.origin !== 'https://checkout.stripe.com' && destination.origin !== location.origin) throw new Error('Unexpected destination');
      location.assign(destination.href);
    } catch {
      status.textContent = 'We could not open checkout. No payment was made. Please try again.';
      button.disabled = false;
    }
  });
})();
