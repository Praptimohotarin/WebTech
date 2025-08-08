document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const showError = (msg, el) => {
      alert(msg);
      el.focus();
      return false;
    };

    // Check required fields
    const required = ['firstname', 'lastname', 'address1', 'city', 'state', 'zip', 'country', 'phone', 'email'];
    for (let id of required) {
      const el = document.getElementById(id);
      if (!el.value.trim()) return showError(${el.previousElementSibling.innerText} is required., el);
    }

    // Email simple check
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('Enter a valid email.', document.getElementById('email'));

    // Phone check (7-15 digits)
    const phone = document.getElementById('phone').value.trim();
    if (!/^\d{7,15}$/.test(phone)) return showError('Enter a valid phone number.', document.getElementById('phone'));

    // Zip numeric check (4-10 digits)
    const zip = document.getElementById('zip').value.trim();
    if (!/^\d{4,10}$/.test(zip)) return showError('Enter a valid zip code.', document.getElementById('zip'));

    // Donation amount check
    const radios = [...form.querySelectorAll('input[name="donation_amount"]')];
    const otherAmount = document.getElementById('other_amount').value.trim();
    const radioSelected = radios.some(r => r.checked && r.value !== 'None');
    if (!radioSelected && otherAmount === '') return showError('Select or enter a donation amount.', document.getElementById('other_amount'));

    if (otherAmount !== '' && (isNaN(otherAmount) || Number(otherAmount) <= 0)) {
      return showError('Enter a valid positive number for Other Amount.', document.getElementById('other_amount'));
    }

    // Recurring donation validation
    const recurring = form.querySelector('input[name="recurring_donation"]');
    if (recurring.checked) {
      const monthly = document.getElementById('monthly_credit_card_amount').value.trim();
      const months = document.getElementById('recurring_months').value.trim();
      if (!monthly || isNaN(monthly) || Number(monthly) <= 0) return showError('Enter valid monthly amount.', document.getElementById('monthly_credit_card_amount'));
      if (!months || isNaN(months) || Number(months) < 1) return showError('Enter valid number of months.', document.getElementById('recurring_months'));
    }

    // Honorarium donation name check if selected
    const donationTypeSelected = [...form.querySelectorAll('input[name="donation_type"]')].some(r => r.checked);
    if (donationTypeSelected) {
      const honorName = document.getElementById('honor_name').value.trim();
      if (!honorName) return showError('Enter name for honorarium/memorial donation.', document.getElementById('honor_name'));
    }

    // All good - submit form
    form.submit();
  });
});