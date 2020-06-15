/*
██████╗ ██╗   ██╗██████╗  ██████╗ ███████╗████████╗
██╔══██╗██║   ██║██╔══██╗██╔════╝ ██╔════╝╚══██╔══╝
██████╔╝██║   ██║██║  ██║██║  ███╗█████╗     ██║
██╔══██╗██║   ██║██║  ██║██║   ██║██╔══╝     ██║
██████╔╝╚██████╔╝██████╔╝╚██████╔╝███████╗   ██║
╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝   ╚═╝

 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝

*/


let budgetController = (function () {

  //create func constructor template for expenses
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1; //begins as null
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }


  };

  Expense.prototype.getPercentage = function () {
    return this.percentage; // simple func to return the property obtained via calcPercentage
  };




  //and one for income
  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //Store all expense/income data in these objects of arrays -->

  let calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;

    });
    data.totals[type] = sum;
    /* current sum = 0;
    [200, 400, 100]
    sum = 0 + 200
    then next iteration..
    sum = 200 + 400
    sum = 600 + 100
    */
  };


  let data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1 //Non existent
  };

  return {
    addItem: function (type, des, val) {
      let newItem, ID;
      //ID = last ID + 1
      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new item based on inc or exp type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      //Push it into our data structure and return the new element..
      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function (type, id) {
      let ids, index;
      // id = 3
      //Create an array with all ID's
      //Loop it with map
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });
      //Returns our target index number
      index = ids.indexOf(id);

      if (index != -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function () {

      // calc total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      //calc the budget: income minus expenses
      data.budget = data.totals.inc - data.totals.exp;

      //calc the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }


      // Expense = 100 and income = 200, spent 50% = 100/200 = 0.5 * 100


    },


    calculatePercentages: function () {

      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      let allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function () {
      console.log(data);

    }
  };

})();

/*
██╗   ██╗██╗
██║   ██║██║
██║   ██║██║
██║   ██║██║
╚██████╔╝██║
 ╚═════╝ ╚═╝

 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝

*/
//IIFE's Seperates modules so that one can safely be altered without effecting the other...
let UIController = (function () {


  let DOMstrings = {
    //Store the query strings in a seperate object incase changes are made later...
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage'
  };
  //Public method within the IIFE
  return {
    getinput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function (obj, type) {
      let html, newHtml, element;
      //Create HTML string with placeholder txt
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Replace placeholder with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function (selectorID) {

      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    //Clear inputs of description and value to empty
    clearFields: function () {
      let fields, fieldsArr;

      //Below, the 'current' param of forEach will see both of these DOM strings as the current.value of the array and clear them.
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);


      //Tricks the slice method into thinking we're giving it an array
      //Array object constructor function - implements 'slice' proto for all arrays..
      fieldsArr = Array.prototype.slice.call(fields);
      //For each..
      fieldsArr.forEach(function (current, index, array) {
        current.value = '';
      });
      //Reset focus to first element of the array - the description field
      fieldsArr[0].focus();
    },

    displayBudget: function (obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
      document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }

    },

    displayPercentages: function (percentages) {
      let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      let nodeListForEach = function (list, callback) {
        for (let i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      };

      nodeListForEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });

    },

    //Expose DOMstrings to Public
    getDOMstrings: function () {
      return DOMstrings;
    }
  };

})();


/*
 ██████╗ ██╗      ██████╗ ██████╗  █████╗ ██╗          █████╗ ██████╗ ██████╗
██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║         ██╔══██╗██╔══██╗██╔══██╗
██║  ███╗██║     ██║   ██║██████╔╝███████║██║         ███████║██████╔╝██████╔╝
██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║         ██╔══██║██╔═══╝ ██╔═══╝
╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗    ██║  ██║██║     ██║
 ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝     ╚═╝

 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝

*/
let controller = (function (budgetCtrl, UICtrl) {

  //Place all event listners in a func..
  let setupEventListeners = function () {
    let DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();

      }

    });
    // Adds event listener to the div associated with the income/expense container declared up in DOMstrings --> this way we dont have to add listener to each item ..bubble up effect
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);


  };

  let updateBudget = function () {
    //Calc budget
    budgetCtrl.calculateBudget();

    //Return the budget

    let budget = budgetCtrl.getBudget();
    // Display it
    UICtrl.displayBudget(budget);

  };

  let updatePercentages = function () {
    //Calc percentages
    budgetCtrl.calculatePercentages();
    //Read percentages from budg controller
    let percentages = budgetCtrl.getPercentages();
    // Update the UI with the new ones
    UICtrl.displayPercentages(percentages);
  };

  let ctrlAddItem = function () {
    let input, newItem;
    // Get input data
    input = UICtrl.getinput();
    //Will only execute the following lines IF there's a description, value IS a valid number and said num is greater than 0
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      // Add item to the budget controller
      newItem = budgetController.addItem(input.type, input.description, input.value);

      //Add Item to UI
      UICtrl.addListItem(newItem, input.type);

      //Clear the fields
      UICtrl.clearFields();

      //Calc and update the budget
      updateBudget();
    }

    //Calc and update percentages
    updatePercentages();

  };

  let ctrlDeleteItem = function (e) {
    let itemID, splitID;
    //Traverse the dom back to the element we're interested in...the parent div
    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;


    if (itemID) {

      //inc-1 etc...
      splitID = itemID.split('-');
      type = splitID[0]; //splits inc-1 to inc which is the our [type]
      ID = parseInt(splitID[1]); //the number after inc-


      //Delete item from data structure
      budgetCtrl.deleteItem(type, ID);
      //Delete item frm UI
      UICtrl.deleteListItem(itemID);
      //Update and show new budget
      updateBudget();

      //Calc and update percentages
      updatePercentages();
    }
  };


  //a place for code we want executed when app first starts
  return {
    init: function () {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController); //gives controller access to the other modules

//fires off event listners
controller.init();
