
  let container = document.getElementById('letterSpacesContainer');
  const scoreDiv = document.getElementById('score');
  let boardArr;
  let winningIndices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0,3,6], [1, 4, 7], [2,5,8], [6,4,2], [0,4,8]];
  let player1Letter;
  let player2Letter;
  let player1 = [];
  let player2 = [];
  let availableMovesArr = [];
  let takenMovesArr = [];
  let player1Score = 0;
  let player2Score = 0;
  let scoreDivHtml;
  let counterp1;  
  let counterp2;  
  let p2move;
  let randomNumber;
  let winTimeOut;
  let drawTimeOut;
  let myId;
  let p2Turn = false;

  let winnerAction = a => {
    $(container).html(`
      <div class = "winner">
        ${a} wins!
      </div>
    `); 
    if (a == "User") player1Score += 1;  
    else player2Score += 1;
    winTimeOut = window.setTimeout( () => {initialize()}, 3000)
  }

  let itsADraw = () => {
    $(container).html(`
      <div class = "winner">
        It's a draw!
      </div>
    `)
   drawTimeOut = window.setTimeout(() => {initialize()}, 3000)
  }

  let checkForWinner = () => {
    let winner;
    return winningIndices.forEach( item => {
      item.every(element => player1.includes(element)) ? winner = "User" : item.every(element => player2.includes(element)) ? winner = "Computer" : winner = undefined;
      if (winner != undefined) {
        return winnerAction(winner)
      }
      else if (winner == undefined && boardArr.indexOf('-') == -1) {
        return itsADraw();
      }
    });
  }

  let gameChoicesHTML = `
    <p class = "choiceText">Choose your letter</p>
    <div class = "choices" id = "choices">
      <div class = "choice1 x" id = "choice1">
        <h1>X</h1>
      </div>
      <div class = "choice2 o" id = "choice2">
        <h1>0</h1>
      </div>
    </div>
  `
  let gameBoardHTML = `
   <ul class = "spaces">  
            <li class = "space" id ="0" style = "border-right: solid; border-bottom: solid; border-width: 5px;"><li>
            <li class = "space" id ="1" style = "border-right: solid; border-bottom: solid; border-width: 5px;"><li>
            <li class = "space" id ="2" style = "border-bottom: solid; border-width: 5px;"><li>
            <li class = "space" id ="3" style = "border-right: solid; border-bottom: solid; border-width: 5px;"><li>
            <li class = "space" id ="4" style = "border-right: solid; border-bottom: solid; border-width: 5px;"><li>
            <li class = "space" id ="5" style = "border-bottom: solid; border-width: 5px;"><li>
            <li class = "space" id ="6" style = "border-right: solid; border-width: 5px;"><li>
            <li class = "space" id ="7" style = "border-right: solid; border-width: 5px;"><li>
            <li class = "space" id ="8"><li>
    </ul>
  `
  let choiceMade = false;

let initialize = () => {
    window.clearTimeout(drawTimeOut)
    window.clearTimeout(winTimeOut)
    boardArr = ['-','-','-','-','-','-','-','-','-'];
    player1Letter = undefined;
    player2Letter = undefined;
    player1 = [];
    player2 = [];
    takenMovesArr = [];
    availableMovesArr = [];
    p2move = undefined;
    choiceMade = false; 
    counterp1 = false;
    counterp2 = false;
    p2Turn = false;
    scoreDivHtml = `<p> user: ${player1Score}</p><p>computer: ${player2Score} </p>`;
    $(scoreDiv).html(scoreDivHtml);
    $(container).html(gameChoicesHTML);
    $('#choice1').on('click', () => {
      player1Letter = "X";
      player2Letter = "O";     
      $(container).html(gameBoardHTML)
      choiceMade = true;
    })
    $("#choice2").on('click', () => {
      player1Letter = "O";
      player2Letter = "X";
      $(container).html(gameBoardHTML)
      choiceMade = true;
    })
}
initialize();

  let moveFunction = p2move => {        
      if (p2move != undefined) {
        let endIndex;
        endIndex = p2move + 1;
        boardArr.fill(player2Letter, p2move, endIndex);
        player2.push(p2move);
        p2Turn = false;
      }
      boardArr.forEach( (item, index) => {
        let li = document.getElementById(index);
        if (item !== '-'){
          $(li).html(item)
        }
      }) 
      checkForWinner();
      console.log("player1: " + player1)
      console.log("player2: " + player2)
  };

  $(container).on('click', '.space', (e)=>{
    if (choiceMade = true && p2Turn == false) {
    let moveId;
    moveId = e.currentTarget.id;
    moveId = Number(moveId)
    let endIndex = moveId + 1;
      if (boardArr[moveId] == "-"){
        player1.push(moveId)
        boardArr.fill(player1Letter, moveId, endIndex)
        moveFunction(); 
        if (boardArr.indexOf("-") != -1){
          myId = window.setTimeout(() => { player2Move(player2Letter)}, 3000)
        }
        p2Turn = true;
      }
    }
  })

