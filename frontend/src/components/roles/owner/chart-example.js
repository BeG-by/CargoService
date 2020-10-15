import React, {useEffect, useState} from 'react'
import {render} from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {rgbToHex} from "@material-ui/core";

const optionsCore = {

    chart: {
        type: "areaspline"
    },

    credits: {
        enabled: false
    },

    title: {
        text: 'Profit chart',
        style: {color: "#3f51b5", fontSize: 18, fontWeight: "bold"}
    },
    series: [
        {
            name: "Profit",
            data: [100, 14, 55, 13],
            color: "rgba(64, 230, 75, 0.8)"
        },
        {
            name: "Losses",
            data: [13, 11, 33, 1],
            color: "rgba(235, 41, 30, 0.8)"
        },

    ],

    yAxis: {
        title: {
            text: 'Money $'
        },

    },
    xAxis: {
        title: {
            text: 'Date'
        },
        type: "datetime",
        labels: {
            format: '{value:%Y-%m-%d}',
        },
    },
    plotOptions: {
        series: {
            pointStart: Date.UTC(2010, 0, 1),
            pointInterval: 24 * 3600 * 1000 // one day
        }
    },

};

export const ProfitChart = (props) => {

    const {dataProps} = props;
    const [options, setOptions] = useState(optionsCore);


    useEffect(() => {

        let arrDate = dataProps.startDate.split("-");
        let year = Number(arrDate[0]);
        let month = Number(arrDate[1]);
        let day = Number(arrDate[2]);

        let startDateOption = Date.UTC(year, month, day);

        setOptions((prevState) => ({
            ...prevState,
            series: [
                {
                    name: "Profit",
                    data: dataProps.profits,
                    color: "rgba(64, 230, 75, 0.8)"
                },
                {
                    name: "Losses",
                    data: dataProps.losses,
                    color: "rgba(235, 41, 30, 0.8)"
                }
            ],
            plotOptions: {
                series: {
                    pointStart: startDateOption,
                    pointInterval: 24 * 3600 * 1000 // one day
                }
            },

        }));


    }, [dataProps]);


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
};


