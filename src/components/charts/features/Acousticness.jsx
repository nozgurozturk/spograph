import React, { Component } from "react";
import _ from "lodash";
import BarChart from "react-apexcharts";

import { Wrapper, Title, InnerWrapper, Chart, Expo } from "./Style";

export default class Acousticness extends Component {
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
          width: [0, 2],
          colors: ["#000000", "#ff0000"]
        },
        fill: {
          colors: ["#ff37d6"]
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
          type: "category",
          labels: {
            rotate: -90
          }
        },
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
    const newLabels = _.map(this.props.acousticness, "name");
    const acousticData = _.map(this.props.acousticness, "acousticness");
    this.state.series.forEach(s => {
      const data = acousticData;
      newSeries.push({ data: data, type: s.type });
    });
    const calculateAvarege = () => {
      const weight = [];
      const weightedValue = acousticData.map((value, i) => {
        weight.push(i + 1);
        return Math.sqrt(acousticData.length - i) * value;
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
      <Wrapper>
        <Title>Acousticness</Title>
        <InnerWrapper>
          <Chart>
            <BarChart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="90%"
              height="350"
            />
          </Chart>
          <Expo>
            A confidence measure from 0.0 to 1.0 of whether the track is
            acoustic. 1.0 represents high confidence the track is acoustic
          </Expo>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
