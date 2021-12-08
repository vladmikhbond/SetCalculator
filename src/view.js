

function draw(matrix) 
{
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // fill circles startig from the smallest 
    let sets = [setA, setB, setC].sort((a,b) => b.r - a.r);   
    for (let set of sets) {
        ctx.fillStyle = set.color;
        fillSet(ctx, set);

    }   
    // current
    if (current) {
        let r = current.r;
        ctx.fillStyle = current.color;
        fillSet(ctx, current);
    }
    // matrix
    if (matrix) {
        const D = 1;
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                if (matrix[row][col]) {  
                    let x = col * Kx, y = row * Ky;
                    ctx.fillStyle = row % 3 ? "black" : "white";
                    ctx.fillRect(x - Kx/2, y - Ky/2, D, D);                
                }
            }
        }
    }
    // sets stroke    
    ctx.strokeStyle = "white";
    for (let s of [setA, setB, setC]) {
        strokeSet(ctx, s);   
    }   
}

function fillSet(ctx, set) {
    ctx.beginPath();   
    if (set.z) {
        // есть запасное поле
        ctx.arc(set.x, set.y, set.r/2, 0, Math.PI*2, true);
        ctx.arc(set.x + set.z, set.y, set.r/2, 0, Math.PI*2, true);
    } else {
        ctx.arc(set.x, set.y, set.r, 0, Math.PI*2, true); 
    }  
    ctx.fill(); 
}

function strokeSet(ctx, set) {
    ctx.beginPath();
    // есть запасное поле
    if (set.z) {
        ctx.arc(set.x, set.y, set.r/2, 0, Math.PI*2, true);
        ctx.moveTo(set.x + set.z + set.r/2, set.y);
        ctx.arc(set.x + set.z, set.y, set.r/2, 0, Math.PI*2, true);
    } else {
        ctx.arc(set.x, set.y, set.r, 0, Math.PI*2, true); 
    }  
    ctx.stroke();
}


