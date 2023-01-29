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
const addNewSecBtn = call(".addNewSecBtn");
const addNewSecInp = call(".addNewSecInp");
const yesBtn = call(".yesBtn");
const submitBtn = call(".submitBtn");
const addInput = call(".numAdd");
const userName = call("#name");
const years = call("#years");
const undo = call(".undo");
const creditUnits = callAll(".creditUnit");
const grades = callAll(".grade");
const courseCodeInputs = callAll(".courseCode");
let totalUnit = call(".totalUnit");
let gpaValue = call(".gpaScore");
const level = call(".level");
const semester = call(".semester");
let displayResult = call(".displayResult");
let cgpaScore = call(".cgpaScore");
let displayBg = call(".modalResult-bg");
let helpBtn = document.querySelector(".help");
let modal = document.getElementById("modal");
let closeBtn = document.querySelector(".cancelBtn");

var levelCount = 1;
let cgpaArray = [];
let clickedYesBtn = false;
let clickedUndoBtn = false;
let clickedCalcBtn = false;

document.addEventListener("keydown", e => {
  if (e.key === "Enter") addNewInput();
});
addInputBtn.addEventListener("click", addNewInput);
calculateBtn.addEventListener("click", gpaResult);
// yesBtn.addEventListener("click", continueCalculation);
// noBtn.addEventListener("click", stopCalculation);
// submitBtn.addEventListener("click", formSubmit);
undo.addEventListener("click", undoCgpaArray);
helpBtn.addEventListener("click", () => (modal.style.display = "block"));
closeBtn.addEventListener("click", () => (modal.style.display = "none"));

// When Undo button is clicked, pop last item from array
function undoCgpaArray() {
  if (!clickedUndoBtn) {
    addInput.focus();
    addInput.select();

    grades.forEach(grade => {
      grade.value = "";
    });
    creditUnits.forEach(creditUnit => {
      creditUnit.value = "";
    });
    courseCodeInputs.forEach(courseCodeInput => {
      courseCodeInput.value = "";
    });
    totalUnit.innerHTML = 0;
    gpaValue.innerHTML = 0;

    cgpaArray.pop();

    clickedUndoBtn = true;
    clickedCalcBtn = false;

    cgpaScore.innerHTML = cgpaCal(cgpaArray);

    console.log(cgpaArray);
  }
}

// Calculate for the next semester
function continueCalculation() {
  if (!clickedYesBtn) {
    addInput.focus();
    addInput.select();

    grades.forEach(grade => {
      grade.value = "";
    });
    creditUnits.forEach(creditUnit => {
      creditUnit.value = "";
    });
    courseCodeInputs.forEach(courseCodeInput => {
      courseCodeInput.value = "";
    });
    totalUnit.innerHTML = 0;
    gpaValue.innerHTML = 0;

    if (semester.innerHTML === "1st") {
      semester.innerHTML = "2nd";
    } else {
      semester.innerHTML = "1st";
      levelCount++;
    }

    level.innerHTML = levelCount;

    clickedYesBtn = true;
    clickedCalcBtn = false;

    console.log(clickedYesBtn);
  }
}

// 4.50-5.00         1st Class
// 3.5-4.49          2nd Class Upper
// 2.50-3.49         2nd Class Lower
// 1.50-2.49         3rd Class
// 1.00-1.49         Pass
// 0.-0.99           Fail

// Forecast Result when no button is clicked
// When form is submitted
function formSubmit(e) {
  const formError = call("#formError");
  const modalBg = call(".modal-bg");
  let messages = [];

  addInput.focus();
  addInput.select();
  if (userName.value === "" || userName.value == null) {
    messages.push("Name is required");
  }

  if (years.value === "" || years.value == null) {
    messages.push("Years of program is required");
  }

  if (messages.length > 0) {
    formError.innerText = messages.join(", ");
  } else {
    e.preventDefault();
    modalBg.style.display = "none";
  }
}

// Make name first Letter uppercase
function firstUpper(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Function to calculate the gpa score
function gpaResult() {
  const creditUnits = callAll(".creditUnit");
  const grades = callAll(".grade");
  let totalUnit = call(".totalUnit");
  let gpaValue = call(".gpaScore");
  let error = call(".error");

  let resultContinue = call(".resultContinue");

  let arrCredit = [];
  let arrGrade = [];

  if (!clickedCalcBtn) {
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
    let sumGPA = arrGrade.reduce((r, a, i) => {
      return r + a * arrCredit[i];
    }, 0);

    // totalUnit has the total summed credit
    totalUnit.innerHTML = sumCredit;

    gpaValue.innerHTML =
      (sumGPA / sumCredit).toFixed(2) === "NaN"
        ? disErr()
        : (sumGPA / sumCredit).toFixed(2);

    let scoreValue = (sumGPA / sumCredit).toFixed(2);

    cgpaArray.push(scoreValue);

    // cgpaScore.innerHTML = cgpaCal(cgpaArray);

    // creditUnits.forEach(creditUnit => {});

    function disErr() {
      // Error displays immediately
      setTimeout(() => {
        error.style.display = "block";
      }, 0);

      // at 5s error message disappears
      setTimeout(() => {
        error.style.display = "none";
      }, 5000);

      return 0;
    }

    if ((sumGPA / sumCredit).toFixed(2) != "NaN") {
      resultContinue.style.display = "block";
    }
    // resultContinue.style.display = "block";
    clickedCalcBtn = true;

    clickedYesBtn = false;
    clickedUndoBtn = false;
  }

  // console.log(cgpaArray);
}

// Calculate the cgpa
function cgpaCal(cgpaArr) {
  let sum = cgpaArr.reduce((a, b) => Number(a) + Number(b));
  return (sum / cgpaArr.length).toFixed(2);
}

// Calculate the average score
function averageGPA(years, score) {
  let gpaNext;

  const extract = cgpaArray.reduce((a, b) => {
    a.push(score - b);
    return a;
  }, []);
  const extractSum = extract.reduce((a, b) => a + b);

  function getAverage() {
    let average;

    average = extractSum / (yearsProgram(years) - cgpaArray.length) + score;

    if (average < 0) {
      return 0;
    }

    return average.toFixed(2);
  }

  gpaNext = getAverage();

  return gpaNext;
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
          <option value="C">C</option>
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
    default:
      return undefined;
  }
}
//register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then(res => console.log("registered"))
      .catch(err => console.log("not registered", err));
  });
}
