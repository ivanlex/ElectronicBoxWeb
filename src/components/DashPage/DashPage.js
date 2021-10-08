import React from "react";
import Box from "@mui/material/Box";
import {ListItem} from "@mui/material";
import "./DashPage.css"

export default function DashPage(props)
{
    const colors = ['#00D0C2','#4C71F0','#F0854C'];

    return (
        <Box
            sx={{
                margin: 2,
                boxShadow: 8,
                borderRadius: 3,
                width: 200,
                height: 200,
                bgcolor: colors[props.index  % colors.length],
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <div>
                <h1 className="dashPageTitle">{props.title}</h1>
                <h2 className="dashPageContent">{props.content}</h2>
            </div>
        </Box>
    )


}