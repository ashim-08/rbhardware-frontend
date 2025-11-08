import { useState } from 'react';
import { X } from 'lucide-react';

const CalculatorModal = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForValue, setWaitingForValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForValue) {
      setDisplay(num);
      setWaitingForValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    } else {
      setPreviousValue(inputValue);
    }

    setWaitingForValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForValue(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForValue) {
      setDisplay('0.');
      setWaitingForValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-80 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Calculator</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
          <div className="text-right text-2xl font-mono">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={clear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded font-medium"
          >
            Clear
          </button>
          <button
            onClick={clearEntry}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded font-medium"
          >
            CE
          </button>
          <button
            onClick={() => inputOperation('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-medium"
          >
            ÷
          </button>

          {[7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-medium"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('*')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-medium"
          >
            ×
          </button>

          {[4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-medium"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('-')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-medium"
          >
            -
          </button>

          {[1, 2, 3].map(num => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-medium"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperation('+')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-medium row-span-2"
          >
            +
          </button>

          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-medium"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-medium"
          >
            .
          </button>

          <button
            onClick={performCalculation}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded font-medium"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;