import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

async function loginUser(credentials) {
    return fetch('loginVerify',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(data => console.log("failed"));
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [openDialog, setOpenDialog] = useState(false);

    const textFieldColor = '#E0E0E0';

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });

        if(token === undefined || token.length === 0)
        {
            setOpenDialog(true);
        }
        else
        {
            setToken(token);
        }
    }

    const handleClose = () =>{
        setOpenDialog(false);
    }

    return(
        <div className="login-wrapper">
            <h1 style={{"color":textFieldColor}}>请输入用户凭证</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <TextField color='warning' inputProps={{sx:{color:textFieldColor}}} id="outlined-basic" label="用户名" variant="outlined" onChange={e => setUserName(e.target.value)} />
                </p>
                <p>
                    <TextField color='warning' inputProps={{sx:{color:textFieldColor}}} id="outlined-basic" label="密码" variant="outlined" onChange={e => setPassword(e.target.value)} />
                </p>
                <div align="center">
                    <Button type="submit" variant="contained">登录</Button>
                </div>
            </form>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    验证失败
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        用户名或密码不争确，请确认用户名密码的大小写。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        好的
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};