const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

let radius;

/**
 * Past de canvas-grootte aan op basis van de beschikbare schermruimte
 * Zorgt voor een vierkant canvas dat past binnen de viewport
 */
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;

  canvas.width = size;
  canvas.height = size;

  radius = canvas.height / 2;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(radius, radius);
}

function drawOutlineHand(ctx, length, width, bgcolor) {
  // Hoofdwijzer (zilverkleurig)
  ctx.beginPath();
  let x = 0;
  let y = 0;
  ctx.moveTo(x, y); // A N
  console.log("Hand A, x:", x, "y:", y);

  x = 0;
  y = -width * 0.5;
  ctx.lineTo(x, y); // B M
  console.log("Hand B, x:", x, "y:", y);

  x = (length * 1) / 15;
  y = -width * 0.5;
  ctx.lineTo(x, y); // C L
  console.log("Hand C, x:", x, "y:", y);

  x = (length * 2) / 15;
  y = -width * (1 + 0.5);
  ctx.lineTo(x, y); // D K
  console.log("Hand D, x:", x, "y:", y);

  x = (length * 10) / 15;
  y = -width * (1 + 0.5);
  ctx.lineTo(x, y); // E J
  console.log("Hand E, x:", x, "y:", y);

  x = (length * 11) / 15;
  y = -width * 0.5;
  ctx.lineTo(x, y); // F I
  console.log("Hand F, x:", x, "y:", y);

  x = (length * 15) / 15;
  y = -width * 0.5;
  ctx.lineTo(x, y); // G H
  console.log("Hand G, x:", x, "y:", y);

  x = (length * 15) / 15;
  y = +width * 0.5;
  ctx.lineTo(x, y); // H G
  console.log("Hand H, x:", x, "y:", y);

  x = (length * 11) / 15;
  y = +width * 0.5;
  ctx.lineTo(x, y); // I F
  console.log("Hand I, x:", x, "y:", y);

  x = (length * 10) / 15;
  y = +width * (1 + 0.5);
  ctx.lineTo(x, y); // I F
  console.log("Hand J, x:", x, "y:", y);

  x = (length * 2) / 15;
  y = +width * (1 + 0.5);
  ctx.lineTo(x, y); // K D
  console.log("Hand K, x:", x, "y:", y);

  x = (length * 1) / 15;
  y = +width * 0.5;
  ctx.lineTo(x, y); // L C
  console.log("Hand K, x:", x, "y:", y);

  x = 0;
  y = +width * 0.5;
  ctx.lineTo(x, y); // M B
  console.log("Hand M, x:", x, "y:", y);

  x = 0;
  y = 0;
  ctx.lineTo(x, y); // N A
  console.log("Hand N, x:", x, "y:", y);

  ctx.closePath();
  ctx.fillStyle = bgcolor;
  ctx.fill();
}

function drawInsidelineHand(ctx, length, width, fgcolor) {
  // Hoofdwijzer (zilverkleurig)
  ctx.beginPath();
  let x = (length * 2) / 15;
  let y = 0;
  ctx.moveTo(x, y); // A1
  console.log("Hand A1, x:", x, "y:", y);

  x = (length * (2 + 0.8)) / 15;
  y = -width * (1 - 0.2);
  ctx.lineTo(x, y); // B1
  console.log("Hand B1, x:", x, "y:", y);

  x = (length * (10 - 0.8)) / 15;
  y = -width * (1 - 0.2);
  ctx.lineTo(x, y); // C1 E1
  console.log("Hand C1, x:", x, "y:", y);

  x = (length * (11 - 0.8)) / 15;
  y = 0;
  ctx.lineTo(x, y); // D1
  console.log("Hand D1, x:", x, "y:", y);

  x = (length * (10 - 0.8)) / 15;
  y = +width * (1 - 0.2);
  ctx.lineTo(x, y); // E1 C1
  console.log("Hand E1, x:", x, "y:", y);

  x = (length * (2 + 0.8)) / 15;
  y = +width * (1 - 0.2);
  ctx.lineTo(x, y); // F1 B1
  console.log("Hand F1, x:", x, "y:", y);

  x = (length * 2) / 15;
  y = 0;
  ctx.lineTo(x, y); // G1 A1
  console.log("Hand G1, x:", x, "y:", y);

  ctx.closePath();
  ctx.fillStyle = fgcolor;
  ctx.fill();
}

/**
 * Tekent een wijzer met luminescerende tip (Breitling stijl)
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} pos - Positie van de wijzer in radialen
 * @param {number} length - Lengte van de wijzer
 * @param {number} width - Dikte van de wijzer
 * @param {string} color - Kleur van de wijzer
 */
