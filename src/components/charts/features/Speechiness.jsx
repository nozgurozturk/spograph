import React, { Component } from "react";
import _ from "lodash";
import BarChart from "react-apexcharts";

import {Wrapper, Title, InnerWrapper, Chart, Expo} from "./Style";

export default class Speechiness extends Component {
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
          colors: ["#249dff"]
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
    const newLabels = _.map(this.props.speechiness, "name");
    const speechinessData = _.map(this.props.speechiness, "speechiness");
    this.state.series.forEach(s => {
      const data = speechinessData;
      newSeries.push({ data: data, type: s.type });
    });
    const calculateAvarege = () => {
      const weight = [];
      const weightedValue = speechinessData.map((value, i) => {
        weight.push(i + 1);
        return Math.sqrt(speechinessData.length - i) * value;
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
        <Title>Speechiness</Title>
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
            Speechiness detects the presence of spoken words in a track.
            The more exclusively speech-like the recording (e.g. talk show,
            audio book, poetry), the closer to 1.0 the attribute value. Values
            above 0.66 describe tracks that are probably made entirely of spoken
            words. Values between 0.33 and 0.66 describe tracks that may contain
            both music and speech, either in sections or layered, including such
            cases as rap music. Values below 0.33 most likely represent music
            and other non-speech-like tracks.
          </Expo>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
