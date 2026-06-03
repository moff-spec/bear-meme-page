const memes = window.BEAR_MEMES || [];

const quote = document.querySelector("#quote");
const mainCard = document.querySelector("#mainCard");
const mainMeme = document.querySelector("#mainMeme");
const mainCaption = document.querySelector("#mainCaption");
const randomBtn = document.querySelector("#randomBtn");
const duelBtn = document.querySelector("#duelBtn");
const rainBtn = document.querySelector("#rainBtn");
const panicBtn = document.querySelector("#panicBtn");
const bearScore = document.querySelector("#bearScore");
const gallery = document.querySelector("#gallery");
const duelPanel = document.querySelector("#duelPanel");
const leftMeme = document.querySelector("#leftMeme");
const rightMeme = document.querySelector("#rightMeme");
const verdict = document.querySelector("#verdict");
const toast = document.querySelector("#toast");

const quotes = [
  "小熊熊别跑",
  "熊就要有个熊样",
  "有钱没钱，回家过年",
  "臭狗熊！",
  "惹我光头强，揍你没商量"
];

const verdicts = [
  "双熊怒吼，森林静音",
  "本局音量超标",
  "光头强撤退三公里",
  "树都被吼醒了",
  "怒气值突破蜂蜜罐",
  "森林法庭宣布：都很有压迫感"
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function setMain(meme) {
  mainMeme.src = meme.src;
  quote.textContent = pick(quotes);
  bearScore.textContent = `${Math.floor(72 + Math.random() * 28)}%`;
  mainCard.classList.remove("pop");
  void mainCard.offsetWidth;
  mainCard.classList.add("pop");
}

function showToast(text) {
  toast.textContent = text;
  toast.hidden = false;
  toast.classList.remove("toast");
  void toast.offsetWidth;
  toast.classList.add("toast");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 1250);
}

function memeRain() {
  const count = Math.min(18, memes.length);
  for (let index = 0; index < count; index += 1) {
    const img = document.createElement("img");
    img.className = "falling";
    img.src = pick(memes).src;
    img.style.left = `${Math.random() * 92}vw`;
    img.style.animationDelay = `${Math.random() * 0.55}s`;
    img.style.setProperty("--duration", `${2 + Math.random() * 1.8}s`);
    document.body.appendChild(img);
    img.addEventListener("animationend", () => img.remove());
  }
}

function runDuel() {
  const bearTwoRoar = memes.find((meme) => meme.src.endsWith("meme-041.png")) || pick(memes);
  const bearOneRoar = memes.find((meme) => meme.src.endsWith("meme-042.png")) || pick(memes);
  leftMeme.src = bearTwoRoar.src;
  rightMeme.src = bearOneRoar.src;
  verdict.textContent = pick(verdicts);
  duelPanel.hidden = false;
  duelPanel.classList.remove("roar");
  void duelPanel.offsetWidth;
  duelPanel.classList.add("roar");
  duelPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function panic() {
  document.body.classList.remove("panic");
  void document.body.offsetWidth;
  document.body.classList.add("panic");
  showToast("光头强预警：全员进入抽象状态");
  setMain(pick(memes));
}

function renderGallery() {
  gallery.innerHTML = "";
  memes.forEach((meme, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.title = `meme ${index + 1}`;
    const img = document.createElement("img");
    img.src = meme.src;
    img.alt = `熊大熊二表情包 ${index + 1}`;
    button.appendChild(img);
    button.addEventListener("click", () => {
      setMain(meme);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    gallery.appendChild(button);
  });
}

if (memes.length) {
  setMain(pick(memes));
  renderGallery();
} else {
  quote.textContent = "素材文件夹里暂时没有熊味。";
}

randomBtn.addEventListener("click", () => setMain(pick(memes)));
duelBtn.addEventListener("click", runDuel);
rainBtn.addEventListener("click", memeRain);
panicBtn.addEventListener("click", panic);
