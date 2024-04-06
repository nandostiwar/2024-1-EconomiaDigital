import TableProps from '@/models/Table'
import React from 'react'

const Table: React.FC<TableProps> = ({ columns, body }) => {
  return (
    <div className="overflow-x-auto w-full bg-white rounded-md shadow-sm">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead className='text-xl'>
          <tr>
            <th></th>
            {columns.map(col => {
              return (
                <th style={{ width: `${col.width ?? 100 / columns.length}%` }}>
                  {col.name}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className='text-lg'>
          {body.map((row, idx) => {
            console.log(row)
            return (
              <tr>
                <th>{idx}</th>
                {row.values.map((value) => (<th>{value}</th>))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
