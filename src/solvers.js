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
<<<<<<< HEAD
  var solution = undefined; //fixme
  
=======
>>>>>>> 509b0b70d6474e48b86b7ec46c8921922e3678c1

  let solution = []; //fixme
  let newBoard = new Board({n:n});
  let rows = newBoard.rows();
  let counter = 0;

  for (let y = 0; y < rows.length; y++) {
    let row = rows[y];
    let rowIndex = y;

    for (let x = 0; x < row.length; x++) {
      let columnIndex = x;
      newBoard.togglePiece(rowIndex,columnIndex);

      if (newBoard.hasAnyRooksConflicts()) {
        newBoard.togglePiece(rowIndex, columnIndex);

      } else {
        counter++;

      }
      if (counter === n) {
        solution.push(rows);
        return rows;
      }
    }
  }
    
    //if neither are true
    //  {then accept placement
        //increment counter (counts placed rooks)} 
    //if either are true {
      //reset that value to 0 (unplace)
    

  //if counter = n then push to newBoard into solution. break out immeately
  //if we are @ outloop, set break condition 
  // console.log(solution,' solution');
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0; 
  let newBoard = new Board({'n' : n});
  let rows = newBoard.rows(); //>>2dArray
  let rowIndex = 0;

  let findCount = (rowIndex)  => {
    if (rowIndex === n) {
      solutionCount++;
      return;
      
    } else {

      for ( let columnIndex = 0; columnIndex < n; columnIndex++ ) {
        let positionValue = rows[rowIndex][columnIndex];
        newBoard.togglePiece(rowIndex, columnIndex);

        if  ( !newBoard.hasAnyRooksConflicts() && (positionValue !== 1) ) {
          rowIndex += 1;
          findCount(rowIndex);
          rowIndex -= 1;
          newBoard.togglePiece(rowIndex, columnIndex);

        } else {
          newBoard.togglePiece(rowIndex, columnIndex);
        }
        }
      }
    }
    findCount(rowIndex);
    return solutionCount;
  };


  // debugger;
  // var solutionCount = 0; //fixme
  // let solution = []; //fixme
  // let newBoard = new Board({'n':n});
  // // console.log(newBoard, '   newBoard');
  // // console.log(this, '   this');
  // // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // //travel the structure
  // let rows = newBoard.rows(); //2d array
  // var counter = 0;

  // for (let y = 0; y < rows.length; y++) {
  //   let row = rows[y];
  //   let rowIndex = y;

  //   for (let x = 0; x < row.length; x++) {
  //     let columnIndex = x;

  //     newBoard.togglePiece(rowIndex,columnIndex);

  //     if (newBoard.hasAnyRooksConflicts()) {
  //       newBoard.togglePiece(rowIndex, columnIndex);
  //     } else {
  //       counter++;
  //       if (counter !== 0) {
  //         solutionCount++
  //       }
  //     }

      // if (counter === solutionCount) {
      //   // solution.push(rows);
      //   solutionCount += 1;
      // }
  //   }
  // }
  

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
// };

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solution = []; 
  let newBoard = new Board({'n' : n});
  let rows = newBoard.rows(); //>>2dArray
  let rowIndex = 0;
  console.log(newBoard, '   newBoard');

  let findSolution = (rowIndex)  => {
    if (rowIndex === n) {
      solution.push(newBoard);
      return;
      
    } else {

      for ( let columnIndex = 0; columnIndex < n; columnIndex++ ) {
        let positionValue = rows[rowIndex][columnIndex];
        newBoard.togglePiece(rowIndex, columnIndex);

        if  ( !newBoard.hasAnyRooksConflicts() && (positionValue !== 1) ) {
          rowIndex += 1;
          findCount(rowIndex);
          rowIndex -= 1;
          newBoard.togglePiece(rowIndex, columnIndex);

        } else {
          newBoard.togglePiece(rowIndex, columnIndex);
        }
        }
      }
    }
    findCount(rowIndex);
    return solutionCount;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0; 
  let newBoard = new Board({'n' : n});
  let rows = newBoard.rows(); //>>2dArray
  let rowIndex = 0;

  let findCount = (rowIndex)  => {
    if (rowIndex === n) {
      solutionCount++;
      return;
      
    } else {

      for ( let columnIndex = 0; columnIndex < n; columnIndex++ ) {
        let positionValue = rows[rowIndex][columnIndex];
        newBoard.togglePiece(rowIndex, columnIndex);

        if  ( !newBoard.hasAnyQueenConflicts() && (positionValue !== 1) ) {
          rowIndex += 1;
          findCount(rowIndex);
          rowIndex -= 1;
          newBoard.togglePiece(rowIndex, columnIndex);

        } else {
          newBoard.togglePiece(rowIndex, columnIndex);
        }
        }
      }
    }
    findCount(rowIndex);
    return solutionCount;

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};
