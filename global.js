const canvas = document.getElementById("canvas");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnC = document.getElementById("btnC");
const btnGo = document.getElementById("btnGo");
const expr = document.getElementById("expr");
const ctx = canvas.getContext("2d");

const N = 400;
const Kx = canvas.width / N;
const Ky = canvas.height / N;
