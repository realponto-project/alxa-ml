import { Card } from 'antd'
import { find, map, propEq } from 'ramda'
import React, { PureComponent } from 'react'
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const formatCurrency = (currency) =>
  currency.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

const CustomTooltipLine = (values) => {
  const { active, payload, label } = values

  if (active && payload && payload.length) {
    return (
      <Card>
        <p className="label">{label}</p>
        {map(
          (item) => (
            <p
              style={{
                color: item.stroke
              }}>{`${item.dataKey} : ${formatCurrency(item.value)}`}</p>
          ),
          payload
        )}
      </Card>
    )
  }

  return null
}

const CustomTooltipBar = (values) => {
  const { active, payload, label } = values

  if (active && payload && payload.length) {
    const variation = find(propEq('dataKey', 'variation'), payload)

    let color = '#1890FF'

    if (variation.value !== 0) {
      if (variation.value > 0) {
        color = '#82ca9d'
      } else {
        color = '#f74c4c'
      }
    }

    return (
      <Card>
        <p className="label">{label}</p>
        <p style={{ color }}>{`Variação : ${formatCurrency(
          variation.value
        )}`}</p>
      </Card>
    )
  }

  return null
}

export default class Example extends PureComponent {
  render () {
    return (
      <div style={{ width: '600px', height: '600px' }}>
        <ResponsiveContainer width="100%" height="50%">
          <LineChart
            syncId="anyId"
            data={this.props.source}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip content={<CustomTooltipLine />} />
            <Legend verticalAlign="middle" align="right" />
            <Line
              type="monotone"
              activeDot={{ r: 6 }}
              dataKey="Preço antigo"
              stroke="#1890FF"
            />
            <Line type="monotone" dataKey="Preço novo" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="50%">
          <BarChart
            width={500}
            syncId="anyId"
            height={300}
            data={this.props.source.map((item) => {
              const variation = item['Preço novo'] - item['Preço antigo']
              return {
                ...item,
                variation,
                fill: variation > 0 ? '#82ca9d' : '#f74c4c'
              }
            })}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltipBar />} />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="variation" fill="#1890FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
