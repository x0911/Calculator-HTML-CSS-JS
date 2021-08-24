// variables
      const operation = document.querySelector('.operation');
      const result = document.querySelector('.result');
      const clear = document.querySelector('.clear');
      const operators = document.querySelectorAll('.operator');
      const nums = document.querySelectorAll('.num');
      const evaluate = document.querySelector('.eval');
      const del = document.querySelector('.del');
      const percent = document.querySelector('.percent');
      const realoperators= ['+','-','*','/','.'];
      console.log(realoperators);

      // clear btn
      clear.addEventListener('click', function () {
        operation.value = '';
        result.textContent = '';
      });

      // del btn
      del.addEventListener('click',function(){
        operation.value = operation.value.slice(0, -1);
        result.textContent =  eval(operation.value);
      });

      // avoid repeating operators and dot
      for(const num of nums){
        num.addEventListener('click', function () {
          //  clear result after eval 
          if (operation.value === "") result.textContent = '';
          operation.value += num.getAttribute('value');
          result.textContent =  eval(operation.value);
          result.style.color = 'rgb(92, 92, 92,0.8)';
        })
      }; 
      for(const operator of operators){
        operator.addEventListener('click', function () {
          // clear result after eval and pass result
          if (operation.value === "") {
            operation.value = result.textContent;
            result.textContent = '';
          }
          // repeating 
          if (operation.value[operation.value.length - 1] === operator.getAttribute('value')) {
          operation.value += '';
          } 
          // move from operator to other
          else if( 
            realoperators.includes(operation.value[operation.value.length - 1]) &&
            operation.value[operation.value.length - 1] !== operator.getAttribute('value')
          ){
            console.log('i am here');
            operation.value = operation.value.slice(0, -1);
            operation.value += operator.getAttribute('value');
            // operation.value[operation.value.length - 1] = operator.getAttribute('value');
          }
          else {operation.value += operator.getAttribute('value');}
      })};

      // percent btn
      percent.addEventListener('click', function () {
        operation.value = `(${operation.value})/100`;
        result.textContent =  eval(operation.value);
      });

      // eval btn
      evaluate.addEventListener('click', function() {
        if (operation.value === '' && result.textContent === '' ) {
        result.textContent = 'not valid';
      } else if (operation.value === '' && result.textContent !== '' ) {
        result.textContent = result.textContent;
        result.style.color = '#000';
        result.style.fontWeight = '500';
      } else {
        result.textContent = eval(operation.value);
        // result.textContent ? result.textContent : eval(operation.value);
        operation.value = '';
        result.style.color = '#000';
        result.style.fontWeight = '500';
      }});
