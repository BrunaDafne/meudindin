import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
      day: "Monday",
      degress: 59
    },
    {
      day: "Tuesday",
      degress: 61
    },
    {
      day: "Wednesday",
      degress: 55
    },
  ];

export function GraphicBar() {
    return (
        <div style={{ width: "25vw", minHeight: '100%', backgroundColor: 'yellow', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ResponsiveBar
                data={data}
                keys={["degress"]}
                indexBy="day"
                margin={{ top: 0, right: 130, bottom: 50, left: 60 }}
                padding={0.4}
                valueScale={{ type: "linear" }}
                colors="#3182CE"
                animate={true}
                enableLabel={false}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "degrees",
                    legendPosition: "middle",
                    legendOffset: -40
                }}
            />
        </div>
        
    )
}