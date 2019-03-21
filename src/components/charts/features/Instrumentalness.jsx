import React, { Component } from "react";
import _ from "lodash";
import BarChart from "react-apexcharts";

import {Wrapper, Title, InnerWrapper, Chart, Expo} from "./Style";

export default class Instrumentalness extends Component {
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
          colors: ["#2851ff"]
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
    const newLabels = _.map(this.props.instrumentalness, "name");
    const instrumentalnessData = _.map(
      this.props.instrumentalness,
      "instrumentalness"
    );
    this.state.series.forEach(s => {
      const data = instrumentalnessData;
      newSeries.push({ data: data, type: s.type });
    });
    const calculateAvarege = () => {
      const weight = [];
      const weightedValue = instrumentalnessData.map((value, i) => {
        weight.push(i + 1);
        return Math.sqrt(instrumentalnessData.length - i) * value;
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
        <Title>Instrumentalness</Title>
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
            Predicts whether a track contains no vocals. “Ooh” and “aah” sounds
            are treated as instrumental in this context. Rap or spoken word
            tracks are clearly “vocal”. The closer the instrumentalness value is
            to 1.0, the greater likelihood the track contains no vocal content.
            Values above 0.5 are intended to represent instrumental tracks, but
            confidence is higher as the value approaches 1.0.
          </Expo>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
