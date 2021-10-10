import React, { useRef, useEffect, useState } from 'react';

import { btns, BTN_ACTIONS } from "./btnConfig";

function Calculator(props) {

  const btnsRef = useRef(null);
  const expRef = useRef(null);

  const [expression, setExpression] = useState('');
  const [themeDark, setThemeDark] = useState(false);

  useEffect(() => {
    const btns = Array.from(btnsRef.current.querySelectorAll('button'));

    btns.forEach(e => e.style.height = e.offsetWidth + 'px');
  }, []);

  const btnClick = (item) => {
    const expDiv = expRef.current;

    // Theme
    if (item.action === BTN_ACTIONS.THEME) {
      const calculatorElement = document.getElementsByClassName('calculator');
      const calculatorExpElement = document.getElementsByClassName('calculator__result__exp');
      if (!themeDark) {
        calculatorElement[0].classList.add('dark');
        calculatorExpElement[0].classList.add('dark');
        setThemeDark(true);
      } else {
        calculatorElement[0].classList.remove('dark');
        calculatorExpElement[0].classList.remove('dark');
        setThemeDark(false);
      }
      // document.body.classList.toggle('dark');
    }
    // Add
    if (item.action === BTN_ACTIONS.ADD) {
      addElementSpan(item.display);

      const operator = item.display !== 'x' ? item.display : '*';
      setExpression(expression + operator);
    }

    if (item.action === BTN_ACTIONS.DELETE) {
      expDiv.parentNode.querySelector('div:last-child').innerHTML = '';
      expDiv.innerHTML = '';

      setExpression('');
    }
    console.log(expression);

    if (item.action === BTN_ACTIONS.CALC) {
      if (expression.trim().length <= 0) return;

      expDiv.parentNode.querySelector('div:last-child').remove();

      const cloneNode = expDiv.cloneNode(true);
      expDiv.parentNode.appendChild(cloneNode);

      const transform = `translateY(${-(expDiv.offsetHeight + 10) + 'px'}) scale(0.4)`;

      try {
        let res = eval(expression);

        setExpression(res.toString());
        setTimeout(() => {
          cloneNode.style.transform = transform;
          expDiv.innerHTML = '';
          addElementSpan(Math.floor(res * 100000000) / 100000000);
        }, 200);
      } catch {
        setTimeout(() => {
          cloneNode.style.transform = transform;
          cloneNode.innerHTML = 'Error';
          cloneNode.style.color = 'red';
        }, 200);
      } finally {
        console.log('calc success');
      }

    }
  }

  const addElementSpan = (content) => {
    const expDiv = expRef.current;
    const span = document.createElement('span');

    span.innerHTML = content;
    expDiv.appendChild(span);
  }
  return (
    <div className="calculator">
      <div className="calculator__result">
        <div ref={expRef} className="calculator__result__exp">
        </div>
        <div className="calculator__result__exp">

        </div>
      </div>

      <div ref={btnsRef} className="calculator__btn">
        {
          btns.map((item, index) => (
            <button
              key={index}
              className={item.class}
              onClick={() => btnClick(item)}
            >
              {item.display}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default Calculator;