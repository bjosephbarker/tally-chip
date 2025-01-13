const totalDisplay = document.getElementById("total");
let total = 0;
const clickCounts = {};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function updateTotalDisplay() {
  totalDisplay.textContent = `Total: ${formatCurrency(total)}`;
}

document.querySelectorAll(".chip-button").forEach((button, index) => {
  clickCounts[index] = 0;

  button.addEventListener("click", () => {
    const chipValue = parseInt(button.getAttribute("data-value"), 10);

    total += chipValue;

    clickCounts[index]++;

    updateTotalDisplay();

    const countDisplay = button.nextElementSibling;
    countDisplay.textContent = clickCounts[index];
  });
});

document.getElementById("reset-button").addEventListener("click", () => {
  total = 0;

  document.querySelectorAll(".chip-count").forEach((countDisplay, index) => {
    clickCounts[index] = 0;
    countDisplay.textContent = "0";
  });

  updateTotalDisplay();
});

document.getElementById("copy-button").addEventListener("click", () => {
  const totalText = totalDisplay.textContent.replace("Total: ", "");
  navigator.clipboard
    .writeText(totalText)
    .then(() => {
      alert(`Copied to clipboard: ${totalText}`);
    })
    .catch(() => {
      alert("Failed to copy to clipboard.");
    });
});
