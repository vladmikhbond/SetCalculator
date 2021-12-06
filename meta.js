////////////////////////////////////////////


let elements = ["a", "b", "c", "ab", "bc", "ac", "abc"].sort();
let n = elements.length;
let fs = [];
for (let i = 1; i < 2**n; i++) {
      let bin = ('00000000' + i.toString(2)).slice(-n).split('').reverse();
      let f = elements.filter((_, j) => bin[j] == 1);
      f = f.join('-');
      if (isUnique(f, fs)) fs.push(f);     
}
//console.log(fs);

for(let s of fs) {
   console.log(`["${s}", [x, y], [x, y], [x, y]],`);
}





function isUnique(f, fs) {
   let permuts = ["abc", "acb",  "bac",  "bca",  "cab",  "cba"];
   let twins = [];
   for (let p of permuts) {
       // "b-ba-ca"
       let bro = replaceAll(f, p);
       // ["b", "ba", "ca"] => [[b], [a,b], [a,c]] => ["b", "ab", "ac"]
       bro = bro.split('-').map(x => x.split('').sort().join(''));
       //  ["ab", "ac", "b"] => "ab-ac-b"
       bro = bro.sort().join('-');
       if (fs.includes(bro)) 
          return false;
   }
   return true;
}

function replaceAll(s, p) {
   return s.split('')
       .map(x => x == 'a' ? p[0] : x == 'b' ? p[1] : x == 'c' ? p[2] : x )
       .join('');       
}

