const rangeInput = document.getElementById('custom-range');
const rangeValue = document.getElementById('range-value');
const boxes = document.querySelectorAll('.box');
const button = document.getElementById('generate-button');
const strengthText = document.getElementById('strength-text');
const checkboxes = document.querySelectorAll("input[type='checkbox']");
// const passwordInput = document.querySelector("input[type='text']");
const passwordInput = document.getElementById('generated-password');
console.dir(passwordInput);

const copyButton = document.querySelector('.copy');

const strength = [
  ['TOO WEAK!', 'var(--red)'],
  ['WEAK', 'var(--orange)'],
  ['MEDIUM', 'var(--yellow)'],
  ['STRONG', 'var(--neonGreen)'],
];

const lowerCaseLetters = Array.from(Array(26)).map((_, i) =>
  String.fromCharCode(i + 97)
);
const upperCaseLetters = lowerCaseLetters.map((letter) => letter.toUpperCase());
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['@', '$', '#', '%'];

function updateRangeUI() {
  let value = Number(rangeInput.value);
  const max = Number(rangeInput.max);
  const min = Number(rangeInput.min);

  if (value < 4) {
    value = 4;
    rangeInput.value = 4;
  }

  const percent = ((value - min) / (max - min)) * 100;

  rangeValue.textContent = Math.round(value);

  rangeInput.style.background = `
    linear-gradient(
      to right,
      var(--neonGreen) ${percent}%,
      var(--veryDarkGrey) ${percent + 0.1}% 100%
    )
  `;
}

function updateStrength() {
  const checkboxValues = [...checkboxes].map((input) => input.checked);
  const count = checkboxValues.filter(Boolean).length;

  for (let i = 0; i < 4; i++) {
    boxes[i].style.backgroundColor = 'var(--veryDarkGrey)';
    boxes[i].style.border = '2px solid var(--almostWhite)';
  }
  for (let i = 0; i < count; i++) {
    strengthText.textContent = strength[count - 1][0];
    boxes[i].style.backgroundColor = strength[count - 1][1];
    boxes[i].style.border = 'none';
  }
}

function generatePassword() {
  const length = Number(rangeValue.textContent);
  const [hasUppercase, hasLowercase, hasNumbers, hasSymbols] = [
    ...checkboxes,
  ].map((input) => input.checked);

  const availableCharacters = [
    ...(hasSymbols ? symbols : []),
    ...(hasNumbers ? numbers : []),
    ...(hasLowercase ? lowerCaseLetters : []),
    ...(hasUppercase ? upperCaseLetters : []),
  ];

  passwordInput.value = Array.from(
    { length },
    () =>
      availableCharacters[
        Math.floor(Math.random() * availableCharacters.length)
      ]
  ).join('');

  if (!availableCharacters.length) {
    passwordInput.value = '';
    passwordInput.style.opacity = '0.5';
    return;
  }
}

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyButton.style.opacity = '0.3';
  setTimeout(() => {
    copyButton.style.opacity = '1';
  }, 3000);
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateStrength);
});
updateStrength();

rangeInput.addEventListener('input', updateRangeUI);
updateRangeUI();

button.addEventListener('click', generatePassword);
