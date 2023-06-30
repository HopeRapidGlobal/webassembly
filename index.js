import { fibonacciWasm, add } from './build/release.js';
import { fibonacciJs } from './module.js';
const types = {
  js: 'js',
  wasm: 'wasm',
}
console.log(add(1, 2));

const getInputNumber = () => {
  const value = document.getElementById('number').value;
  if (value) {
    return Number(value);
  }
  alert('Please input Fibonacci number');
  return 0;
};

const updateResult = (result) => {
  document.getElementById('result').innerHTML = `Result: ${result}`;
}

const updateCache = (type, executionTime) => {
  const previousTimes = localStorage.getItem(type);
  const newTimes = previousTimes ? `${previousTimes}|${executionTime}` : `${executionTime}`;
  localStorage.setItem(type, newTimes);
}

const addNewData = (type, data) => {
  const resultElement = document.getElementById(`${type}-execution`);
  resultElement.innerHTML += `<li>${data}</li>`;
};

const calcAverage = (type) => {
  const data = localStorage.getItem(type);
  if (data) {
    const timeArray = data.split('|');
    const sum = timeArray.reduce((a, b) => Number(a) + Number(b), 0);
    const averageElement = document.getElementById(`${type}-average`);
    averageElement.innerHTML = Math.round(sum / timeArray.length);
  }
};

const compare = () => {
  const jsAverage = document.getElementById('js-average').innerHTML;
  const wasmAverage = document.getElementById('wasm-average').innerHTML;
  if (jsAverage && wasmAverage) {
    const result = ((Number(jsAverage) - Number(wasmAverage)) / Number(wasmAverage) * 100).toFixed(2);
    document.getElementById('compare').innerHTML = `WebAssembly is ${result}% faster than JavaScript`;
  }
};

const calcFibonacci = (type) => {
  const number = getInputNumber();
  if (number) {
    const start = Date.now();
    const result = type === types.js ? fibonacciJs(number) : fibonacciWasm(number);
    const end = Date.now();
    const executionTime = end - start;
    updateResult(result);
    updateCache(type, executionTime);
    addNewData(type, executionTime);
    calcAverage(type);
    compare();
  }
};

const init = () => {
  const jsResultElement = document.getElementById('js-execution');
  const jsResult = localStorage.getItem(types.js)?.split('|');
  if (jsResult && jsResult.length > 0) {
    jsResult.forEach(data => jsResultElement.innerHTML += `<li>${data}</li>`);
    calcAverage(types.js);
  }
  const wasmResultElement = document.getElementById('wasm-execution');
  const wasmResult = localStorage.getItem(types.wasm)?.split('|');
  if (wasmResult && wasmResult.length > 0) {
    wasmResult.forEach(data => wasmResultElement.innerHTML += `<li>${data}</li>`);
    calcAverage(types.wasm);
  }
  compare();
};

document.getElementById('reset-button').addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

document.getElementById('js-button').addEventListener('click', () => calcFibonacci(types.js));

document.getElementById('wasm-button').addEventListener('click', () => calcFibonacci(types.wasm));

init();