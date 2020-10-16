import React, {useEffect, useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export const ProfitChart = (props) => {

    const {dataProps} = props;
    const [options, setOptions] = useState(getOptions([100, 103], [312, 331], Date.UTC(2020, 9, 13),));


    useEffect(() => {

        let arrDate = dataProps.startDate.split("-");
        let year = Number(arrDate[0]);
        let month = Number(arrDate[1]);
        let day = Number(arrDate[2]);
        let startDateOption = Date.UTC(year, month, day);

        setOptions(getOptions(dataProps.profits, dataProps.losses, startDateOption));

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


const getOptions = (profits, losses, start) => {

    return {
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
                data: profits,
                color: "rgba(64, 230, 75, 0.8)",
                pointStart: start,
                pointInterval: 24 * 3600 * 1000 // one day
            },
            {
                name: "Losses",
                data: losses,
                color: "rgba(235, 41, 30, 0.8)",
                pointStart: start,
                pointInterval: 24 * 3600 * 1000 // one day
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
        }
    }

};


