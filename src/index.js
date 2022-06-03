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
    const val = event.target.value.replace(/\D/g, "");
    this.setState(() => ({
      attempt: val
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.rand);
    const randArray = this.state.rand.split('');
    const attemptArray = this.state.attempt.split('');
    const resultArray = this.compareArrays(randArray, attemptArray);
    if(resultArray.exact == 4){
      alert("Победа!");
    }
    this.setState(() => ({
     attempt: "",
     story: this.state.attempt? this.state.story + "Коров:" + resultArray.values + " Быков:" + resultArray.exact + '\n' : this.state.story + '',
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
      })
    );
  }
}

const Test = React.createElement(CowsAndBulls);

ReactDOM.render(Test, node);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
