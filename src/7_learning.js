
function makeLearningButtons() {
    for (let partIdx = 0; partIdx < DATA.length; partIdx++) {
        let btn = document.createElement("button");
        btn.id="card" + partIdx;
        btn.className = "btn btn-info autogen"; 
        btn.innerHTML = DATA[partIdx].h;
        btn.type = "button";
        btn.onclick = () => switchTo(partIdx);
        document.getElementById("buttonsDiv").appendChild(btn);
    }
}

function switchTo(partIdx) 
{
    cardTitle.innerHTML = `${partIdx+1} ${DATA[partIdx].h}`;
    let dataT = DATA[partIdx].t.replace( /<<(.):(.*)>>/g,
        '<span class="config" onclick="switchToPartSection('+ partIdx +',\'$1\')">$2</span>');
    cardText.innerHTML = dataT;
    inputA.value = DATA[partIdx].a[0];
    inputB.value = DATA[partIdx].a[1];
    inputC.value = DATA[partIdx].a[2];
    if (DATA[partIdx].a[3]) $expr.value = DATA[partIdx].a[3];
    STATE = partIdx;
    refresh();
}

function switchToPartSection(partIdx, letter) {
    inputA.value = DATA[partIdx][letter][0];
    inputB.value = DATA[partIdx][letter][1];
    inputC.value = DATA[partIdx][letter][2];
    if (DATA[partIdx][letter][3]) $expr.value = DATA[partIdx][letter][3];
    refresh();
}