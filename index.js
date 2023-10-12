document.addEventListener('DOMContentLoaded', function () {
    const targetCurrencySelect = document.getElementById('targetCurrency');
    const resultDiv = document.getElementById('result');
    const convertButton = document.getElementById('convert');

    const apiKey = 'ddb8da390e14137b17dce5ffcf7236d3'; // Your Fixer.io API key
    const apiUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

    // Fetch the exchange rate data when the page loads
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                const exchangeRates = data.rates;

                // Populate the select dropdown with available currencies
                for (const currency in exchangeRates) {
                    const option = document.createElement('option');
                    option.value = currency;
                    option.textContent = currency;
                    targetCurrencySelect.appendChild(option);
                }

                // Function to handle currency conversion
                function handleConversion() {
                    const selectedCurrency = targetCurrencySelect.value;
                    const exchangeRate = exchangeRates[selectedCurrency];
                    const amountInUSD = parseFloat(document.getElementById('amount').value);
                    if (!isNaN(amountInUSD)) {
                        const convertedAmount = amountInUSD * exchangeRate;
                        resultDiv.textContent = `${amountInUSD} USD is approximately ${convertedAmount.toFixed(2)} ${selectedCurrency}`;
                    } else {
                        resultDiv.textContent = 'Please enter a valid amount in USD.';
                    }
                }

                // Add a click event listener to the "Convert" button
                convertButton.addEventListener('click', handleConversion);

                // Display the exchange rates for the selected currency
                targetCurrencySelect.addEventListener('change', handleConversion);
            } else {
                resultDiv.textContent = `API Error: ${data.error.info}`;
            }
        })
        .catch((error) => {
            resultDiv.textContent = `Error: ${error.message}`;
        });
});
