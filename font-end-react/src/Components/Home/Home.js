import React, { useEffect } from 'react'
import { useState } from 'react'
import './Home.css'

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Memo from '../Memo/Memo';
import axios from 'axios';

export default function Home() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [memos, setMemos] = useState([]);
    const [date, setDate] = useState('');

    const [editID, setEditID] = useState(null);

    useEffect(() => {
        axios.get('api/Memo/GetAll').then(res => {
            setMemos(res.data);
        }).catch(err => console.log(err.message))
    }, [])

    let onAddClick = (e) => {
        e.preventDefault();

        let date = new Date();
        date = `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}`;

        axios.post('api/Memo', { UserId: 1, Text: text, Title: title, Date: date }).then(res => {

            memos.push({ userid: 1, text: res.data.text, title: res.data.title, date: res.data.date, id: res.data.id })
            setMemos(memos);

            resetAll();
        }).catch(err => {
            console.log(err);
        })
    }

    let onEditClick = (e) => {
        e.preventDefault();
        axios.put('api/Memo/' + editID, { UserId: 1, Text: text, Title: title, Date: date, Id: editID }).then(res => {

            let temp = structuredClone(memos);
            temp[temp.findIndex(x => x.id === editID)] = { userid: 1, text: text, title: title, date: date, id: editID };

            setMemos(temp);

            resetAll();
        }).catch(err => {
            console.log(err);
        })
    }

    let setEditing = (id, text, title, date) => {
        setText(text); setTitle(title); setDate(date); setEditID(id);
    }

    let onDeleteClick = (id) => {
        axios.delete('api/Memo/' + id)
            .then(res => {
                let temp = structuredClone(memos)
                temp.splice(temp.findIndex(x => x.id === id), 1);

                setMemos(temp);
            })
            .catch(err => console.log(err.message));
    }

    let onCancelClick = () => {
        resetAll();
    }

    let resetAll = () => {
        setText(''); setTitle(''); setDate(''); setEditID(null);
    }

    return (
        <div className='wrapper'>
            <div id="divider">
                <section class="input-form">
                    <form>
                        <div>
                            <InputText placeholder="Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <InputTextarea placeholder="what's on your mind?" required value={text} onChange={(e) => setText(e.target.value)} rows={5} cols={30} />
                        </div>

                        <aside>
                            {
                                !editID && <Button label="Save Memo" type='submit' onClick={onAddClick} />
                            }
                            {
                                editID && <Button label="Edit" type='submit' onClick={onEditClick} />
                            }
                            {
                                editID && <Button label="Cancel" onClick={onCancelClick} />
                            }
                        </aside>
                    </form>
                </section>

                <section id="memos">
                    {
                        memos.map((el) => (
                            <Memo key={el.id} id={el.id} title={el.title} text={el.text} date={el.date} setEditing={setEditing} onDeleteClick={onDeleteClick} />
                        ))
                    }
                </section>
            </div>
        </div>
    )
}
