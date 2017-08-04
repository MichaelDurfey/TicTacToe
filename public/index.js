  let container = document.getElementById('letterSpacesContainer')
  let boardArr = ['-','-','-','-','-','-','-','-','-'];
  let player1Letter;
  let player2Letter;
  let player1 = [];
  let player2 = [];
  let player1Score = 0;
  let player2Score = 0;
  let firstMove = [0,2,6,8];

  let winningIndices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0,3,6], [1, 4, 7], [2,5,8], [6,4,2], [0,4,8]];


  let winnerAction = a => {
    $(container).html(`
      <div class = "winner">
        ${a} wins!
      </div>
    `); 
    window.setTimeout(initialize, 3000)
  }

  let itsADraw = () => {
    $(container).html(`
      <div class = "winner">
        It's a draw!
      </div>
    `)
    window.setTimeout(() => {initialize}, 3000)
  }

  let checkForWinner = () => {
    let winner;
    return winningIndices.forEach( item => {
     item.every(element => player1.includes(element)) ? winner = "User" : item.every(element => player2.includes(element)) ? winner = "player2" : winner = undefined;
      if (winner !== undefined) winnerAction(winner);
      if (boardArr.indexOf('-') == -1) {
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
    boardArr = ['-','-','-','-','-','-','-','-','-'];
    player1 = [];
    player2 = [];
    $(container).html(gameChoicesHTML)
    let choice1 = document.getElementById("choice1");
    let choice2 = document.getElementById("choice2");  
    $(choice1).on('click', () => {
      player1Letter = "X";
      player2Letter = "O";     
      $(container).html(gameBoardHTML)
      choiceMade = true;
    })
    $(choice2).on('click', () => {
      player1Letter = "O";
      player2Letter = "X";
      $(container).html(gameBoardHTML)
      choiceMade = true;
    })
  }
  initialize()

  let moveFunction = (p2move) => {        
    boardArr.forEach( (item, index) => {
        let li = document.getElementById(index);
      if (item !== '-'){
        $(li).html(item)
      }
    }) 
    checkForWinner();
  };

  let myId;

  $(container).on('click', '.space', (e)=>{
    let moveId;
    if (choiceMade = true) {
    moveId = e.currentTarget.id;
    moveId = Number(moveId)
    let endIndex = moveId + 1;
      if (boardArr[moveId] == "-"){
        player1.push(moveId)
        boardArr.fill(player1Letter, moveId, endIndex)
      }
    moveFunction(); 
    myId = window.setTimeout(() => { player2Move(moveId, player2Letter)}, 3000)
    }
  })
    let counter;  
    let p2move;

//-----------------PLAYER2MOVE--------------///

let player2Move = (moveId, player2Letter) => {
  window.clearTimeout(myId)
  let availableMovesArr = [];
  let p2moveObj = {};   
   let boardObj = {};
  
  boardArr.forEach( (item, index) => {
    boardObj[index] = item;
    if (item == "-") availableMovesArr.push(index)
  })

  winningIndices.forEach( item => {
    counter = 0;      
    p2moveObj[item] = counter += 1;
        // availableMovesArr.push(...availableMovesArr)   
  }) // END winningIndices for each loop   
    // let findersKeepers = newArr.filter( i => boardArr[i] == "-");
    moveFunction(p2move);
    console.log(player1, "hi", player2);
    let endIndex;
    endIndex = p2move + 1;
    boardArr.fill(player2Letter, p2move, endIndex);
    player2.push(p2move);  
} // End player2Move function



