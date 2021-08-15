let playerX = document.getElementById('playerX')
let playerO = document.getElementById('playerO')
let turnO = document.getElementById('turnO')
let turnX = document.getElementById('turnX')
let td = document.getElementsByTagName('td')
let tdArr = Array.from(td)
let tdArrVAlue = []

let selectPlayer = document.getElementsByClassName('selectPlayer')[0]
let playArea = document.getElementsByClassName('playArea')[0]
let main = document.getElementsByTagName('main')[0]
let result = document.getElementsByClassName('result')[0]
let replayBtn = document.getElementById('replayBtn')

let winner = '';

let friend = document.getElementById('friend')
let computer = document.getElementById('computer')

computer.addEventListener('click' , playWithComputer)
friend.addEventListener('click' , playWithFriend) 


function playWithFriend() {

    
    main.style.opacity = "1"

    document.getElementsByClassName('playWith')[0].style.transform = 'scale(0.3)'
    document.getElementsByClassName('playWith')[0].style.transitionDuration = 'all 0.4s ease 0.3s'
    document.getElementsByClassName('playWith')[0].style.opacity = '0'
    document.getElementsByClassName('playWith')[0].style.pointerEvents = 'none'


    // ------------------INSERTING VALUES---------------------

let insertO = (event) => {

    turnO.style.backgroundColor = "transparent"
    turnX.style.backgroundColor = "white"
    
    event.currentTarget.innerHTML = '<i class="far fa-circle">'

    for (elem of tdArr){
        elem.removeEventListener('click' , insertO) 
        elem.addEventListener('click' , insertX) 
    }
 
    event.currentTarget.replaceWith(event.currentTarget.cloneNode(true));

    checkWinner()

}

let insertX = (event) => {

    turnX.style.backgroundColor = "transparent"
    turnO.style.backgroundColor = "white"

    event.currentTarget.innerHTML = '<i class="fas fa-times"></i>'

    for (elem of tdArr){
        elem.removeEventListener('click' , insertX) 
        elem.addEventListener('click' , insertO) 
    }
    event.currentTarget.replaceWith(event.currentTarget.cloneNode(true));

    checkWinner()

}

let mainFn = (event) => {
    if (event.target.innerText == 'Player X'){

        turnX.style.backgroundColor = "white"
        playerX.style.pointerEvents = "none"
        playerO.style.pointerEvents = "none"
        

        for (elem of tdArr){
            elem.addEventListener('click' , insertX) 
        }
    }
    else{
        turnX.style.backgroundColor = "white"
        playerX.style.pointerEvents = "none"
        playerO.style.pointerEvents = "none"

        for (elem of tdArr){
            elem.addEventListener('click' , insertX) 
        }
    }

    main.style.height = "350px"
    selectPlayer.style.opacity = "0"
    playArea.style.opacity = "1"
    playArea.style.pointerEvents = "all"
    

}
playerX.addEventListener('click' , mainFn)
playerO.addEventListener('click' , mainFn)

}

