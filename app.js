const startBtn=document.querySelector('#start')
const screens=document.querySelectorAll('.screen')
const timeList=document.querySelector('#time-list')  
const timeEl=document.querySelector('#time')
const board=document.querySelector('#board')

let time=0
let score=0

const colors=['#e058ac', '#58c0e0', '#58e063', '#e05858', '#2ecc71', 'pink', 'white', 'orange']


startBtn.addEventListener('click', (event) => {
event.preventDefault()
screens[0].classList.add('up')
})
timeList.addEventListener('click', event =>{
    if (event.target.classList.contains('time-btn')){
        time=parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})


board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})



function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
   
    setTime(time)
    //timeEl.innerHTML=`00:${time}`
}

function decreaseTime(){
    if(time===0){
        finishGame()
    } else {

        let current=--time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }


    
}

function setTime(value) {
    timeEl.innerHTML=`00:${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
board.innerHTML=`<h1>счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle(){
    const circle=document.createElement('div')
    const size=getRandomNumber(10, 60)
    const {width, height}=board.getBoundingClientRect()
    const x=getRandomNumber(0, width-size)
    const y=getRandomNumber(0, height-size)

    circle.classList.add('circle')
    circle.style.width=`${size}px`
    circle.style.height=`${size}px`
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`

    //color

    const color=colors[getRandomNumber(0, colors.length)]
    circle.style.background=color
    
    //linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%);
    circle.style.boxShadow=`0 0 2px ${color}`


    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random()*(max-min)+min)
}


function winTheGame() {
    function kill(){
        const circle=document.querySelector('.circle')

        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 42)
}

