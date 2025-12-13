/**
 * Analoge klok in Breitling Chronograph Premier stijl
 * @file clock.js
 */

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

/**
 * Tekent de wijzerplaat van de klok in Breitling stijl
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawFace(ctx, radius) {
  // Donkere achtergrond (zoals Breitling)
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.975, 0, 2 * Math.PI);
  ctx.fillStyle = "#1a1a1a";
  ctx.fill();

  // Buitenste zilverkleurige ring
  ctx.strokeStyle = "#c0c0c0";
  ctx.lineWidth = radius * 0.06;
  ctx.stroke();

  // Binnenste ring
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.90, 0, 2 * Math.PI);
  ctx.strokeStyle = "#808080";
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();

  // Middenpunt
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.04, 0, 2 * Math.PI);
  ctx.fillStyle = "#c0c0c0";
  ctx.fill();
}

/**
 * Tekent driehoekige uurmarkeringen
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawHourMarkers(ctx, radius) {
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
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
}

/**
 * Tekent minuutstreepjes
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawMinuteTicks(ctx, radius) {
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
      ctx.strokeStyle = "#a0a0a0";
      ctx.stroke();
    }
  }
}

/**
 * Tekent de nummers op de wijzerplaat in Breitling stijl
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawNumbers(ctx, radius) {
  ctx.font = `${radius * 0.13}px Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";

  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  
  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6 - Math.PI / 2;
    let x = Math.cos(angle) * radius * 0.68;
    let y = Math.sin(angle) * radius * 0.68;
    
    ctx.fillText(numbers[i].toString(), x, y);
  }
}

/**
 * Tekent een sub-dial (kleine wijzerplaat)
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 * @param {number} x - X positie van het centrum
 * @param {number} y - Y positie van het centrum
 * @param {number} size - Straal van de sub-dial
 * @param {number} value - Waarde om weer te geven
 * @param {number} maxValue - Maximum waarde
 */
function drawSubDial(ctx, radius, x, y, size, value, maxValue) {
  // Cirkel
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = "#0a0a0a";
  ctx.fill();
  ctx.strokeStyle = "#606060";
  ctx.lineWidth = radius * 0.005;
  ctx.stroke();

  // Streepjes
  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6;
    let xStart = x + Math.cos(angle) * size * 0.85;
    let yStart = y + Math.sin(angle) * size * 0.85;
    let xEnd = x + Math.cos(angle) * size * 0.70;
    let yEnd = y + Math.sin(angle) * size * 0.70;

    ctx.beginPath();
    ctx.lineWidth = radius * 0.003;
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = "#808080";
    ctx.stroke();
  }

  // Wijzer
  let angle = (value / maxValue) * 2 * Math.PI - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + Math.cos(angle) * size * 0.6, y + Math.sin(angle) * size * 0.6);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
}

/**
 * Tekent alle drie de sub-dials
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawSubDials(ctx, radius) {
  const now = new Date();
  const subDialSize = radius * 0.15;

  // Linksboven: 30-minuten chronograaf (telt seconden / 2)
  const seconds = now.getSeconds();
  drawSubDial(ctx, radius, -radius * 0.35, -radius * 0.35, subDialSize, seconds / 2, 30);

  // Rechtsboven: 12-uren chronograaf (telt minuten / 5)
  const minutes = now.getMinutes();
  drawSubDial(ctx, radius, radius * 0.35, -radius * 0.35, subDialSize, minutes / 5, 12);

  // Onderaan: Doorlopende seconden
  drawSubDial(ctx, radius, 0, radius * 0.40, subDialSize, seconds, 60);
}

/**
 * Tekent een wijzer met luminescerende tip (Breitling stijl)
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} pos - Positie van de wijzer in radialen
 * @param {number} length - Lengte van de wijzer
 * @param {number} width - Dikte van de wijzer
 * @param {string} color - Kleur van de wijzer
 */