function playWithComputer(){

    main.style.opacity = "1"
    document.getElementsByClassName('playWith')[0].style.transform = 'scale(0.2)'
    document.getElementsByClassName('playWith')[0].style.opacity = '0'
    document.getElementsByClassName('playWith')[0].style.pointerEvents = 'none'

    let mainFn2 = (event) => {
        
        turnX.style.backgroundColor = "white"
        turnO.style.backgroundColor = "transparent"

        playerX.style.pointerEvents = "none"
        playerO.style.pointerEvents = "none"

        if (event.target.innerText == 'Player X'){
            
            computerPlayer = 'Player O'
            userPlayer = 'Player X'
            

            for (elem of tdArr){
                elem.addEventListener('click' , insertX2) 
            }
        }
        else{

            computerPlayer = 'Player X'
            userPlayer = 'Player O'
            insertO2()
        }
        
        main.style.height = "350px"
        selectPlayer.style.opacity = "0"
        playArea.style.opacity = "1"
        playArea.style.pointerEvents = "all"
        
    }

    let eventInd = []

let insertX2 = (event) => {

        if(computerPlayer == "Player X" && userPlayer == "Player O"){
            
            turnX.style.backgroundColor = "white"
            turnO.style.backgroundColor = "transparent"

            event.currentTarget.innerHTML = '<i class="far fa-circle"></i>'    
            for (elem of tdArr){
                elem.removeEventListener('click' , insertX2) 
            }
    
            event.currentTarget.replaceWith(event.currentTarget.cloneNode(true));
            eventInd.push(tdArr.indexOf(event.currentTarget))
            checkWinner()
            if (winner == ''){
                insertO2()
            }
        }
        else if(computerPlayer == "Player O" && userPlayer == "Player X"){
                                    
            event.currentTarget.innerHTML = '<i class="fas fa-times"></i>'    
            for (elem of tdArr){
                elem.removeEventListener('click' , insertX2) 
            }
    
            event.currentTarget.replaceWith(event.currentTarget.cloneNode(true));
            eventInd.push(tdArr.indexOf(event.currentTarget))
            checkWinner()
            if (winner == ''){
                insertO2()
                turnO.style.backgroundColor = 'white'
                turnX.style.backgroundColor = "transparent"

            }
        }
    }

    randomArr = []
    let randomnumber;
    let insertO2 = () => { 
        turnX.style.backgroundColor = "white"
        turnO.style.backgroundColor = "transparent"
        
        let randomNumGenerator = () => {
            randomnumber = Math.floor(Math.random() * (tdArr.length - 1)) + 1;
            if (randomArr.indexOf(randomnumber) == -1 && eventInd.indexOf(randomnumber) == -1 && (randomArr.length + eventInd.length) <= tdArr.length){
                randomArr.push(randomnumber)
            }
            else{
                randomNumGenerator()
            }
        }
        randomNumGenerator()
            
        if(computerPlayer == "Player X" && userPlayer == "Player O"){
                
            let displayAtRandom = () => {

                turnX.style.backgroundColor = "transparent"
                turnO.style.backgroundColor = "white"

                tdArr[randomnumber].innerHTML = '<i class="fas fa-times"></i>'
                tdArr[randomnumber].replaceWith(tdArr[randomnumber].cloneNode(true));
                checkWinner()

                for (elem of tdArr){
                    elem.addEventListener('click' , insertX2) 
                }
            }
            setTimeout(displayAtRandom , 400)     
        }

        else if(computerPlayer == "Player O" && userPlayer == "Player X"){

            let displayAtRandom = () => {
                turnX.style.backgroundColor = "white"
                turnO.style.backgroundColor = "transparent"

                tdArr[randomnumber].innerHTML = '<i class="far fa-circle"></i>'
                tdArr[randomnumber].replaceWith(tdArr[randomnumber].cloneNode(true));
                checkWinner()

                for (elem of tdArr){
                    elem.addEventListener('click' , insertX2) 
                }
            }
            
            setTimeout(displayAtRandom , 400)

        }
    }
    playerX.addEventListener('click' , mainFn2)
    playerO.addEventListener('click' , mainFn2)
    
}

// --------------------WINNING LOGIC---------------------------------- 

