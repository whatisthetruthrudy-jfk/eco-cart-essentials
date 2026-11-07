'use strict';
(() => {
  const form = document.getElementById('option-request');
  if (!form) return;
  const catalog = JSON.parse(document.getElementById('offer-catalog').textContent);
  const product = document.getElementById('product');
  const reference = document.getElementById('request-reference');
  reference.value = 'LHG-' + (globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,10));
  const supplied = new URLSearchParams(location.search).get('product');
  if (Object.hasOwn(catalog, supplied)) product.value = supplied;
  function update() {
    const offer = catalog[product.value];
    const panel = document.getElementById('requested-offer');
    panel.hidden = !offer;
    document.getElementById('product-title').value = offer?.original || '';
    document.getElementById('selected-alternative').value = offer?.name || 'Supplier match requested; no specific alternative selected';
    document.getElementById('supplier-source').value = offer?.source || '';
    document.getElementById('request-subject').value = 'LHG purchase request — ' + product.value + ' — ' + reference.value;
    document.getElementById('selected-product').textContent = offer ? 'Original: ' + offer.original : '';
    document.getElementById('offer-name').textContent = offer?.name || 'Find an alternative for me';
    document.getElementById('offer-differences').textContent = offer?.differences || 'We will research a suitable supplier product before offering a quote.';
    const picture = document.getElementById('offer-image');
    picture.hidden = !offer?.image;
    panel.classList.toggle('no-picture', !offer?.image);
    if (offer?.image) { picture.src = offer.image; picture.alt = offer.name; }
    else { picture.removeAttribute('src'); picture.alt = ''; }
    const body = ['PURCHASE REQUEST ONLY — NOT PAID', 'Request: ' + reference.value,
      'Original: ' + (offer?.original || ''), 'Alternative: ' + (offer?.name || 'Supplier match requested'),
      'Product reference: ' + product.value, 'Supplier listing: ' + (offer?.source || 'Not yet selected'),
      'Name:', 'Reply email:', 'Delivery state and ZIP:', 'Quantity:', 'Variant/preferences:',
      'Please confirm availability, delivered price and return terms before payment.'].join('\n');
    document.getElementById('email-request').href = 'mailto:whatisthetruthrudy@gmail.com?subject=' + encodeURIComponent('LHG purchase request — ' + product.value) + '&body=' + encodeURIComponent(body);
  }
  product.addEventListener('change', update);
  form.addEventListener('submit', () => { update(); });
  update();
})();
