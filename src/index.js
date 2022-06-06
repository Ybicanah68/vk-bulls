import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import PropTypes from 'prop-types';

import './panels/style.css';

// Init VK  Mini App
bridge.send("VKWebAppInit");

//ReactDOM.render(<App />, document.getElementById("root"));

const node = document.getElementById("root");

class CowsAndBulls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rand: this.randFunk(),
      attempt: "",
      story: "",
      result: "",
    };
    this.handleAttemptChange = this.handleAttemptChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAttemptChange(event) {
    let val = event.target.value.replace(/\D/g, "");

    if(event.target.value.length>4){
      val = event.target.value.slice(0, -1);
      alert("Введите число из 4 цифр");
    }

    if(this.validate2(event.target.value)){
     val = event.target.value.slice(0, -1);
     alert("Цифры не должны повторяться"); 
    }

    this.setState(() => ({
      attempt: val
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    this.state.attempt? this.validate1(this.state.attempt) : alert("Введите число");
    console.log(this.state.rand);
    const randArray = this.state.rand.split('');
    const attemptArray = this.state.attempt.split('');
    const resultArray = this.compareArrays(randArray, attemptArray);
    if(resultArray.exact == 4){
      alert("Победа!");
    }
    this.setState(() => ({
     attempt: "",
     story: this.state.attempt? this.state.story + this.state.attempt + ": Коровы:" + resultArray.values + " Быки:" + resultArray.exact + '\n' : this.state.story + '',
    }));
  }
  randFunk(){
    const base = [1,2,3,4,5,6,7,8,9,0];
    this.shuffleArray(base);
    const result = base.slice(0,4);
    const resultString = result.join("");
    return resultString;
  }
  shuffleArray(array){
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
      }
  }
  compareArrays(firstArray, secondArray){
      let values = 0;
      let exact = 0;
      firstArray.forEach(digit => {
          if (secondArray.indexOf(digit)!==-1) {
              if (secondArray.indexOf(digit) === firstArray.indexOf(digit)) {
                exact++;
              } else values++;
          }
      });
      return {values, exact};
  }
  validate1(digits){
    if (digits.length !=4){
      alert("Введите число из 4 цифр");
    }
  }
  validate2(digits){
    let i = 0;
    for(i=0; i < digits.length; i++) {
      if (digits.split(digits[i]).length-1 > 1) {
        return true;
      }  
    }
    return false;
  }
  render() {
    return React.createElement(
      "form",
      {
        className: "attemptForm",
        onSubmit: this.handleSubmit
      },
      React.createElement("span", {
        className: "title",
      }, "Введите число:"),
      React.createElement("input", {
        className: "attempt",
        type: "text",
        //placeholder: "Попытка",
        value: this.state.attempt,
        onChange: this.handleAttemptChange
      }),
      React.createElement("input", {
        className: "attempt-submit",
        type: "submit",
        value: "Подтвердить"
      }),
      React.createElement("textarea", {
        className: "attempt-textarea",
        readOnly: "readOnly",
        placeholder: "Ваши попытки",
        value: this.state.story,
      }),
    );
  }
}

const Test = React.createElement(CowsAndBulls);

ReactDOM.render(Test, node);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
