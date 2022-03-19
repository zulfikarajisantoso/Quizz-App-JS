const start = document.querySelector('.start button')
const informasi = document.querySelector('.informasi')
const keluarkuis = document.querySelector('.keluarkuis')
const lanjutkuis = document.querySelector('.lanjutkuis')
const kuisqard = document.querySelector('.kuisqard')
const waktukuis = document.querySelector('.waktukuis')
const pilihankuis = document.querySelector('.pilihankuis')
const judulwaktu = document.querySelector('.judulwaktu')
const barwaktu = document.querySelector('.waktu')



start.onclick = () => {
    informasi.classList.add('activeinformasi')

}
keluarkuis.onclick = () => {
    window.location.reload();
}


lanjutkuis.onclick = () => {
    kuisqard.classList.add('activekuisqard')
    informasi.classList.remove('activeinformasi')

    showQuetions(0); 
    queCounter(1);
    startTimer(10); 
    startTimerLine(0);    
    lanjutkan.classList.remove('show')
  
}   

let waktunya =  10;
let que_count = 0;
let que_numb = 1;
let scoremu = 0;
let counter;
let counterLine;
let widthValue = 0;

const lanjutkan = document.querySelector(".lanjutkan");

lanjutkan.onclick = ()=> {
    if(que_count < questions.length )
    {
        que_count++;
        que_numb++;
        showQuetions(que_count); //calli
        queCounter(que_numb); 
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(waktunya); 
        startTimerLine(widthValue);
  
        lanjutkan.classList.remove("show");
        barwaktu.classList.remove('activeabis')
        judulwaktu.textContent = "Waktu anda";

    }
    else
    {
        clearInterval(counter); 
        clearInterval(counterLine);
        showResult(); 
    }
}


function showQuetions(index) {
    const pertanyaankuis = document.querySelector('.pertanyaankuis')
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';

    pertanyaankuis.innerHTML = que_tag; 
    pilihankuis.innerHTML = option_tag;
    
    const pilihann = pilihankuis.querySelectorAll(".option");
    
    pilihann.forEach(op => {
        op.setAttribute('onclick', 'optionSelected(this)')
    });

}

let tickIconTag = '<div class=" tick"><i class="icon2 fas fa-check"></i></div>';
let crossIconTag = '<div class=" cross"><i class="icon2 fas fa-times"></i></div>';



function optionSelected (answer) {
    clearInterval(counter);
    clearInterval(counterLine); 

    let ansu = answer.textContent;
    let jawabanbenar = questions[que_count].answer;
    const alloption = pilihankuis.children.length 
    if(ansu == jawabanbenar)
    {
        scoremu += 1;
        answer.classList.add('correct')
        answer.insertAdjacentHTML('beforeend', tickIconTag)
        console.log('correct Answer');
        console.log('update score = ' + scoremu);
      }

    else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < alloption; i++){
            if(pilihankuis.children[i].textContent == jawabanbenar){ //if there is an option which is matched to an array answer 
                pilihankuis.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                pilihankuis.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < alloption; i++){
        pilihankuis.children[i].classList.add("disable"); //once user select an option then disabled all options
    }
    lanjutkan.classList.add("show");
}

const resultpage = document.querySelector('.akhirkuis')


function showResult(){
    informasi.classList.remove('activeinformasi')
    kuisqard.classList.remove('activekuisqard')
    resultpage.classList.add('activeakhirkuis')
    const hasilkuis = resultpage.querySelector('.hasilkuis')

    if( scoremu > 3)
    {
        let score = `<span> Selamat 🎉, kamu berhasil menjawab ${scoremu} dengan benar dari ${questions.length}  </span>`
        hasilkuis.innerHTML = score
    }
    else if( scoremu > 1){
        let score = `<span> Lumayan 😎, kamu berhasil menjawab ${scoremu} dengan benar dari ${questions.length}  </span>`
        hasilkuis.innerHTML = score
    }
    else{
        let score = `<span> Yah 😐, kamu hanya berhasil menjawab ${scoremu} dengan benar dari ${questions.length}  </span>`
        hasilkuis.innerHTML = score
    }
    
}





const kuiskeberapa = document.querySelector('.kuiskeberapa')
function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag =  `<div class='page'> <h5>${index} dari ${questions.length}</h5> </div>` ;
    kuiskeberapa.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer(){
        waktukuis.textContent = time;
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = waktukuis.textContent; 
            waktukuis.textContent = addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            console.log(time)
            clearInterval(counter); 
            judulwaktu.textContent = "Waktu Habis";
            barwaktu.classList.add('activeabis')
            const allOptions = pilihankuis.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(pilihankuis.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    pilihankuis.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    pilihankuis.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Waktu habis: Jawaban yang benar adalah");
                }
            }
         
            for(i=0; i < allOptions; i++){
                pilihankuis.children[i].classList.add("disable"); //once user select an option then disabled all options
            }
            lanjutkan.classList.add("show"); //show the next button if user selected any option
        }
    }
}

const gariswaktu = document.querySelector('.gariswaktu')

function startTimerLine(time){
    counterLine = setInterval(timer, 16);
    function timer(){
        time += 1;
        gariswaktu.style.width = time  +"px"; 
    
        if(time > 675){ 
            clearInterval(counterLine); 
        }
        
    }
}

const mainlagi = document.querySelector('.mainlagi')


// if restartQuiz button clicked
mainlagi.onclick = ()=>{    
    kuisqard.classList.add('activekuisqard')
    resultpage.classList.remove('activeakhirkuis')
    waktunya = 10; 
    que_count = 0;
    que_numb = 1;
    scoremu = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(waktunya); 
    startTimerLine(widthValue); //calling startTimerLine function

   
    lanjutkan.classList.remove("show"); 
}

const selesaimain = document.querySelector('.selesaimain')

selesaimain.onclick = () => {
    window.location.reload()    
}