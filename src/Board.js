// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  
  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      // console.log(this.get('hi'));
      // console.log(this, '   this');
      // console.log(params, '   params');
      // console.log(this.get(rowIndex, '   rowIndex'));
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
    
    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },
    
    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
    
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },
    
    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },
    
    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },
    
    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },
    
    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },
    
    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },
    
    
    /*
    _             _     _
    ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
      |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
      
      */
     /*=========================================================================
     =                 TODO: fill in these Helper Functions                    =
     =========================================================================*/
     
     // ROWS - run from left to right
     // --------------------------------------------------------------
     //
     // test if a specific row on this board contains a conflict
     hasRowConflictAt: function(rowIndex) {
      //  console.log(this.get(rowIndex),'this.get!');
      let rowArray = this.get(rowIndex);
      let testObj = {};
      for (let i = 0; i < rowArray.length; i++) {
        let el = rowArray[i];
        if (testObj[el] && el !== 0) {
          return true;
        } else {
          testObj[el] = true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let rows = this.rows();  
      //[1,0],
      //[0,0]
      var counter = 0;
      for (let i = 0; i < rows.length; i++) {
       let row = rows[i];
       counter += row[colIndex];
      }
      // rows.reduce( (currentRow, nextRow) => {
      //   counter += currentRow[colIndex] + nextRow[colIndex];
      //   return currentRow;
      // });
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let rows = this.rows(); // gets me the 2d board
      for (let i = 0; i < rows.length; i++) {  // >> height of the board then end. ex. 3
        let row = rows[i]; //first row, second row, third row
        for (let j = 0; j < row.length; j++) { 
          let colIndex = j;
          let col = row[j]; //col = firstrow[0]
          if (this.hasColConflictAt(j)) {
            return true;
          }
        }
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //check singular major diagonal
      //input is index int
      let rows = this.rows();
      let counter = 0;

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let value = row[majorDiagonalColumnIndexAtFirstRow];
        if (value === 1) {
          counter += 1;
        }
        majorDiagonalColumnIndexAtFirstRow++;
      };
      if (counter > 1) {
        return true;
      }
      return false;

      //   for (let j = majorDiagonalColumnIndexAtFirstRow; j < row.length - 1; j++) {
      //     let value = row[j];
          
      //     // let nextRow = i + 1;
      //     // let nextCol = j + 1;
      //     console.log(nextRow, 'nextRow')
      //     // let next = rows[nextRow][nextCol];
      //     if (current === next) {
      //       return true;
      //     }
      //   }
      // }
      // rows.reduce( (currentRow, nextRow) => {
      //   console.log(counter, '    counter');
      //   if (majorDiagonalColumnIndexAtFirstRow < 0) {
      //     return currentRow;
      //   }
      //   counter += currentRow[majorDiagonalColumnIndexAtFirstRow] + nextRow[majorDiagonalColumnIndexAtFirstRow];
      //   return currentRow;
      // });
    },

    hasAnyMajorDiagonalConflicts: function() {
      // check all major diagonals
      let rows = this.rows(); 
      let startingIndex = -(rows.length - 1);
      for (let i = startingIndex; i < 0; i++) {  
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      for (let i = 0; i < rows.length; i++) {  
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let rows = this.rows();
      let counter = 0;

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let value = row[minorDiagonalColumnIndexAtFirstRow];
        
        if (value === 1) {
          counter += 1;
        }
        minorDiagonalColumnIndexAtFirstRow--;
      };
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let rows = this.rows(); 
      let startingIndex = (rows.length - 1) * 2;
      for (let i = 0; i < rows.length; i++) {  
        for (let j = startingIndex; j >= rows.length; j--) { 
          if (this.hasMinorDiagonalConflictAt(j)) {
            return true;
          }
        }
      }
      for (let i = 0; i < rows.length; i++) {  
        let currentRow = rows[i];
        let nextRow = rows[i + 1];
        for (let j = rows.length - 1; j >= 0; j--) { 
          if (this.hasMinorDiagonalConflictAt(j)) {
            return true;
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
