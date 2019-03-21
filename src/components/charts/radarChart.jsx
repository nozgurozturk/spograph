import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import RadarChart from "react-apexcharts";

const Wrapper = styled.div`
  width: 100vw;
  margin-top:10vh;
  margin:auto;
`;

export default class Radarchart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          radar: {
            size: undefined
          }
        },
        fill: {
          opacity: 0.3
        },
        stroke: {
          show: false,
          width: 0
        },
        markers: {
          size: 2,
          strokeWidth: 0
        },
        tooltip: {
          y: {
            formatter: val => {
              return val;
            }
          }
        },
        labels: [
          "Acousticness",
          "Danceability",
          "Energy",
          "Instrumentalness",
          "Liveness",
          "Speechiness",
          "Valence"
        ],
        colors: [
          "#ff3b7c",
          "#ff3a92",
          "#ff39a8",
          "#ff37d6",
          "#fb35ff",
          "#cf33ff",
          "#a431ff",
          "#7d2fff",
          "#592dff",
          "#382cff",
          "#2a3aff",
          "#2851ff",
          "#2765ff",
          "#2677ff",
          "#2586ff",
          "#2493ff",
          "#249dff",
          "#23a6ff",
          "#23adff",
          "#23b2ff",
          "#23b6ff"
        ],
        legend: {
          offsetY: 50,
          position: "right",
          show: true,
          fontFamily: 'futura-pt"',
          itemMargin: {
            horizontal: 2
          }
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart:{
                height:350
              },
              labels: [
                "A",
                "D",
                "E",
                "I",
                "L",
                "S",
                "V"
              ],
              plotOptions: {
                radar: {
                  size: 150,
                }
              },
              legend: {
                show: false,
              }
            }
          }
        ]
      },
      seriesRadar: [
        { name: "01", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "02", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "03", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "04", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "05", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "06", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "07", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "08", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "09", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "10", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "11", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "12", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "13", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "14", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "15", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "16", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "17", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "18", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "19", data: [0, 0, 0, 0, 0, 0, 0] },
        { name: "20", data: [0, 0, 0, 0, 0, 0, 0] }
      ]
    };
  }

  updateSeries = () => {
    const newSeries = [];
    _.map(this.props.array, d => {
      const data = [
        d.acousticness,
        d.danceability,
        d.energy,
        d.instrumentalness,
        d.liveness,
        d.speechiness,
        d.valence
      ];
      newSeries.push({ data, name: d.name });
    });
    this.setState({ seriesRadar: newSeries });
  };

  componentDidMount() {
    setTimeout(() => {
      this.updateSeries();
    }, 1000);
  }
  render() {
    return (
      <Wrapper>
        <RadarChart
          options={this.state.options}
          series={this.state.seriesRadar}
          type="radar"
          width="90%"
        />
      </Wrapper>
    );
  }
}
