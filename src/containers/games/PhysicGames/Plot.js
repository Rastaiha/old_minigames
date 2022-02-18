import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Scatter } from 'react-chartjs-2';

var data = {
  labels: ['Scatter'],
  datasets: [
    {
      label: 'داده‌ها',
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      data: [
      ]
    }
  ]
};

function getData(dataX, dataY) {
  let newData = []
  for (let i = 0; i < dataX.length; i++) {
    if (dataX[i] && dataY[i]) {
      newData.push({ x: dataX[i], y: dataY[i] })
    }
  }
  data.datasets[0].data = newData;
  return data;
}

export default class Chart extends Component {

  componentDidMount() {
    this.timer = setInterval(() => {
      data = getData(this.props.dataX, this.props.dataY);
      this.forceUpdate();
    }, (500));
  }

  render() {
    return (
      <Segment>
        <Scatter data={data} />
      </Segment>
    );
  }
}