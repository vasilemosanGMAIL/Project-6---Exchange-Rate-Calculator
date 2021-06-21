//URL valiables
const exchangeURL =
  "https://v6.exchangerate-api.com/v6/5107cadc80d91cd9bcbe98d5/latest/";
const eurtomdlURL =
  "https://v6.exchangerate-api.com/v6/5107cadc80d91cd9bcbe98d5/pair/EUR/MDL";

//dom elements
const currency1 = document.getElementById("currency1");
const currency2 = document.getElementById("currency2");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const currencyRate = document.getElementById("currencyRate");
const swap = document.getElementById("swap");

//load default currency rate for EUR/MDL pair
document.addEventListener("DOMContentLoaded", getDefaultCurrency);
//getDefaultCurrency for getDefaultCurrency
async function getDefaultCurrency() {
  try {
    const currencylist = await fetch(eurtomdlURL);
    const currencyData = await currencylist.json();
    //console.log(currencyData);
    currencyRate.innerHTML = currencyData.conversion_rate;
  } catch (error) {
    console.log(error);
  }
}

//event listeners
currency1.addEventListener("change", getRates);
currency2.addEventListener("change", getRates);
value1.addEventListener("input", getRates);
value2.addEventListener("input", getRates);
swap.addEventListener("click", () => {
  const tmp = currency1.value;
  currency1.value = currency2.value;
  currency2.value = tmp;
  getRates();
});

async function getRates() {
  let selctedCurrency1 = currency1.value;
  let selctedCurrency2 = currency2.value;

  try {
    const ratelist = await fetch(`${exchangeURL}${selctedCurrency1}`);
    const rateData = await ratelist.json();
    currencyRate.innerHTML = rateData.conversion_rates[selctedCurrency2];
    //console.log(currencyRate.innerText);
    value2.value = value1.value * currencyRate.innerText;
    // console.log(value2.value);
  } catch (error) {
    console.log(error);
  }
  // e.preventDefault();
}

getRates();
