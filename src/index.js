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
    /*this.props.onAttemptSubmit({
      attempt: this.state.attempt.trim(),
    });*/

    this.setState(() => ({
     attempt: "",
     story: this.state.attempt? this.state.story + this.state.attempt + '\n' : this.state.story + '',
    }));
  }
  randFunk(){
    var nums = [1,2,3,4,5,6,7,8,9,10],
        ranNums = [],
        i = nums.length,
        j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }
    console.log(nums);
    return nums;
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
