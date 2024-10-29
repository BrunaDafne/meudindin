import { ResponsiveBar } from '@nivo/bar'
import { colors } from '../../styles/colors';

const data = [
    {
      label: "Monday",
      valor: 59
    },
    {
      label: "Tuesday",
      valor: 61
    },
    {
      label: "Wednesday",
      valor: 55
    },
  ];

interface GraphicBarProps {
    data: Array<any>,
    nomeValor: Array<string>,
    indexLabelHorizontal: string,
    legendaVertical: string,
    legendaHorizontal: string,
    labelTextColor?: 'brighter' | 'darker',
    margin?:  Object,
    color?: string,
}


export function GraphicBar({data, nomeValor, indexLabelHorizontal, legendaVertical, legendaHorizontal, labelTextColor = 'brighter', margin = { top: 10, right: 10, bottom: 50, left: 50 }, color = colors.blue}: GraphicBarProps) {
    return (
            <ResponsiveBar
                data={data}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            labelTextColor,
                            100
                        ]
                    ]
                }}
                keys={nomeValor}
                indexBy={indexLabelHorizontal}
                margin={margin}
                padding={0.4}
                valueScale={{ type: "linear" }}
                colors={color}
                animate={true}
                enableLabel={true}  
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legendaVertical,
                    legendPosition: "middle",
                    legendOffset: -35
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legendaHorizontal,
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
            />
    )
}