let checkWinner = () => {

    let rowArrValue1 = []
    let rowArrValue2 = []
    let rowArrValue3 = []

    let colArrValue1 = []
    let colArrValue2 = []
    let colArrValue3 = []
    
    let dgnlValue1 = []
    let dgnlValue2 = []

    let sumOfCol1 , sumOfCol2 , sumOfCol3 , sumOfRow1 , sumOfRow2 , sumOfRow3;

        // -----HORIZONTALLY------

        for (elem2 of tdArr){
            if (elem2.innerHTML == ''){
                elem2.value = 0
            }
            else if (elem2.innerHTML == '<i class="fas fa-times"></i>'){
                elem2.value = 4
            }
            else if (elem2.innerHTML == '<i class="far fa-circle"></i>'){
                elem2.value = 1
            }
        }

        rowArrValue1.push(tdArr[0].value)
        rowArrValue1.push(tdArr[1].value)
        rowArrValue1.push(tdArr[2].value)

        rowArrValue2.push(tdArr[3].value)
        rowArrValue2.push(tdArr[4].value)
        rowArrValue2.push(tdArr[5].value)

        rowArrValue3.push(tdArr[6].value)
        rowArrValue3.push(tdArr[7].value)
        rowArrValue3.push(tdArr[8].value)

        sumOfRow1 = rowArrValue1.reduce((accum , elem) => {
            return accum += elem
        })
        sumOfRow2 = rowArrValue2.reduce((accum , elem) => {
            return accum += elem
        })
        sumOfRow3 = rowArrValue3.reduce((accum , elem) => {
            return accum += elem
        })

        // -----VERTICALLY--------

        colArrValue1.push(tdArr[0].value)
        colArrValue1.push(tdArr[3].value)
        colArrValue1.push(tdArr[6].value)

        sumOfCol1 = colArrValue1.reduce((accum , elem) => {
            return accum += elem
        })

        colArrValue2.push(tdArr[1].value)
        colArrValue2.push(tdArr[4].value)
        colArrValue2.push(tdArr[7].value)

        sumOfCol2 = colArrValue2.reduce((accum , elem) => {
            return accum += elem
        })

        colArrValue3.push(tdArr[2].value)
        colArrValue3.push(tdArr[5].value)
        colArrValue3.push(tdArr[8].value)

        sumOfCol3 = colArrValue3.reduce((accum , elem) => {
            return accum += elem
        })

        // DIAGONALLY 

        dgnlValue1.push(tdArr[0].value)
        dgnlValue1.push(tdArr[4].value)
        dgnlValue1.push(tdArr[8].value)
    
        let sumOfDgnl1 = dgnlValue1.reduce((accum , elem) => {
                return accum += elem
        })
    
        dgnlValue2.push(tdArr[2].value)
        dgnlValue2.push(tdArr[4].value)
        dgnlValue2.push(tdArr[6].value)
    
        let sumOfDgnl2 = dgnlValue2.reduce((accum , elem) => {
            return accum += elem
        })

        // ------CALCULATING SUM--------

            if (sumOfRow1 == 12 || sumOfRow2 == 12 || sumOfRow3 == 12 || sumOfCol1 == 12 || sumOfCol2 == 12 || sumOfCol3 == 12 || sumOfDgnl1 == 12 || sumOfDgnl2 == 12){
                winner = "X"
                for (elem of tdArr){
                    elem.style.pointerEvents = "none"
                }
                displayResult()
            }
            else if (sumOfRow1 == 3 || sumOfRow2 == 3 || sumOfRow3 == 3 || sumOfCol1 == 3 || sumOfCol2 == 3 || sumOfCol3 == 3 || sumOfDgnl1 == 3 || sumOfDgnl2 == 3){
                winner = "O"
                for (elem of tdArr){
                elem.style.pointerEvents = "none"
                }
            displayResult()
            }  
    

    for (i = 0; i < tdArr.length; i++){
        tdArrVAlue.push(tdArr[i].innerHTML)
    }
    let ind = tdArrVAlue.indexOf('')
    if (ind == -1){
        displayResult()
    }
    tdArrVAlue = []

}


// -------------------------DISPLAYING WINNER-----------------------
            
let displayResult = () => {

    result.style.opacity = "1"
    result.style.pointerEvents = "all"
    playArea.style.opacity = "1"
    playArea.style.pointerEvents = "none"
    main.style.height = "480px"
    main.style.top = "48%"
    let h2 = result.getElementsByTagName('h2')[0]
    if (winner != ''){
        h2.innerHTML = `Player ${winner} Won!` 
        replayBtn.addEventListener('click' , () => {
            window.location.reload()
        })

    }
    else{
        h2.innerHTML = `Match Draw !` 
        replayBtn.addEventListener('click' , () => {
            window.location.reload()
        })
    }

}
replayBtn.addEventListener('mouseenter' , () => {
    document.getElementsByClassName('fas fa-redo')[0].style.transform = "rotate(180deg)"
})
replayBtn.addEventListener('mouseleave' , () => {
    document.getElementsByClassName('fas fa-redo')[0].style.transform = "rotate(0deg)"
})



