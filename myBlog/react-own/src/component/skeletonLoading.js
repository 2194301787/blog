import React from 'react';
import { Skeleton } from 'antd';

const SkeletonLoading = () => {
    return (
        <Skeleton
            active={true}
            avatar = {true}
            rows = {5}
        />
    )
}

export default SkeletonLoading;