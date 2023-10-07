import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'

const ModalConfirm = ({ isModalOpen, handleOk, handleCancel }) => {

    const [note, setNote] = useState('')

    const handleOkConfirm = () => {
        handleOk(note);
        setNote('');
    };

    return (
        <>
            <Modal title="Ghi chú" open={isModalOpen}
                onOk={() => handleOkConfirm()}
                onCancel={handleCancel}>
                <TextArea rows={4}
                    value={note}
                    onChange={(event) => setNote(event.target.value)} />
            </Modal>
        </>
    );
}

export default ModalConfirm
