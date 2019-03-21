import React, { Component } from "react";
import _ from "lodash";
import BarChart from "react-apexcharts";

import {Wrapper, Title, InnerWrapper, Chart, Expo} from "./Style";

export default class Valence extends Component {
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
          colors: ["#23adff"]
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
    const newLabels = _.map(this.props.valence, "name");
    const valenceData = _.map(this.props.valence, "valence");
    this.state.series.forEach(s => {
      const data = valenceData;
      newSeries.push({ data: data, type: s.type });
    });
    const calculateAvarege = () => {
      const weight = [];
      const weightedValue = valenceData.map((value, i) => {
        weight.push(i + 1);
        return Math.sqrt(valenceData.length - i) * value;
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
        <Title>Valence</Title>
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
            A measure from 0.0 to 1.0 describing the musical positiveness
            conveyed by a track. Tracks with high valence sound more positive
            (e.g. happy, cheerful, euphoric), while tracks with low valence
            sound more negative (e.g. sad, depressed, angry).
          </Expo>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
