import { Space } from 'antd'
import React from 'react'
import FollowingOrderContent from '../../customer/user/nav/following-order/content-following-order/FollowingOrderContent'
import { useState } from 'react'
import HeaderNavFollowOrder from '../../customer/user/nav/following-order/header-nav/HeaderNavFollowOrder'
import { useParams } from 'react-router-dom'

const TimelineByBillCode = () => {

    const { billCode } = useParams();

    return (
        <div style={{ margin: 30 }}>
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
                <FollowingOrderContent
                    billCode={billCode}
                    symbol={''}
                    status={''}
                    count={''}
                    createdBy={''} />
            </Space>
        </div>
    )
}

export default TimelineByBillCode
