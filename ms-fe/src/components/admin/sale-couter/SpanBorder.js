import React from 'react'

const SpanBorder = ({ color, child }) => {
    const styles = {
        backgroundColor: color,
        borderRadius: '100px',
        color: '#fff',
        with: 'auto',
        padding: '2px 10px'
    }
    return (
        <span style={styles}>
            {child}
        </span>
    )
}

export default SpanBorder
