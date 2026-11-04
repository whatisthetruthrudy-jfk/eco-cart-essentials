'use strict';
(() => {
  const form = document.getElementById('option-request');
  if (!form) return;
  const product = document.getElementById('product');
  const title = document.getElementById('product-title');
  const summary = document.getElementById('selected-product');
  const emailLink = document.getElementById('email-request');
  const supplied = new URLSearchParams(location.search).get('product');
  if (supplied && Array.from(product.options).some(option => option.value === supplied)) {
    product.value = supplied;
  }
  function updateProduct() {
    const selected = product.selectedOptions[0];
    title.value = product.value ? selected.textContent : '';
    summary.textContent = product.value ? 'We’ll look for an alternative to this product.' : '';
    emailLink.href = 'mailto:whatisthetruthrudy@gmail.com?subject=' +
      encodeURIComponent('Second-option quote request' + (product.value ? ' — ' + product.value : '')) +
      '&body=' + encodeURIComponent('I would like a second option for: ' + title.value +
        '\nReference: ' + product.value + '\nDelivery state and ZIP:\nQuantity:\nPreferred total budget:\nFeatures I need:\n\nThis is a quote request, not a paid order.');
  }
  product.addEventListener('change', updateProduct);
  updateProduct();
  form.addEventListener('submit', () => {
    // The receiving service handles delivery. Do not claim a successful email or payment here.
    updateProduct();
  });
})();
