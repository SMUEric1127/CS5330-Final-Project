import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

export const AdminActionMenu = ({ table }: { table: string }) => {
    const [tableData, setTableData] = useState<{ columns: string[], data: string[] }>({ columns: [], data: [] }); // Update initial state value

    useEffect(() => {
        if (table != '') {
            // post to /api/get_table_data with json "table_name": table, then setTableData(response)
            fetch('/api/get_table_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ table_name: table }),
            })
                .then(response => response.json())
                .then(data => {
                    setTableData(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [table])

    return (
        <motion.div className="flex items-center flex-col max-h-[60vh] overflow-y-auto"
            key={table}
            initial={{ y: "50px" }} // start from above the viewport
            animate={{ y: 0 }} // animate to its original position
            exit={{ y: "50px" }} // exit to above the viewport
            transition={{ duration: 0.3 }}
        >
            {tableData.columns && tableData.columns.length == 0 && <p className="text-center">No data available, select a table on the left</p>}
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableData.columns && tableData.columns.length > 0 && <TableHead>ID</TableHead>}
                        {tableData.columns && tableData.columns.map((column: string) => (
                            <TableHead key={column}>{column}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.data && tableData.data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            {Array.isArray(row) && row.map((data: string, index: number) => (
                                <TableCell key={index}>{data}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    )
}
