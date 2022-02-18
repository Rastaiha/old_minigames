import React, { Component } from 'react';
import Card from './Card';
import '../../styles/FAQ.css';
import data from './data';

function toPersianNum(num, dontTrim) {
  var i = 0,
    dontTrim = dontTrim || false,
    num = dontTrim ? num.toString() : num.toString().trim(),
    len = num.length,
    res = '',
    pos,
    persianNumbers =
      typeof persianNumber === 'undefined'
        ? ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
        : persianNumbers;

  for (; i < len; i++)
    if ((pos = persianNumbers[num.charAt(i)])) res += pos;
    else res += num.charAt(i);

  return res;
}

export default class FAQ extends Component {
  onClick = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle('active');
    const accordionItemBody = e.currentTarget.nextElementSibling;
    if (e.currentTarget.classList.contains('active')) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  };

  render() {
    return (
      <div class="faq" id="accordion">
        {data.map((qa, i) => (
          <Card
            key={i}
            question={qa.question}
            answer={qa.answer}
            number={toPersianNum(i + 1)}
            onClick={this.onClick}
          />
        ))}
        {this.props.additional && this.props.additional.length > 0
          ? this.props.additional.map((qa, i) => (
              <Card
                key={i}
                question={qa.question}
                answer={qa.answer}
                number={toPersianNum(data.length + 1 + i)}
                onClick={this.onClick}
              />
            ))
          : ''}
      </div>
    );
  }
}
