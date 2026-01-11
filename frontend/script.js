const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = Array.from(document.querySelectorAll('.tipBtn'));
const customTipInput = document.getElementById('customTip');
const tipPerPersonEl = document.getElementById('tipPerPerson');
const totalPerPersonEl = document.getElementById('totalPerPerson');
const errorEl = document.getElementById('error');
const resetBtn = document.getElementById('resetBtn');

let selectedTip = null; 

function formatCurrency(value) {
  return '₹' + Number(value).toFixed(2);
}

function clearTipSelection() {
  selectedTip = null;
  tipButtons.forEach(b => b.classList.remove('inactive'));
  customTipInput.value = '';
}

function calculate() {
  errorEl.textContent = '';
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value, 10);

  let tipPct = selectedTip;
  const customVal = parseFloat(customTipInput.value);
  if (!isNaN(customVal) && customVal >= 0) tipPct = customVal;

  if (isNaN(bill) || bill < 0) {
    tipPerPersonEl.textContent = formatCurrency(0);
    totalPerPersonEl.textContent = formatCurrency(0);
    errorEl.textContent = 'Enter a valid bill amount.';
    return;
  }
  if (isNaN(people) || people <= 0) {
    tipPerPersonEl.textContent = formatCurrency(0);
    totalPerPersonEl.textContent = formatCurrency(0);
    errorEl.textContent = 'Number of people must be at least 1.';
    return;
  }
  if (tipPct === null || isNaN(tipPct) || tipPct < 0) {
    tipPct = 0;
  }

  const totalTip = bill * (tipPct / 100);
  const tipPerPerson = totalTip / people;
  const totalPerPerson = (bill / people) + tipPerPerson;

  tipPerPersonEl.textContent = formatCurrency(tipPerPerson);
  totalPerPersonEl.textContent = formatCurrency(totalPerPerson);
  errorEl.textContent = '';
}

tipButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const pct = Number(btn.dataset.tip);
    if (selectedTip === pct) {
      selectedTip = null;
      btn.classList.remove('inactive');
    } else {
      selectedTip = pct;
      tipButtons.forEach(b => b.classList.remove('inactive'));
      btn.classList.add('inactive'); 
      customTipInput.value = '';
    }
    calculate();
  });
});

customTipInput.addEventListener('input', () => {
  selectedTip = null;
  tipButtons.forEach(b => b.classList.remove('inactive'));
  calculate();
});

[billInput, peopleInput].forEach(inp => inp.addEventListener('input', calculate));

resetBtn.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  clearTipSelection();
  tipPerPersonEl.textContent = formatCurrency(0);
  totalPerPersonEl.textContent = formatCurrency(0);
  errorEl.textContent = '';
});

(function init(){
  billInput.value = '';
  peopleInput.value = '1';
  clearTipSelection();
  tipPerPersonEl.textContent = formatCurrency(0);
  totalPerPersonEl.textContent = formatCurrency(0);
})();
