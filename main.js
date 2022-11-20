//letters
const letters = "abcdefghijklmnopqrstuvwxyz";
//Get Array From letters
let lettersArray =Array.from( letters);
//Select Letters Container
let lettersContainer= document.querySelector(".letters");
//Generate Letters
lettersArray.forEach(letter =>{
    //Create Span
let span= document.createElement("span");
//Creat Letter Text node
let theLetter=document.createTextNode(letter);
span.appendChild(theLetter);
span.className = 'letter-box';
lettersContainer.appendChild(span);
});

//object of words +categories
const words ={
    programming:["php","javascript","go","scala","fortran","r","mysql","python"],
    movies: ["prestige","inception","paratellar","insteller","whiplash","Memento"],
    people:["Ahmad Dayoub","Ali Dayoub","Ali Hasan","Jaafar Youssef"],
    countries:["Syria","Yamen","Egypt","Bahrain","Qatar"]
}

//let Random Property
let allkeys = Object.keys(words);
//Random Number Depend on Keys Lenght
let randomPropNumber = Math.floor(Math.random()*allkeys.length);
//category
let randomPropName= allkeys[randomPropNumber ];
//Category Words
let randomPropValue= words[randomPropName];
//Random Numbers Depend On Words
let randomValueNumber= Math.floor(Math.random()*randomPropValue.length);
//the chosen Word
let randomValueValue = randomPropValue[randomValueNumber];
//set category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//Select Letters Guess Element
let letterGuessContainer = document.querySelector(" .letters-guess");
//Convert Chosen Word To Array
let LettersAndSpace = Array.from(randomValueValue);
//Creat Spans depend on Word 
LettersAndSpace.forEach(letter =>{
//creat Empty Span
let emptySpan = document.createElement("span");
if(letter===" "){
emptySpan.className = "With-space"
}
letterGuessContainer.appendChild(emptySpan);
});
//Select guess Spans
let guessSpans=document.querySelectorAll(".letters-guess span");

//Set wrong Attempts
let wrongAttempts = 0;

//Draw Elements 
let theDraw =document.querySelector(".hangman-draw");

//Handle Clicking On Letters
document.addEventListener("click",(e) => {
    //Set  the choose Status
let theStatus= false;

    if(e.target.className === "letter-box"){
        e.target.classList.add("clicked");
        //The Clicked Letter
        let theClickedLetter =e.target.innerHTML.toLowerCase();
        //The chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        //console.log( theClckedLetter); The chosen Word
        theChosenWord.forEach((wordLetter,wordIndex) =>{
     //if the clicked letter Equal to one of the chosen word 
            if(theClickedLetter == wordLetter){
                //set the statues true
                theStatus = true; 
        //loop on all guees spans
        guessSpans.forEach((span,spanIndex) =>{
            if(wordIndex === spanIndex){
                span.innerHTML = theClickedLetter;
            }
        });
            }
        });
console.log(theStatus);
if(theStatus !== true){
    wrongAttempts++;
    theDraw.classList.add(`wrong-${wrongAttempts}`);
    //paly fail sound
    document.getElementById("fail").play();
    if(wrongAttempts==8){
        endGame();
        lettersContainer.classList.add("finished")
    }
}else{
    //play success sound
    document.getElementById("success").play();
}
    }
});
//End Game function 
function endGame(){
    let div= document.createElement("div")
    //creat text
    let divText = document.createTextNode(`Game Over,The Word Is ${randomValueValue}`);
    //Append Text To div
    div.appendChild(divText);
    //Add Class On Div
    div.className = 'popup';
    //Appand to the body
    document.body.appendChild(div);
}
