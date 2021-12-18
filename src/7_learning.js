
function makeLearningButtons() {
    for (let partIdx = 0; partIdx < DATA.length; partIdx++) {
        let btn = document.createElement("button");
        btn.id="card" + partIdx;
        btn.type = "button";
        btn.className = "btn btn-secondary autogen"; 
        btn.innerHTML = DATA[partIdx].h;
        
        btn.onclick = () => switchTo(partIdx);
        document.getElementById("buttonsDiv").appendChild(btn);
    }
}

function switchTo(partIdx) 
{
    cardTitle.innerHTML = DATA[partIdx].h;
    let dataT = DATA[partIdx].t.replace( /<<(.):(.*)>>/g,
        '<span class="sectionLink" onclick="switchToPartSection('+ partIdx +',\'$1\')">$2</span>');
    cardText.innerHTML = dataT;
    inputA.value = DATA[partIdx].a.A;
    inputB.value = DATA[partIdx].a.B;
    inputC.value = DATA[partIdx].a.C;
    $expr.value  = DATA[partIdx].a.E;
    $oper.value  = DATA[partIdx].a.O;
    STATE = partIdx-1;
    refresh();
}

function switchToPartSection(partIdx, letter) {
    inputA.value = DATA[partIdx][letter].A;
    inputB.value = DATA[partIdx][letter].B;
    inputC.value = DATA[partIdx][letter].C;
    $expr.value  = DATA[partIdx][letter].E;
    $oper.value  = DATA[partIdx][letter].O;
    refresh();
}