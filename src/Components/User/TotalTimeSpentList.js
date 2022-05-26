import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";

const TotalTimeSpentList = (props) => {

    
    const COLUMNS = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Logo',
            accessor: 'logo'
        },
        {
            Header: 'Channel Name',
            accessor: 'channel_name'
        },
        {
            Header: 'Duration',
            accessor: 'totaltime',
        },

    ]

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.channels, [props.channels])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns: columns,
        data: data
    },
    useSortBy)


    return (
        <div class="table-responsive">
            <table {...getTableProps()} class="table display nowrap table-striped table-bordered" >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔼' : ' 🔽'): ' 🔃'}
                                        </span>
                                        </th>
                                ))
                            }

                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }

                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>

    )
}
export default TotalTimeSpentList;