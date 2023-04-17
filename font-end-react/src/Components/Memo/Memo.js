import React, { useState } from 'react'

import './Memo.css'

export default function Memo({ id, title, text, date, setEditing, onDeleteClick }) {
    const [hover, setHover] = useState(false);

    let OnEditClick = () => {
        setEditing(id, text, title, date);
    }

    let OnDeleteClick = () => {
        onDeleteClick(id);
    }

    return (
        <div className="memo" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>

            {
                hover &&
                <aside id="edit">
                    <i className="pi pi-times" style={{ fontSize: '0.7rem' }} onClick={OnDeleteClick}></i>
                    <i className="pi pi-pencil" style={{ fontSize: '0.7rem' }} onClick={OnEditClick}></i>
                </aside>
            }

            <h2>{title}</h2>
            <p>{text} </p>
            <aside>{date.split('T')[0]}</aside>
        </div>
    )
}
