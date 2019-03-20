import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import Chart from "react-apexcharts";

export default class Danceability extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: [0, 4],
          colors: ["#FF0000", "#ff0000"]
        },
        fill: {
          colors: ["#cf33ff"]
        },
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20"
        ],
        xaxis: {
          type: "category"
        },
        yaxis: [
          {
            title: {
              text: "Danceability"
            }
          }
        ],
        legend: {
          show: false
        }
      },
      series: [
        {
          name: "Value",
          type: "column",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Average",
          type: "line",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.updateSeries();
    }, 2000);
  }
  updateSeries = () => {
    const newSeries = [];
    const newLabels = _.map(this.props.danceability, "name");
    const danceData = _.map(this.props.danceability, "danceability");
    this.state.series.map(s => {
      const data = danceData;
      newSeries.push({ data: data, type: s.type });
    });
    const calculateAvarege = () => {
      const weight = [];
      const weightedValue = danceData.map((value, i) => {
        weight.push(i + 1);
        return Math.sqrt(danceData.length - i) * value;
      });
      const sumValue = _.reduce(
        weightedValue,
        (sum, n) => {
          return sum + n;
        },
        0
      );
      const sumWeight = _.reduce(
        weight,
        (sum, n) => {
          return sum + Math.sqrt(n);
        },
        0
      );
      return sumValue / sumWeight;
    };
    const average = new Array(20).fill(calculateAvarege());
    newSeries[1].data = average;
    this.setState({
      options: { ...this.state.options, labels: newLabels },
      series: newSeries
    });
  };
  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="350"
        />
      </div>
    );
  }
}
