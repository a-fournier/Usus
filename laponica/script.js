const symbolHtml = document.getElementsByClassName("symbol")[0];
const combosHtml = document.getElementsByClassName("combos")[0];
const pointsHtml = document.getElementsByClassName("points")[0];
const checkboxHtml = document.getElementsByClassName('checkbox')[0];
const tablebodyHtml = document.getElementsByClassName("table-body")[0];

let hiraganaKatakana = checkboxHtml.checked ? katakana : hiragana;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomSymbol() {
  const random = getRandomInt(hiraganaKatakana.length);
  return hiraganaKatakana[random];
}

function setSymbol() {
  if (this.symbol) {
    document.getElementsByClassName(
      `learn-${this.symbol.roman}`
    )[0].className = `learn-${this.symbol.roman}`;
  }

  this.symbol = getRandomSymbol();
  symbolHtml.textContent = this.symbol.romaji;

  document.getElementsByClassName(
    `learn-${this.symbol.roman}`
  )[0].className += ` current-${
    checkboxHtml.checked ? "katakana" : "hiragana"
  }`;
}

async function handleClick(target) {
  const symbol = this.symbol;
  const response = document.getElementsByClassName(symbol.roman)[0];

  if (target === symbol.roman) {
    const currentCombo = parseInt(combosHtml.textContent.substring(2));
    const points = parseInt(pointsHtml.textContent);

    response.className = response.className.split(" ")[0];
    await delay(10);
    response.className += " valid";

    pointsHtml.textContent = points + currentCombo + 1;
    combosHtml.textContent = `+ ${currentCombo + 1}`;
  } else {
    response.className = response.className.split(" ")[0];
    await delay(10);
    response.className += " error";

    combosHtml.textContent = "+ 0";
  }

  setSymbol(getRandomSymbol());
  combosHtml.className = "combos";
  await delay(1250);
  combosHtml.className = "combos hidden";
}

function addSymbols(symbols, className) {
  const elementHtml = document.getElementsByClassName(className)[0];
  const title = document.getElementsByClassName("title")[0];
  const tr = document.createElement("tr");

  title.textContent = `LEARN - ${
    checkboxHtml.checked ? "KATAKANA" : "HIRAGANA"
  }`;

  symbols.forEach((element) => {
    const text = document.createElement("p");
    text.className = element.roman;
    text.textContent = element.roman;

    const td = document.createElement("td");
    const roman = document.createElement("p");
    const romaji = document.createElement("p");

    roman.textContent = element.roman;
    romaji.textContent = element.romaji;
    td.className = `learn-${element.roman}`;

    td.appendChild(roman);
    td.appendChild(romaji);
    tr.appendChild(td);

    text.addEventListener("click", (e) => handleClick(e.target.textContent));
    elementHtml.appendChild(text);
  });
  tablebodyHtml.appendChild(tr);
}

function loadSymbols() {
  addSymbols(hiraganaKatakana.slice(0, 5), "a");
  addSymbols(hiraganaKatakana.slice(5, 10), "ka");
  addSymbols(hiraganaKatakana.slice(10, 15), "sa");
  addSymbols(hiraganaKatakana.slice(15, 20), "ta");
  addSymbols(hiraganaKatakana.slice(20, 25), "na");
  addSymbols(hiraganaKatakana.slice(25, 30), "ha");
  addSymbols(hiraganaKatakana.slice(30, 35), "ma");
  addSymbols(hiraganaKatakana.slice(35, 38), "ya");
  addSymbols(hiraganaKatakana.slice(38, 43), "ra");
  addSymbols(hiraganaKatakana.slice(43, 46), "wa");
  addSymbols(hiraganaKatakana.slice(46, 51), "ga");
  addSymbols(hiraganaKatakana.slice(51, 56), "za");
  addSymbols(hiraganaKatakana.slice(56, 61), "da");
  addSymbols(hiraganaKatakana.slice(61, 66), "ba");
  addSymbols(hiraganaKatakana.slice(66, 71), "pa");
}

loadSymbols();
setSymbol(getRandomSymbol);

checkboxHtml.addEventListener("change", () => {
  tablebodyHtml.innerHTML = null;
  document.getElementsByClassName("symbols")[0].innerHTML = `
  <div class="symbols-left">
    <div class="symbols-group a"></div>
    <div class="symbols-group ka"></div>
    <div class="symbols-group sa"></div>
    <div class="symbols-group ta"></div>
    <div class="symbols-group na"></div>
    <div class="symbols-group ha"></div>
    <div class="symbols-group ma"></div>
    <div class="symbols-group ra"></div>
  </div>
  <div class="symbols-center">
    <div class="symbols-group ya"></div>
    <div class="symbols-group wa"></div>
  </div>
  <div class="symbols-right">
    <div class="symbols-group ga"></div>
    <div class="symbols-group za"></div>
    <div class="symbols-group da"></div>
    <div class="symbols-group ba"></div>
    <div class="symbols-group pa"></div>
  </div>
  `;
  hiraganaKatakana = document.getElementsByClassName("checkbox")[0].checked
    ? katakana
    : hiragana;
  loadSymbols();
  setSymbol(getRandomSymbol);
});
