const alphabets = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
]

let word = "Hello";

let wordCont = document.querySelector(".word");
let btn = document.querySelector("#get-word");
let hint = document.querySelector("#description");
let alpha = document.querySelector(".alphabets");
let hangman = document.querySelectorAll(".hang");
let count = 0;

let isPresent = (key)=>{
    let arr = Array.from(word.toUpperCase());
    
    for (c of arr){
        if (c === key)
            return true;
    }
    return false;
}

alphabets.forEach((val) => {
    let letter = document.createElement("div");
    letter.id = val;
    letter.className = "letter";
    letter.innerText = val;
    alpha.append(letter);

    letter.addEventListener("click", (evt)=>{
        let key = evt.target.id;
        console.log("letter clicked");
        console.log(key);
        let keyColor = window.getComputedStyle(letter).getPropertyValue("background-color");

        if (keyColor === "rgb(171, 98, 239)"){
            if (isPresent(key)){
                let curr_word = document.querySelectorAll(".curr-word");
                console.log(curr_word);
                for (el of curr_word){
                    if (el.id === key){
                        el.innerText = key;
                    }
                }
                letter.style.backgroundColor = "green";
            }
            else{
                letter.style.backgroundColor = "red";
                console.log(hangman[count].style);
                hangman[count++].style.visibility = "visible";

                if (count === 6){
                    count = 0;
                    let popup = document.querySelector(".pop-up");
                    popup.style.visibility = "visible";
                    let correct = document.querySelector("#correct-word");
                    correct.innerText = `Correct Word: ${word}`;
                }
            }
        }
    })
})

let play = document.querySelector("#play");
play.addEventListener("click", ()=>{
    let letters = document.querySelectorAll(".letter");
    for (l of letters)
        l.style.backgroundColor = "rgb(171, 98, 239)";

    let popup = document.querySelector(".pop-up");
    popup.style.visibility = "hidden";

    for (part of hangman){
        part.style.visibility = "hidden";
    }
    wordCont.innerHTML = '';
    count = 0
})

let randomWord = ()=>{
    return hangmanWords[Math.floor(Math.random() * 100)];
}

btn.addEventListener("click", async ()=>{
    wordCont.innerHTML = '';
    let letters = document.querySelectorAll(".letter");
    for (l of letters)
        l.style.backgroundColor = "rgb(171, 98, 239)";
    for (part of hangman){
        part.style.visibility = "hidden";
    }
    count = 0

    word = randomWord();
    let response = await fetch(`https://dictionaryapi.com/api/v3/references/sd3/json/${word}?key=7ba6d416-d8c9-4c8c-bfed-8d060b98caff`);
    response = await response.json();
    hint.innerText = response[0].shortdef[0];

    for (w of word.toUpperCase()){
        let letter = document.createElement("p");
        letter.style.borderBottom = "5px solid black";
        letter.style.margin = "0 5px";
        letter.style.padding = "0 5px";
        letter.innerText = "_";
        letter.id = w;
        letter.className = "curr-word";
        wordCont.append(letter);
    }
})