function drawHand(ctx, pos, length, width, bgcolor = "black", fgcolor = "red") {
  ctx.save();
  ctx.rotate(pos);

  drawOutlineHand(ctx, length, width, bgcolor);
  drawInsidelineHand(ctx, length, width, fgcolor);

  ctx.restore();
}

function drawTest() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  let minute = 0;
  let second = 0;

  // Minuutwijzer
  let minutePos =
    (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60) - Math.PI / 2;
  let length = radius * 0.8;
  let width = radius * 0.04;
  console.log(`minutePos: ${minutePos}, length: ${length}, width: ${width}`);

  //drawHand(ctx, minutePos, length, width, "#c0c0c0");
  drawHand(ctx, minutePos, length, width, "#c0c0c0");

  //  requestAnimationFrame(drawTest);
}

// Event listener voor window resize
window.addEventListener("resize", () => {
  resizeCanvas();
});

resizeCanvas();
//requestAnimationFrame(drawTest);
//drawTest();

/** Clock
 * Tekent een Breitling-stijl klok met wijzers, subdials en datuminformatie
 */

/**
 * Tekent de wijzerplaat van de klok in Breitling stijl
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawFace(
  ctx,
  radius,
  bgcolor = "#1a1a1a",
  bordercolor = "#c0c0c0",
  centercolor = "#c0c0c0"
) {
  // Donkere achtergrond (zoals Breitling)
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.97, 0, 2 * Math.PI);
  ctx.fillStyle = bgcolor; // "#464040ff"; //"#ebebebff"; //"#1a1a1a";
  ctx.fill();

  // Buitenste zilverkleurige ring
  ctx.strokeStyle = bordercolor; //"#c0c0c0";
  ctx.lineWidth = radius * 0.06;
  ctx.stroke();

  // Binnenste ring
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
  ctx.strokeStyle = bordercolor; //"#808080";
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();

  // Middenpunt
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.04, 0, 2 * Math.PI);
  ctx.fillStyle = centercolor; // "#c0c0c0";
  ctx.fill();
}

/**
 * Tekent driehoekige uurmarkeringen
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawHourMarkers(ctx, radius, fgcolor = "white") {
  const triangleHeight = radius * 0.08;
  const triangleBase = radius * 0.04;

  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6;

    let xOuter = Math.cos(angle) * radius * 0.88;
    let yOuter = Math.sin(angle) * radius * 0.88;

    let perpAngle = angle + Math.PI / 2;
    let xBase1 = xOuter + Math.cos(perpAngle) * (triangleBase / 2);
    let yBase1 = yOuter + Math.sin(perpAngle) * (triangleBase / 2);
    let xBase2 = xOuter - Math.cos(perpAngle) * (triangleBase / 2);
    let yBase2 = yOuter - Math.sin(perpAngle) * (triangleBase / 2);

    let xTip = Math.cos(angle) * (radius * 0.88 - triangleHeight);
    let yTip = Math.sin(angle) * (radius * 0.88 - triangleHeight);

    ctx.beginPath();
    ctx.moveTo(xBase1, yBase1);
    ctx.lineTo(xBase2, yBase2);
    ctx.lineTo(xTip, yTip);
    ctx.closePath();
    ctx.fillStyle = fgcolor; // "#ffffff";
    ctx.fill();
  }
}

/**
 * Tekent minuutstreepjes
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawMinuteTicks(ctx, radius, fgcolor = "gray") {
  const tickLength = radius * 0.04;
  const tickWidth = radius * 0.008;

  for (let i = 0; i < 60; i++) {
    // Skip de posities waar de uurmarkeringen zijn
    if (i % 5 !== 0) {
      let angle = (i * Math.PI) / 30;

      let xStart = Math.cos(angle) * (radius * 0.88);
      let yStart = Math.sin(angle) * (radius * 0.88);
      let xEnd = Math.cos(angle) * (radius * 0.88 - tickLength);
      let yEnd = Math.sin(angle) * (radius * 0.88 - tickLength);

      ctx.beginPath();
      ctx.lineWidth = tickWidth;
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = fgcolor; //"#a0a0a0";
      ctx.stroke();
    }
  }
}

/**
 * Tekent de nummers op de wijzerplaat in Breitling stijl
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawNumbers(ctx, radius, fgcolor = "white") {
  ctx.font = `${radius * 0.13}px Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = fgcolor; // "#ffffff";

  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6 - Math.PI / 2;
    let x = Math.cos(angle) * radius * 0.68;
    let y = Math.sin(angle) * radius * 0.68;

    ctx.fillText(numbers[i].toString(), x, y);
  }
}

/**
 * Tekent de huidige tijd met Breitling-stijl wijzers
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawTime(ctx, radius, bgcolor = "black", fgcolor = "red") {
  const now = new Date();
  let hour = now.getHours() % 12;
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ms = now.getMilliseconds();

  // Uurwijzer
  let hourPos =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60) -
    Math.PI / 2;
  drawHand(ctx, hourPos, radius * 0.45, radius * 0.035, bgcolor, fgcolor);

  // Minuutwijzer
  let minutePos =
    (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60) - Math.PI / 2;
  drawHand(ctx, minutePos, radius * 0.65, radius * 0.025, bgcolor, fgcolor);

  // Secondewijzer (dun en rood, zoals chronograaf)
  let secondPos =
    (second * Math.PI) / 30 + (ms * Math.PI) / (30 * 1000) - Math.PI / 2;
  ctx.save();
  ctx.rotate(secondPos);
  ctx.beginPath();
  ctx.moveTo(-radius * 0.1, 0);
  ctx.lineTo(radius * 0.75, 0);
  ctx.strokeStyle = fgcolor;
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
  ctx.restore();
}

/**
 * Tekent datuminformatie in twee boxen naast elkaar ter hoogte van de 3
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawDateInfo(
  ctx,
  radius,
  bgcolor = "#0a0a0a",
  daynamecolor = "#ff3333",
  daynumbercolor = "#ffffff",
  outlinecolor = "#606060"
) {
  const now = new Date();

  const weekdays = ["ZO", "MA", "DI", "WO", "DO", "VR", "ZA"];
  const weekday = weekdays[now.getDay()];
  const day = now.getDate();

  const centerX = radius * 0.45;
  const centerY = 0;
  const boxWidth = radius * 0.16;
  const boxHeight = radius * 0.14;
  const boxSpacing = radius * 0.02;

  // Linker box (weekdag)
  const weekdayBoxX = centerX - boxWidth / 2 - boxSpacing / 2;

  ctx.fillStyle = bgcolor; // "#0a0a0a";
  ctx.fillRect(
    weekdayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.strokeStyle = outlinecolor; // "#606060";
  ctx.lineWidth = radius * 0.008;
  ctx.strokeRect(
    weekdayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.fillStyle = daynamecolor; // "#ff3333";
  ctx.font = `bold ${radius * 0.07}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(weekday, weekdayBoxX, centerY);

  // Rechter box (dag)
  const dayBoxX = centerX + boxWidth / 2 + boxSpacing / 2;

  ctx.fillStyle = bgcolor; //"#0a0a0a";
  ctx.fillRect(
    dayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.strokeStyle = outlinecolor; // "#606060";
  ctx.lineWidth = radius * 0.008;
  ctx.strokeRect(
    dayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.fillStyle = daynumbercolor; // "#ffffff";
  ctx.font = `bold ${radius * 0.09}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(day.toString(), dayBoxX, centerY);
}

/**
 * Hoofdfunctie die de volledige klok tekent in Breitling stijl
 */

