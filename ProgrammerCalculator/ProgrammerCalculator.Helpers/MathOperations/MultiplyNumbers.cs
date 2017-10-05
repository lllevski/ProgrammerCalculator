﻿using System;
using ProgrammerCalculator.Helpers.Contracts;
using ProgrammerCalculator.Helpers.Enumerations;

namespace ProgrammerCalculator.Helpers.MathOperations
{
    public class MultiplyNumbers : MathOperation, IMathOperation
    {
        public override long Calculate(OperatorType operatorType, long firstOperand, long secondOperand)
        {
            if (operatorType == OperatorType.Multiplication)
            {
                return firstOperand * secondOperand;
            }
            else if(this.nextOperation != null)
            {
                return this.nextOperation.Calculate(operatorType, firstOperand, secondOperand);
            }
            else
            {
                throw new ArgumentException("Supported operations: Add, Subtract, Multiply, Divide!");
            }
        }
    }
}
