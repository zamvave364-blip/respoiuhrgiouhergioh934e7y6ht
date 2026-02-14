document.addEventListener("DOMContentLoaded", function() {

/* ================= ПЕРЕКЛЮЧЕНИЕ ЭТАПОВ ================= */

function goToStage(num) {
  document.querySelectorAll('.stage').forEach(stage => {
    stage.classList.remove('active');
  });

  const next = document.getElementById('stage' + num);
  if (next) next.classList.add('active');
}


/* ================= ЭТАП 1 ================= */

const heart = document.getElementById("heart");
const afterHeart = document.getElementById("after-heart");
const envelope = document.getElementById("envelope");

if (heart) {
  heart.addEventListener("click", () => {
    heart.style.opacity = "0";

    setTimeout(() => {
      heart.style.display = "none";
      afterHeart.classList.remove("hidden");
      afterHeart.classList.add("show");
    }, 600);
  });
}

if (envelope) {
  envelope.addEventListener("click", () => {
    goToStage(2);
    startLetter();
  });
}


/* ================= ЭТАП 2 — ПИСЬМО ================= */

const nextBtn = document.getElementById("to-stage3");

function startLetter() {

  const text = [
    "Привет Аришенька",
    "я сделал этот сайтик для тебя и связал его с подарком на 14 февраля)",
    "прости если плохо сделал, он очень короткий, первый раз вообще занимаюсь",
    "написанием кодов всяких и мне помогал чатгпт с этой всей бедой ",
    "идея эта пришла вообще случайно я сидел на уроке втыкал думаю о прикол сделаю",
  ];

  const el = document.getElementById("letter-text");
  if (!el) return;

  el.innerHTML = "";

  let p = 0;
  let c = 0;

  function type() {
    if (c < text[p].length) {
      el.innerHTML += text[p][c];
      c++;
      setTimeout(type, 60);
    } else {
      el.innerHTML += "<br><br>";
      p++;
      c = 0;

      if (p < text.length) {
        setTimeout(type, 600);
      } else {
        nextBtn.classList.add("show");
      }
    }
  }

  type();
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    goToStage(3);
    if (stage3Index === 0) addStage3Compliment();
  });
}


/* ================= ЭТАП 3 ================= */

const complimentsStage3 = [
  "чудесная",
  "озорная",
  "красивая",
  "сказочная",
  "домашняя",
  "любимая",
  "милая",
];

let stage3Index = 0;

const container = document.getElementById("compliments-container");
const moreBtn = document.getElementById("more-btn");

function addStage3Compliment() {

  if (stage3Index < complimentsStage3.length) {

    const div = document.createElement("div");
    div.className = "compliment-block";

    div.innerHTML = `
      <div class="compliment-text">${complimentsStage3[stage3Index]}</div>
      <div class="compliment-photos">
        <img src="photos/p${stage3Index*2+1}.jpg">
        <img src="photos/p${stage3Index*2+2}.jpg">
      </div>
    `;

    container.appendChild(div);
    stage3Index++;

    if (stage3Index === complimentsStage3.length) {
      moreBtn.innerText = "любознательная";
    }

  } else {
    startKiss();
  }
}

if (moreBtn) {
  moreBtn.addEventListener("click", addStage3Compliment);
}


/* ================= ПОЦЕЛУЙ ================= */

function startKiss() {
  const kiss = document.getElementById("kiss");
  if (!kiss) return;

  kiss.classList.remove("hidden");

  setTimeout(() => {
    kiss.classList.add("hidden");
    goToStage(4);
  }, 1400);
}


/* ================= ТАЙМЕР ================= */

const startDate = new Date("2025-06-14T23:31:00");

function updateTimer() {

  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();

  const temp = new Date(startDate);
  temp.setFullYear(startDate.getFullYear() + years);

  if (now < temp) {
    years--;
    temp.setFullYear(startDate.getFullYear() + years);
  }

  const diff = now - temp;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  const timer = document.getElementById("timer");
  if (!timer) return;

  timer.innerHTML = `
    ${years} лет<br>
    ${days} дней<br>
    ${hours} часов<br>
    ${minutes} минут<br>
    ${seconds} секунд
  `;
}

setInterval(updateTimer, 1000);
updateTimer();


/* ================= ЭТАП 5 — ИГРА ================= */

const complimentsGame = [
  "умничка","умница","горжусь","лучшая!","невероятная",
  "самая самая","умничка","невероятная","умница","лучшая!",
];

let found = 0;
let moveInterval;

function startGame() {

  const area = document.getElementById("gameArea");
  const counter = document.getElementById("counter");

  if (!area) return;

  area.innerHTML = "";
  found = 0;
  counter.innerText = "Поймано 0/10 риечек";


  for (let i = 0; i < 10; i++) {

    const img = document.createElement("img");
    img.src = "riechka.png";
    img.className = "riechka";

    moveRandom(img);

    img.addEventListener("click", (e) => {

      const x = e.clientX;
      const y = e.clientY;

      showCompliment(complimentsGame[i], x, y);

      img.remove();

      found++;
      counter.innerText = `Поймано ${found}/10 риечек`;


      if (found === 10) {
        showFinish(area);
      }
    });

    area.appendChild(img);
  }

  moveInterval = setInterval(() => {
    document.querySelectorAll(".riechka").forEach(moveRandom);
  }, 3000);
}

function moveRandom(el) {
  const x = Math.random() * (window.innerWidth - 80);
  const y = Math.random() * (window.innerHeight - 80);
  el.style.left = x + "px";
  el.style.top = y + "px";
}

function showCompliment(text, x, y) {
  const div = document.createElement("div");
  div.className = "floating-compliment";
  div.innerText = text;
  div.style.left = x + "px";
  div.style.top = y + "px";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 1500);
}

function showFinish(area) {
  clearInterval(moveInterval);

  const big = document.createElement("img");
  big.src = "riechka.png";
  big.className = "big-riechka";

  const text = document.createElement("div");
  text.className = "big-text";
  text.innerText = "дальше";

  big.onclick = () => goToStage(6);

  area.appendChild(big);
  area.appendChild(text);
}


/* ================= КНОПКИ 6-7 ================= */

document.getElementById("to-stage5")?.addEventListener("click", () => {
  goToStage(5);
  startGame();
});

document.getElementById("to-stage7")?.addEventListener("click", () => {
  goToStage(7);
});




});


