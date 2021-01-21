import { Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

import { transformData } from './transform'
// import { BarExtendedDatum, BarTooltipDatum, ResponsiveBar } from '@nivo/bar'

interface ComparisonBarGraphProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

const ComparisonBarGraph = ({ nameMapping, results }: ComparisonBarGraphProps) => {
  const data = useMemo(() => transformData(results, nameMapping), [results, nameMapping])
  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
        Average Damage
      </Typography>
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={data}>
          <XAxis dataKey="save" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.values(nameMapping).map(name => (
            <Bar dataKey={name} fill="#8884d8" />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// const NivoTooltip = ({ id, value, color, data }: BarTooltipDatum) => {
//   const { save, ...values } = data
//   return (
//     <div>
//       <Typography>
//         <strong>Save: {save}</strong>
//       </Typography>
//       {Object.keys(values).map(name => (
//         <Typography variant="body2" key={name}>
//           {id === name ? (
//             <strong>
//               {name}: {values[name]}
//             </strong>
//           ) : (
//             `${name}: ${values[name]}`
//           )}
//         </Typography>
//       ))}
//     </div>
//   )
// }

// const NivoComparisonBarGraph = ({ nameMapping, results }: ComparisonBarGraphProps) => {
//   const data = useMemo(() => transformData(results, nameMapping), [results, nameMapping])

//   return (
//     <div>
//       <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
//         Average Damage
//       </Typography>
//       <div style={{ height: 300 }}>
//         <ResponsiveBar
//           data={data}
//           indexBy="save"
//           keys={Object.values(nameMapping)}
//           groupMode="grouped"
//           tooltip={NivoTooltip}
//           // innerPadding={3}
//           animate
//           enableLabel={false}
//           enableGridX
//         />
//       </div>
//     </div>
//   )
// }

export default ComparisonBarGraph
// export default NivoComparisonBarGraph
