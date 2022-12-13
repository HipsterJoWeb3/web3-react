import {colors} from "../utils/colors";


export type ChartConfiguration = {
    labels: string[]
    datasets: {
        yAxisID: string
        label: string
        data: number[]
        borderColor: string
        backgroundColor: string
        borderWidth: number
    }[]
}

export type ChartData = {
    label: string,
    data: number[]
}

export type useChartProps = (labels: string[], chartData: ChartData[]) => ChartConfiguration

export const useChart: useChartProps = (labels, chartData) => {
    const data = {
        labels,
        datasets: chartData.map((item, index) => {
            return {
                yAxisID: 'y',
                label: item.label,
                data: item.data,
                borderColor: '#000',
                backgroundColor: Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)],
                borderWidth: 1
            }
        })
    }
    return data
}