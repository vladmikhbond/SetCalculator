
function makeLearningButtons() {
    for (let partIdx = 0; partIdx < DATA.length; partIdx++) {
        let btn = document.createElement("button");
        btn.id="card" + partIdx;
        btn.className = "btn btn-info autogen"; 
        btn.innerHTML = DATA[partIdx].h;
        btn.type = "button";
        btn.onclick = () => learn(partIdx);
        document.getElementById("buttonsDiv").appendChild(btn);
    }
}

function learn(partIdx) {
    cardTitle.innerHTML = `${partIdx+1} ${DATA[partIdx].h}`;
    let dataT = DATA[partIdx].t.replace( /<<(.):(.*)>>/g,
        '<span class="config" onclick="learn2(' + partIdx + ',\'$1\')">$2</span>');
    cardText.innerHTML = dataT;
    inputA.value = DATA[partIdx].a[0];
    inputB.value = DATA[partIdx].a[1];
    inputC.value = DATA[partIdx].a[2];
    if (DATA[partIdx].a[3]) inputParams.value = DATA[partIdx].a[3];
    STATE = partIdx;
    refresh();
}

function learn2(partIdx, x) {
    inputA.value = DATA[partIdx][x][0];
    inputB.value = DATA[partIdx][x][1];
    inputC.value = DATA[partIdx][x][2];
    refresh();
}