'use strict';
(() => {
  const form = document.getElementById('option-request');
  if (!form) return;
  const product = document.getElementById('product');
  const title = document.getElementById('product-title');
  const summary = document.getElementById('selected-product');
  const emailLink = document.getElementById('email-request');
  const prepare = document.getElementById('prepare-email');
  const preview = document.getElementById('email-preview');
  const openEmail = document.getElementById('open-request-email');
  const gmailLink = document.getElementById('open-request-gmail');
  const requestText = document.getElementById('request-email-text');
  prepare.disabled = false;
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
  form.addEventListener('submit', event => {
    event.preventDefault();
    updateProduct();
    const data = new FormData(form);
    const subject = 'Second-option quote request — ' + product.value;
    const body = [
      'QUOTE REQUEST ONLY — not a purchase or payment.',
      '',
      'Product: ' + title.value,
      'Reference: ' + product.value,
      'Name: ' + data.get('name'),
      'Reply email: ' + data.get('email'),
      'Delivery state: ' + data.get('delivery_state'),
      'Delivery ZIP: ' + data.get('delivery_zip'),
      'Quantity: ' + data.get('quantity'),
      'Preferred total budget: ' + (data.get('preferred_budget') || 'Not specified'),
      'Preferences: ' + (data.get('preferences') || 'Not specified'),
      '',
      'Please confirm the exact item, availability, full delivered price and return terms before any payment.'
    ].join('\n');
    requestText.value = 'Subject: ' + subject + '\n\n' + body;
    openEmail.href = 'mailto:whatisthetruthrudy@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const gmail = new URL('https://mail.google.com/mail/');
    gmail.search = new URLSearchParams({view:'cm', fs:'1', to:'whatisthetruthrudy@gmail.com', su:subject, body:body}).toString();
    gmailLink.href = gmail.href;
    preview.hidden = false;
    preview.focus();
  });
})();
