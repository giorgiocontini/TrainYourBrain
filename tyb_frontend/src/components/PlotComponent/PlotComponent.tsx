import React, {MouseEvent, useEffect, useRef} from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import {Chart} from 'react-chartjs-2';



ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

export const options= {
    scales: {
        y: {
            beginAtZero: true
        },x: {
            display: false,
            beginAtZero: true
        }
    }
};

type PlotProps = {
    data: {label: string, value: number, labelAX:string}[];
    label: string;
    plotType: "bar" | "line" | "pie";
}

function generateRandomRGB(): string {
    // Genera tre numeri interi casuali tra 0 e 255
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Restituisci la stringa della configurazione RGB
    return `rgb(${r}, ${g}, ${b})`;
}

const PlotComponent = ({data, plotType}: PlotProps) => {


    // Raggruppa i dati per etichetta
    const groupedData = data.reduce((acc, curr) => {
        //@ts-ignore
        if (!acc[curr.label]) {
            //@ts-ignore
            acc[curr.label] = [];
        }
        //@ts-ignore
        acc[curr.label].push({x: curr.labelAX, y: curr.value});
        return acc;
    }, {});



// Mappa i dati raggruppati in oggetti dataset
    const datasets = Object.keys(groupedData).map((label) => {
        return {
            type: plotType,
            label,
            borderColor: generateRandomRGB(),
            borderWidth: 2,
            fill: true,
            data: groupedData[label as keyof {}],

        };
    });

    const plotData = {
        //labels: data.map((el)=>{return el.labelAX}), //mostrate sotto - date
        labels: data.map((el)=>{return el.labelAX;}), //mostrate sotto - date
        datasets
    };

    useEffect(() => {
        console.log(plotData)
        debugger
    }, [plotData]);
    const chartRef = useRef<ChartJS>(null);

    const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const {current: chart} = chartRef;

        if (!chart) {
            return;
        }
    };

    return (
        <Chart
            ref={chartRef}
            type={plotType}
            onClick={onClick}
            options={options}
            data={plotData}
        />
    );
}

export default PlotComponent;
