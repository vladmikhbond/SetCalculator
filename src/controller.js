const setA = new XSet("red", 60);
const setB = new XSet("green", 50);
const setC = new XSet("blue", 40);

draw();

btnGo.addEventListener('click', function(e) {
    setStage(setA, setB, setC);
    draw();

    let matrix = calcMatrix(setA, setB, setC);
    draw(matrix);   
    $exprRes.innerHTML = calcExpr(setA, setB, setC);
})

btnStage.addEventListener('click', function(e) {
    setStage(setA, setB, setC);
    draw();
})


//--------------------- test -----------------------------
btnTest.addEventListener('click', function(e) {
    let i = +inputTest.value;
    let [a,b,c] = stages[i][2].split('-');
    inputA.value = a ? a : "";
    inputB.value = b ? b : "";
    inputC.value = c ? c : "";
    setStage(setA, setB, setC);
    draw();
    inputTest.value = i + 1;  
})


// learning ---------------------------------------
for (let i = 0; i < DATA.length; i++) {
    let btn = document.createElement("button");
    btn.id="card" + i;
    btn.className = "btn btn-info"; 
    btn.innerHTML = i + 1;
    btn.type = "button";
    btn.title = DATA[i].h;
    btn.addEventListener("click", learn);
    btn.style.marginLeft = "4px";
    document.getElementById("buttonsDiv").appendChild(btn);
}


function learn() {
    let i = +this.id.slice(4);
    cardTitle.innerHTML = `${i+1} ${DATA[i].h}`;
    let dataT = DATA[i].t.replace( /<<(b):(.*)>>/g,
        '<span class="config" onclick="learn2(' + i + ',\'$1\')">$2</span>');
    cardText.innerHTML = dataT;
    inputA.value = DATA[i].a[0];
    inputB.value = DATA[i].a[1];
    inputC.value = DATA[i].a[2];
    if (DATA[i].a[3]) inputParams.value = DATA[i].a[3];
    range.value = DATA[i].m;
    refresh();
}

