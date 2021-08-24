// variable
const operation = document.querySelector(".operation");
const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const nums = document.querySelectorAll(".num");
const evaluate = document.querySelector(".eval");
const del = document.querySelector(".del");
const percent = document.querySelector(".percent");
const realoperators = ["+", "-", "×", "÷", "."];
console.log(realoperators);

const removeTags = (text) => {
  return text.replace(/(<([^>]+)>)/gi, "");
};

const fixSymbols = (text) => {
  const newText = removeTags(text);
  return newText.replace(/×/g, "*").replace(/÷/g, "/");
};

const setvalue = (text) => {
  let v = "";
  if (text) {
    v = eval(fixSymbols(text));
  }
  result.innerHTML = v;
};

const setOperation = (text) => {
  operation.innerHTML = text;
};

// clear btn
clear.addEventListener("click", function () {
  setOperation("");
  setvalue("");
});

// del btn
del.addEventListener("click", function () {
  const v = operation.innerHTML;
  setOperation(v.slice(0, -1));
  setvalue(v);
});

// avoid repeating operators and dot
for (const num of nums) {
  num.addEventListener("click", function () {
    //  clear result after eval
    if (operation.innerHTML.trim() === "") setvalue("");
    setOperation(operation.innerHTML + num.getAttribute("value"));
    setvalue(operation.innerHTML);
    result.style.color = "rgb(92, 92, 92,0.8)";
  });
}
for (const operator of operators) {
  operator.addEventListener("click", function () {
    // clear result after eval and pass result
    if (operation.innerHTML.trim() === "") {
      setOperation(result.innerHTML);
      setvalue("");
    }
    // repeating
    if (
      operation.innerHTML.trim()[operation.innerHTML.trim().length - 1] ===
      operator.getAttribute("value")
    ) {
      setOperation(operation.innerHTML + "");
    }
    // move from operator to other
    else if (
      realoperators.includes(
        operation.innerHTML.trim()[operation.innerHTML.trim().length - 1]
      ) &&
      operation.innerHTML.trim()[operation.innerHTML.trim().length - 1] !==
        operator.getAttribute("value")
    ) {
      console.log("i am here");
      setOperation(operation.innerHTML.trim().slice(0, -1));
      setOperation(operation.innerHTML.trim() + operator.getAttribute("value"));
    } else {
      setOperation(operation.innerHTML.trim() + operator.getAttribute("value"));
    }
  });
}

// percent btn
percent.addEventListener("click", function () {
  const r = result.innerHTML;
  const v = `( <sup>${r}</sup>/<sub>100</sub> )`;
  setOperation(v);
  setvalue(operation.innerHTML);
});

// eval btn
evaluate.addEventListener("click", function () {
  if (operation.innerHTML.trim() === "") {
    setvalue("not valid", true);
  } else {
    setvalue(operation.innerHTML);
    setOperation("");
    result.style.color = "#000";
    result.style.fontWeight = "500";
  }
});
