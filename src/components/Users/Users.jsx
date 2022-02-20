// External imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

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
import Button from '@mui/material/Button';


function Users() {

    const dispatch = useDispatch();
    const Swal = require('sweetalert2');

    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_USERS",
        });
    }, [users]);

    const users = useSelector((store) => store.admin);

    const updateAuth = (user) =>{
        let newAuth
        Swal.fire({
            title: 'Are you sure?',
            text: "You are changing authorization and access.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change auth.'
        }).then((result) => {
            if (result.isConfirmed) {
                if (user.authLevel === 'guest') {
                    newAuth = 'admin'
                }
                else if (user.authLevel === 'admin') {
                    newAuth = 'guest'
                }
                dispatch({
                    type: "UPDATE_USER_AUTH",
                    payload: {
                        id: user.id,
                        authLevel: newAuth
                    }
                });
                Swal.fire('Updated!', `The user's authorization has been updated.`, 'success');
            }
        });
    };

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
            <TableRow> 
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Authorization</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Manage Auth</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {users?.map(user =>
            <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.authLevel}</TableCell>
                <TableCell>
                    <Button 
                        variant="contained"
                        size="small"
                        onClick={event => updateAuth(user)}>Toggle
                    </Button>
                </TableCell>
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