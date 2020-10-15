import React from 'react'
import {render} from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
    title: {
        text: 'Profits and losses'
    },
    series: [
        {
            name: "Profit",
            data: [300, 350, 370, 400]
        }
    ],
    yAxis: {
        title: {
            text: 'Money'
        }
    },
    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        }
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
};

export const Chart = () => {


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
};

