import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'

const ModalConfirm = ({ isModalOpen, handleOk, handleCancel }) => {

    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <TextArea rows={4} />
            </Modal>
        </>
    );
}

export default ModalConfirm