//-----------------PLAYER2MOVE--------------///
let player2Move = (player2Letter) => {
  if (p2Turn == true){
    window.clearTimeout(myId)
    availableMovesArr = [];
    takenMovesArr = [];
    p2move = undefined;
    let boardObj = {};
    let countsp1 = {};
    let countsp2 = {};
    let counter = 0;  
      boardArr.forEach( (item, index) => {
        boardObj[index] = item;
        if (item == "-") availableMovesArr.push(index);
        if (item != "-") takenMovesArr.push(index);
      })
  for (let item of winningIndices){ //BEGIN WINNING INDICES LOOP
      counter++;
      counterp1 = 0;
      counterp2 = 0;
      let index = winningIndices.indexOf(item);    
      for (let p of player1) {
        item.indexOf(p) != -1 ? countsp1[index] = counterp1 += 1 : 1;
      }   
      for (let a of player2) {
        item.indexOf(a) != -1 ? countsp2[index] = counterp2 += 1 : 1;
      }
      if (availableMovesArr.indexOf(4) != -1 && takenMovesArr.length == 1){
        p2move = 4;
        return moveFunction(p2move);
        break;
      }
      else if (countsp2[index] == 2 && item.some( i => takenMovesArr.includes(i) == false)){    
        console.log(counterp2);
        console.log(item);
        p2move = item.find( i => takenMovesArr.indexOf(i) == -1);        
        return moveFunction(p2move);
        break;
      }
      else if (countsp1[index] == 2 && item.some( i => takenMovesArr.includes(i) == false) && p2move == undefined){      
        console.log(item);
        console.log(counterp1);
        p2move = item.find( i => takenMovesArr.indexOf(i) == -1); 
        console.log(p2move);
      }   
  } 
    console.log(counter)
    if (p2move != undefined && counter == winningIndices.length) return moveFunction(p2move);
    if (counter == winningIndices.length && p2move == undefined){
      counter = 0;
      for (let c of winningIndices){
          counter++;
         counterp1 = 0;
        counterp2 = 0;
        let index = winningIndices.indexOf(c);
        for (let f of player1) {        
          c.indexOf(f) != -1 ? countsp1[index] = counterp1 += 1 : 1;
        }   
        for (let g of player2) {
          c.indexOf(g) != -1 ? countsp2[index] = counterp2 += 1 : 1;
        }
        console.log(countsp1)
        // console.log("counterp2 beginning of loop " + countsp2[winningIndices.indexOf(c)]);
        if (countsp2[index] == 1 && c.some( i => takenMovesArr.indexOf(i) == -1) && p2move == undefined) {
          p2move = c.find( i => takenMovesArr.indexOf(i) == -1)
          return moveFunction(p2move);
          console.log("counterp2 == 1 " + counterp2)
          break
        }
        else if (p2move == undefined && counter == winningIndices.length){
          let randomNumber;
          do{
              randomNumber = Math.floor(Math.random() * 8);
              if (randomNumber % 2 == 0 && takenMovesArr.indexOf(randomNumber) == -1) {
                p2move = availableMovesArr[randomNumber]
                console.log("Random Number " + randomNumber)
                return moveFunction(p2move);
                break;
              }
            } while (randomNumber % 2 != 0);
          console.log("availableMovesArr")
        }
      } //END LAST LOOP
    } //if statement end
      console.log(countsp1);
      console.log(countsp2);
      console.log(player1, "<--p1 p2-->", player2);
  } // if p2 Turn == true
} // End player2Move function


