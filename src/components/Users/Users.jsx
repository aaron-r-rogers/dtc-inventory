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
import Button from '@mui/material/Button';


function Users() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_USERS",
        });
    }, []);

    const users = useSelector((store) => store.admin);

    const updateAuth = (user) =>{
        let newAuth
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
                <TableCell>Username</TableCell>
                <TableCell>Authorization</TableCell>
                <TableCell>Manage Auth</TableCell>
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