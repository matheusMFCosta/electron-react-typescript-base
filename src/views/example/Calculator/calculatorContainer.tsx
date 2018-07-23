import * as React from "react"

type operationDigits = "-" | "+" | "*" | "/" | "Clear"
const Operators = ["-", "+", "*", "/", "Clear"]

export interface CalculatorContainerProps {}

export interface CalculatorContainerState {
  prevDigit: string
  currentDigit: string
  operationDigit: operationDigits
  lastResult: string
}

export default class CalculatorContainer extends React.Component<
  CalculatorContainerProps,
  CalculatorContainerState
> {
  state: CalculatorContainerState = {
    operationDigit: "+",
    currentDigit: "0",
    prevDigit: "0",
    lastResult: "-",
  }

  isOperator = (operator: string) => {
    return Operators.includes(operator)
  }

  selectClear = () => {
    this.setState({ currentDigit: "0" })
  }

  selectGetResult = () => {
    const { operationDigit, currentDigit, prevDigit } = this.state
    let result
    switch (operationDigit) {
      case "+":
        result = parseInt(currentDigit) + parseInt(prevDigit)
        break
      case "-":
        result = parseInt(currentDigit) - parseInt(prevDigit)
        break
      case "*":
        result = parseInt(currentDigit) * parseInt(prevDigit)
        break
      case "/":
        result = parseInt(currentDigit) / parseInt(prevDigit)
        break
    }
    this.setState({ lastResult: result, prevDigit: result, currentDigit: "0" })
  }

  selectNewOperator = (digit: operationDigits) =>
    this.setState({ prevDigit: this.state.currentDigit, operationDigit: digit, currentDigit: "0" })

  selectNewDigit = (digit: string) =>
    this.setState({
      currentDigit: this.state.currentDigit === "0" ? digit : `${this.state.currentDigit}${digit}`,
    })

  render() {
    const { operationDigit, currentDigit, lastResult, prevDigit } = this.state
    return (
      <div className="flex flex-column w-30">
        <div className="ba b-base-1 bg-base-2">{currentDigit}</div>
        <div>
          <div className="flex justify-between">
            <CalculatorDigit onClick={this.selectNewDigit} value={"1"} />
            <CalculatorDigit onClick={this.selectNewDigit} value={"2"} />
            <CalculatorDigit onClick={this.selectNewDigit} value={"3"} />
            <CalculatorDigit onClick={this.selectNewOperator} value={"+"} />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <CalculatorDigit onClick={this.selectNewDigit} value={"4"} />
            <CalculatorDigit onClick={this.selectNewDigit} value={"5"} />
            <CalculatorDigit onClick={this.selectNewDigit} value={"6"} />
            <CalculatorDigit onClick={this.selectNewOperator} value={"-"} />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <CalculatorDigit onClick={this.selectNewDigit} value={"7"} />
            <CalculatorDigit onClick={this.selectNewDigit} value={"8"} />
            <CalculatorDigit onClick={this.selectNewDigit} value={"9"} />
            <CalculatorDigit onClick={this.selectNewOperator} value={"/"} />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <CalculatorDigit onClick={this.selectClear} value={"Clear"} />
            <CalculatorDigit onClick={this.selectNewDigit} value={"0"} />
            <CalculatorDigit onClick={this.selectNewOperator} value={"*"} />
            <CalculatorDigit onClick={this.selectGetResult} value={"="} />
          </div>
        </div>
        {lastResult !== "-" && <div className="ba b-base-1 bg-base-3">result: {lastResult} </div>}
      </div>
    )
  }
}

export interface CalculatorDigitProps {
  value: string
  onClick(digit: string)
}

class CalculatorDigit extends React.PureComponent<CalculatorDigitProps, any> {
  onHandleClick = () => {
    this.props.onClick(this.props.value)
  }

  public render() {
    return (
      <div className="w-100 g-h12 bg-base-3 ba b--base-1" onClick={this.onHandleClick}>
        <div className="g-pt6 tc">{this.props.value}</div>
      </div>
    )
  }
}
