
const $$ = document.querySelector.bind(document);


function matrix(s) {
  const alphabet = s  + 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  var key = alphabet.toLocaleUpperCase();
  for (let i = 0; i < key.length; i++) {
    if (key.indexOf(key[i]) !== i) {
      key = key.slice(0, i) + key.slice(i + 1); 
      i--;
    }

  }
  return key;
}

function editPlain(plain){
    var s = plain.toLocaleUpperCase().replaceAll(' ', '')
    for(let i = 0; i < s.length - 1; i+=2){
        if(s[i] === s[i+1])
        s = s.slice(0, i + 1) + 'X' + s.slice(i+1);
    }
    if(s.length % 2 === 1) s += 'X';
    s = s.replaceAll('J', 'I');
    return s;
}


function encrypt(plaintext, key){
    var cipher = '';
    var plain = plaintext.toLocaleUpperCase();
    for(let i = 0; i < plain.length - 1; i+=2){
        var i1, i2, j1, j2;
        i1 = key.indexOf(plain[i]) / 5 | 0;
        j1 = key.indexOf(plain[i]) % 5;

        i2 = key.indexOf(plain[i + 1]) / 5 | 0;
        j2 = key.indexOf(plain[i + 1]) % 5;

        if(i1 == i2)
        cipher += key[i1 * 5 + (j1 + 1) % 5] + key[i2 * 5 + (j2 + 1) % 5];
        
        else if(j1 == j2)
        cipher += key[((i1 + 1) % 5) * 5 + j1] + key[((i2 + 1) % 5) * 5 + j2]
        
        else
        cipher += key[i1 * 5 + j2] + key[i2 * 5 + j1];
    }
    return cipher;
}

function decrypt(plain, key){
    var cipher = ''
    for(let i = 0; i < plain.length; i+=2){
        var i1, i2, j1, j2
        i1 = key.indexOf(plain[i]) / 5 | 0;
        j1 = key.indexOf(plain[i]) % 5;

        i2 = key.indexOf(plain[i + 1]) / 5 | 0;
        j2 = key.indexOf(plain[i + 1]) % 5;

        if(i1 == i2)
        cipher +=  key[i1 * 5 + (j1 + 4) % 5] + key[i2 * 5 + (j2 + 4) % 5]
        
        else if(j1 == j2)
        cipher += key[((i1 + 4) % 5 * 5) + j1] + key[((i2 + 4) % 5 * 5 ) + j2]

        else 
        cipher += key[i1 * 5 + j2] + key[i2 * 5 + j1]
    }
    return cipher;
}


const result = $$('.result')

const node = 'A'.charCodeAt();

function encryptCeasar(plain, key){
    var cipher = ''
    var c;
    const k = Number.parseInt(key);
    plain = plain.toLocaleUpperCase();
    for(var i = 0; i < plain.length; i++){
        c = plain.charCodeAt(i);
        console.log(c)
        if(c >= 65 && c <= 90){
            c = (c - node + k) % 26 + node;
            console.log('c:' ,c)
        }
        cipher += String.fromCharCode(c);
    }
    return cipher;
}

function decryptCeasar(plain, key){
    var cipher = '';
    plain = plain .toLocaleUpperCase();
    const k = Number.parseInt(key);
    for(var i = 0; i < plain.length; i++){
        c = plain.charCodeAt(i);
        console.log(c)
        if(c >= 65 && c <= 90){
            if(c - node - k < 0){
                c = c - node - k + 'Z'.charCodeAt() + 1;
                console.log('d: ', c)
            }
            else {
                c = (c - node - k) % 26 + node;
                console.log('c: ' ,c)
            }
            
        }
        cipher += String.fromCharCode(c)
    }
    return cipher;
}

$(function(){
    $('form').submit(function (e) {
        e.preventDefault();
    });
    if(window.location.pathname.includes('/PlayFair.html')){
         $('.encode').click(function(){
        const k = $$('.key').value;
        const m = $$('.mess').value;
        if(k && m)
        result.value = encrypt(editPlain(m), matrix(k));
    });

    $('.decode').click(function(){
        const k = $$('.key').value;
        const m = $$('.mess').value;
        if(k && m)
        result.value = decrypt(editPlain(m), matrix(k));
    })

    $('.reset').click(function(){
        $$('.key').value = $$('.mess').value = result.value = '' 
    })
    } else {
        $('.encode').click(function(){
            const k = $$('.key').value;
            const m = $$('.mess').value;
            if(k && m){
                result.value = encryptCeasar(m, k);
            }
        })
        $('.decode').click(function(){
            const k = $$('.key').value;
            const m = $$('.mess').value;
            if(k && m){
                result.value = decryptCeasar(m, k);
            }
        })
    }
   
})



