import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div style={{
            position:'absolute',
            width:'100%',
            height:'100%',
            overflow:'hidden',
            background:'#eee'
        }}>
            <div style={{
                position:'absolute',
                width: 32,
                height: 32,
                left:0,right:0,top:0,bottom:0,margin:'auto'
            }}>
                <Spin style={{transform:'scale(2.5)'}} size="large" />
            </div>
        </div>
    )
};

export default Loading;