function drawHand(ctx, pos, length, width, color = "#c0c0c0") {
  ctx.save();
  ctx.rotate(pos);

  // Hoofdwijzer (zilverkleurig)
  ctx.beginPath();
  ctx.moveTo(0, width);
  ctx.lineTo(length * 0.7, width / 2);
  ctx.lineTo(length, 0);
  ctx.lineTo(length * 0.7, -width / 2);
  ctx.lineTo(0, -width);
  ctx.lineTo(-width * 1.5, 0);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  // Luminescerende tip (wit/groen)
  ctx.beginPath();
  ctx.moveTo(length * 0.7, width / 2);
  ctx.lineTo(length, 0);
  ctx.lineTo(length * 0.7, -width / 2);
  ctx.closePath();
  ctx.fillStyle = "#d0f0d0";
  ctx.fill();

  ctx.restore();
}

/**
 * Tekent de huidige tijd met Breitling-stijl wijzers
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours() % 12;
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ms = now.getMilliseconds();

  // Uurwijzer
  let hourPos = (hour * Math.PI) / 6 +
                (minute * Math.PI) / (6 * 60) +
                (second * Math.PI) / (360 * 60) -
                Math.PI / 2;
  drawHand(ctx, hourPos, radius * 0.45, radius * 0.035, "#c0c0c0");

  // Minuutwijzer
  let minutePos = (minute * Math.PI) / 30 +
                  (second * Math.PI) / (30 * 60) -
                  Math.PI / 2;
  drawHand(ctx, minutePos, radius * 0.65, radius * 0.025, "#c0c0c0");

  // Secondewijzer (dun en rood, zoals chronograaf)
  let secondPos = (second * Math.PI) / 30 +
                  (ms * Math.PI) / (30 * 1000) -
                  Math.PI / 2;
  ctx.save();
  ctx.rotate(secondPos);
  ctx.beginPath();
  ctx.moveTo(-radius * 0.1, 0);
  ctx.lineTo(radius * 0.75, 0);
  ctx.strokeStyle = "#ff3333";
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
  ctx.restore();
}

/**
 * Tekent datuminformatie in twee boxen naast elkaar ter hoogte van de 3
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawDateInfo(ctx, radius) {
  const now = new Date();

  const weekdays = ["ZO", "MA", "DI", "WO", "DO", "VR", "ZA"];
  const weekday = weekdays[now.getDay()];
  const day = now.getDate();

  const centerX = radius * 0.45;
  const centerY = 0;
  const boxWidth = radius * 0.11;
  const boxHeight = radius * 0.14;
  const boxSpacing = radius * 0.015;

  // Linker box (weekdag)
  const weekdayBoxX = centerX - boxWidth / 2 - boxSpacing / 2;
  
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(weekdayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);
  
  ctx.strokeStyle = "#606060";
  ctx.lineWidth = radius * 0.008;
  ctx.strokeRect(weekdayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);

  ctx.fillStyle = "#ff3333";
  ctx.font = `bold ${radius * 0.07}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(weekday, weekdayBoxX, centerY);

  // Rechter box (dag)
  const dayBoxX = centerX + boxWidth / 2 + boxSpacing / 2;
  
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(dayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);
  
  ctx.strokeStyle = "#606060";
  ctx.lineWidth = radius * 0.008;
  ctx.strokeRect(dayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${radius * 0.09}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(day.toString(), dayBoxX, centerY);
}

/**
 * Hoofdfunctie die de volledige klok tekent in Breitling stijl
 */
function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  
  drawFace(ctx, radius);
  drawHourMarkers(ctx, radius);
  drawMinuteTicks(ctx, radius);
  drawNumbers(ctx, radius);
  drawSubDials(ctx, radius);
  drawTime(ctx, radius);
  drawDateInfo(ctx, radius);
  
  requestAnimationFrame(drawClock);
}

// Event listener voor window resize
window.addEventListener('resize', () => {
  resizeCanvas();
});

// Initialiseer canvas en start animatie
resizeCanvas();
requestAnimationFrame(drawClock);