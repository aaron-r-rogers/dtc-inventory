import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from "@material-ui/core/IconButton";

// styling for icon
const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        bottom: '3vh',
        backgroundColor: '#C60C30',
        color: 'white',
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: '#397BA6',
            backgroundColor: '#DCDCDC'
        },
        right: '5%',
    }
}))


const ReturnToTop = ({
    showBelow
}) => {

    const classes = useStyles();

    // determines whether or not to show button
    const [show, setShow] = useState(showBelow ? false : true)

    // uses offset to trigger state var to show button
    const handleScroll = () => {
        if (window.scrollY > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    // adds event listener for scrolling on page load
    useEffect (() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)     
        }
    })

    // provides coordinates and behavior for click handler
    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }
    return (
        <div>
            {show &&
                <IconButton onClick={handleClick} className={classes.toTop}>
                    <ExpandLessIcon />
                </IconButton>
            }
        </div>
    )
}

export default ReturnToTop