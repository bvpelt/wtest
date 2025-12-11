const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2;

// Move origin to center of canvas
ctx.translate(radius, radius);

// Drawing the clock face
function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.975, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // Outer border
  ctx.strokeStyle = "black";
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

function drawMinuteTriangles(ctx, radius) {
  const triangleHeight = radius * 0.08; // distance from circle inward
  const triangleBase = radius * 0.05;   // width of triangle base

  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6; // 12 positions (every 5 minutes)

    // Position at outer edge
    let xOuter = Math.cos(angle) * radius * 0.95;
    let yOuter = Math.sin(angle) * radius * 0.95;

    // Base corners (perpendicular to radius)
    let perpAngle = angle + Math.PI / 2;
    let xBase1 = xOuter + Math.cos(perpAngle) * (triangleBase / 2);
    let yBase1 = yOuter + Math.sin(perpAngle) * (triangleBase / 2);
    let xBase2 = xOuter - Math.cos(perpAngle) * (triangleBase / 2);
    let yBase2 = yOuter - Math.sin(perpAngle) * (triangleBase / 2);

    // Tip pointing inward
    let xTip = Math.cos(angle) * (radius * 0.95 - triangleHeight);
    let yTip = Math.sin(angle) * (radius * 0.95 - triangleHeight);

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(xBase1, yBase1);
    ctx.lineTo(xBase2, yBase2);
    ctx.lineTo(xTip, yTip);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

function drawMinuteTicks(ctx, radius) {
  const tickLength = radius * 0.05;  // length of each tick
  const tickWidth = radius * 0.01;   // line thickness

  for (let i = 0; i < 60; i++) {
    let angle = (i * Math.PI) / 30; // 60 ticks around the circle

    // Start and end points of tick
    let xStart = Math.cos(angle) * (radius * 0.95);
    let yStart = Math.sin(angle) * (radius * 0.95);
    let xEnd = Math.cos(angle) * (radius * 0.95 - tickLength);
    let yEnd = Math.sin(angle) * (radius * 0.95 - tickLength);

    ctx.beginPath();
    ctx.lineWidth = tickWidth;
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}


// drawing the numbers on the clock face
function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for (let num = 1; num <= 12; num++) {
    let angle = (num * Math.PI) / 6;
    ctx.rotate(angle);
    ctx.translate(0, -radius * 0.80);
    ctx.rotate(-angle);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, radius * 0.80);
    ctx.rotate(-angle);
  }
}

// Drawing the hands of the clock
function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}


// Drawing the time on the clock
function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ms = now.getMilliseconds();

  // Hour hand (smooth with minutes/seconds)
  hour = hour % 12;
  let hourPos = (hour * Math.PI) / 6 +
                (minute * Math.PI) / (6 * 60) +
                (second * Math.PI) / (360 * 60);
  drawHand(ctx, hourPos, radius * 0.5, radius * 0.07);

  // Minute hand (smooth with seconds)
  let minutePos = (minute * Math.PI) / 30 +
                  (second * Math.PI) / (30 * 60);
  drawHand(ctx, minutePos, radius * 0.8, radius * 0.05);

  // Second hand (smooth with milliseconds)
  let secondPos = (second * Math.PI) / 30 +
                  (ms * Math.PI) / (30 * 1000);
  ctx.strokeStyle = "red";
  drawHand(ctx, secondPos, radius * 0.9, radius * 0.02);
  ctx.strokeStyle = "black"; // reset
}

function drawDateInfo(ctx, radius) {
  const now = new Date();

  // Format weekday, day, year
  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const weekday = weekdays[now.getDay()];
  const day = now.getDate();
  const year = now.getFullYear();

  // Position for text (below center)
  ctx.font = radius * 0.12 + "px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Weekday
  ctx.fillStyle = "black";
  ctx.fillText(weekday, 0, radius * 0.3);

  // Day of month
  ctx.font = radius * 0.15 + "px Arial bold";
  ctx.fillText(day.toString(), 0, radius * 0.45);

  // Year
  ctx.font = radius * 0.1 + "px Arial";
  ctx.fillText(year.toString(), 0, radius * 0.6);
}


// Main function to draw the clock
function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  drawFace(ctx, radius);
  drawMinuteTriangles(ctx, radius);
  drawMinuteTicks(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
  drawDateInfo(ctx, radius); // <-- add date display
}



requestAnimationFrame(drawClock);