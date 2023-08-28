// To get a element from html dom
function call(name) {
  return document.querySelector(name);
}

// To get elements from html dom
function callAll(name) {
  return document.querySelectorAll(name);
}

// Selecting various elements from the DOM
const addInputBtn = call(".add");
const calculateBtn = call(".calculate");
const yesBtn = call(".yesBtn");
const addInput = call(".numAdd");
const creditUnits = callAll(".creditUnit");
const grades = callAll(".grade");
let totalUnit = call(".totalUnit");
let gpaValue = call(".gpaScore");
let displayResult = call(".displayResult");
let helpBtn = document.querySelector(".help");
let modal = document.getElementById("modal");
let closeBtn = document.querySelector(".cancelBtn");


addInputBtn.addEventListener("click", addNewInput);
calculateBtn.addEventListener("click", gpaResult);
helpBtn.addEventListener("click", () => (modal.style.display = "block"));
closeBtn.addEventListener("click", () => (modal.style.display = "none"));

// Function to calculate the gpa score
function gpaResult() {
  const creditUnits = callAll(".creditUnit");
  const grades = callAll(".grade");
  let totalUnit = call(".totalUnit");
  let gpaValue = call(".gpaScore");

  let resultContinue = call(".resultContinue");

  let arrCredit = [];
  let arrGrade = [];

    creditUnits.forEach(creditUnit => {
      if (creditUnit.value !== "") {
        arrCredit.push(Number(creditUnit.value));
      }
    });

    grades.forEach(grade => {
      if (grade.value !== "") {
        arrGrade.push(gradeToPoints(grade.value));
      }
    });

    // From the array - arrCredit, adding all values in the array
    let sumCredit = arrCredit.reduce((a, b) => {
      return a + b;
    });

    // Output is stored as sumGPA
    //i -> index, r -> total,  a -> gradeAlloted 
    let sumGPA = arrGrade.reduce((r, a, i) => {
      return r + a * arrCredit[i];
    }, 0);

    // totalUnit has the total summed credit
    totalUnit.innerHTML = sumCredit;

    gpaValue.innerHTML = (sumGPA / sumCredit).toFixed(2);

    resultContinue.style.display = "block";

}

// Function to add new inputs to the page
function addNewInput() {
  const displayOutput = call(".display__output"); // selecting the table body
  const addInput = call(".numAdd").value; // indicating the number of rows to be added

  // A function to add rows which takes a parameter
  function addRow(num) {
    let str = `
      <div class="display__output__container">
        <input type="text" name="courseCode" class="courseCode" placeholder="e.g. Course 1" />
    
        <select class="creditUnit">
          <option value="0">0</option>
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      
        <select class="grade">
          <option value="O" selected>O</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="F">F</option>
          </select>
      </div>
    `;

    // If the parameter is null or there's nothing ""
    // the process should just return the str variable
    if (num === "") return str;

    // This is to make the str (string) variable repeat
    // at a certain amount of time based on the argument passed
    return str.repeat(num);
  }

  // Function invoked
  displayOutput.innerHTML = addRow(addInput);
}

// Grade value to points
function gradeToPoints(grade) {
  switch (grade) {
    case "O":
      return 10;
      break;
    case "A+":
      return 9;
      break;
    case "A":
      return 8;
      break;
    case "B+":
      return 7;
      break;
    case "B":
      return 6;
      break;
    case "C+":
      return 5;
      break;
      case "F":
      return 0;
      break;
    default:
      return undefined;
  }
}