let handbgcolor = "#504949ff";
let handfgcolor = "#ff0000ff";

let facebgcolor = "black"; // "#88483fff"; //"#1a1a1aff";
let facebordercolor = "#c0c0c0ff";
let facecentercolor = handbgcolor; // "#c0c0c0ff";

let daybgcolor = "black"; // facebgcolor;
let daynamecolor = "#ff3333ff";
let daynumbercolor = "#a0a0a0ff"; // "#ffffffff";
let dayoutlinecolor = facebordercolor; // "#606060ff";

let hourmarkercolor = "#ffffffff";
let minutetickcolor = "#a0a0a0ff";
let numbercolor = "#ffffffff";

function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

  drawFace(ctx, radius, facebgcolor, facebordercolor, facecentercolor);
  drawHourMarkers(ctx, radius, hourmarkercolor);
  drawMinuteTicks(ctx, radius, minutetickcolor);
  drawNumbers(ctx, radius, numbercolor);
  //  drawSubDials(ctx, radius);
  drawDateInfo(
    ctx,
    radius,
    daybgcolor,
    daynamecolor,
    daynumbercolor,
    dayoutlinecolor
  );
  drawTime(ctx, radius, handbgcolor, handfgcolor);

  requestAnimationFrame(drawClock);
}

requestAnimationFrame(drawClock);
