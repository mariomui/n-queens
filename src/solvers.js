/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  let newBoard = new Board({n:n});
  console.log(newBoard, '   newBoard');
  console.log(this, '   this');
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //travel the structure
  var rows = newBoard.rows(); //2d array
  var counter = 0;

  for (var y = 0; y < rows.length; y++) {
    let row = rows[y];
    //rowindex is y
    let rowIndex = y;
    for (var x = 0; x < rows.length; x++) {
    //colindex is x
      let columnIndex = x;
    //set the value in a position
      newBoard.togglePiece(rowIndex,columnIndex);
    //run the horizontal checker, run the vertical checker
      if (newBoard.hasAnyRooksConflicts()) {
        newBoard.togglePiece(rowIndex,columnIndex);
      } else {
        counter++;
      }
      if (counter === n) {
        solution.push(newBoard);
        break;
      }
  
    //if neither are true
    //  {then accept placement
        //increment counter (counts placed rooks)} 
    //if either are true {
      //reset that value to 0 (unplace)
    

  //if counter = n then push to newBoard into solution. break out immeately
  //if we are @ outloop, set break condition 

    }
  }
  console.log(solution,'djfdk');
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
