import React from 'react'
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { BiHappy } from 'react-icons/bi'
import { MdCompress, MdOutlineWaterDrop } from 'react-icons/md'
import './Descriptions.css'

const Descriptions = ({ weather, tempUnit }) => {
  const windUnits = tempUnit === '°C' ? 'm/s' : 'm/h'
  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: 'min',
      data: weather.temp_min.toFixed(),
      unit: tempUnit
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: 'max',
      data: weather.temp_max.toFixed(),
      unit: tempUnit
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: 'feels like',
      data: weather.feels_like.toFixed(),
      unit: tempUnit
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: 'Pressure',
      data: weather.pressure,
      unit: 'hPa'
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: 'humidity',
      data: weather.humidity,
      unit: '%'
    },
    {
      id: 6,
      icon: <FaWind />,
      title: 'wind Speed',
      data: weather.speed,
      unit: windUnits
    },
  ]


  return (
    <div className="section section__description">
      {cards.map((id) => {
        return (

          <div key={id.id} className="card">
            <div className="description__card-icon">
              {id.icon}
              <small>{id.title}</small>
            </div>
            <h2>{id.data} {id.unit}</h2>
          </div>)
      })}
    </div>
  )
}

export default Descriptions