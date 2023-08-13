import React from 'react';
import { HashLoader } from "react-spinners";
import './loading.scss'

const Loading = () => {
    return (
        <div className='loading'>
            <HashLoader color="#36d7b7" />
        </div>
    )
}

export default Loading