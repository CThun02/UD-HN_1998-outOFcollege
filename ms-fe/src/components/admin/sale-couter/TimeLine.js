import { Button, message, Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './TimeLine.module.css'

const Timeline = () => {
    const steps = [
        {
            title: 'Login',
            status: 'finish',
            icon: <UserOutlined />,
        },
        {
            title: 'Verification',
            status: 'finish',
            icon: <SolutionOutlined />,
        },
        {
            title: 'Pay',
            status: 'process',
            icon: <LoadingOutlined />,
        },
        {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
        },
        {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
        },
        {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
        },
    ];

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
    }));

    return (
        <>
            <div className={styles.backgroud}>
                <Steps current={current} items={items} />
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Timeline;