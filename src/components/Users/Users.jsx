import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
    {
    heading: 'Username',
    property: 'username'
    },
    {
    heading: 'Authorization',
    property: 'authLevel'
    },
]

function Users() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_USERS",
        });
    }, []);

    const users = useSelector((store) => store.admin);

    return (
    <>
    <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
    >
        <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
        >
            USERS
        </Typography>

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 250 }}>
        <TableHead>
            <TableRow>{columns?.map(col => 
                <TableCell key={`thead-${col.heading}`}>
                    {col.heading}
                </TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
            {users?.map(user =>
            <TableRow 
                sx={{ '&:last-child td, &:last-child th': 
                    { border: 0 } }} 
                key={`${user.id}-row`}>
                
                {columns?.map(col => 
                    <TableCell 
                        key={`${user.id}-${col.property}`}>
                            {user[col.property]}
                    </TableCell>)}
            </TableRow>
            )}
        </TableBody>
    </Table>
    </TableContainer>

    </Grid>

    </>
    );
}

export default Users;