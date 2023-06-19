import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Stack } from '@mui/material';
import Todo from '../components/Todo';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where } from 'firebase/firestore';
import '../App.css';
import { db } from '../firebase';
import { User } from "firebase/auth";
import Auth from '../services/auth';
import { useNavigate } from 'react-router-dom';
const docsRef = collection(db, 'todos')

const queryBuilder = (userId: string | null = null) => {
    if (!userId) {
    return query(docsRef, orderBy('timestamp', 'desc'));

    }
    return query(docsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
}

function Todos() {
    const auth = new Auth()

    const [todos, setTodos] = useState<any>([]);
    const [input, setInput] = useState<any>('');
    const [user, setUser] = useState<User | null>(auth.user)

    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }

        onSnapshot(queryBuilder(), (snapshot) => {
            setTodos(snapshot?.docs?.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })

    }, [input, user]);

    const addTodo = (e: any) => {
        e.preventDefault();
        addDoc(collection(db, 'todos'), {
            todo: input,
            userId: user?.uid,
            isConcluded: false,
            isLocked: true, //only the user with the same id can change this
            timestamp: serverTimestamp()
        })
        setInput('')
    };

    return (
        <Container maxWidth="sm">
        <Box sx={{ my: 10 }}>
            {user && (<>
                <h2> To-do list POC </h2>
                <form style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
                    <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{ margin: "0px 5px", }} size="small" value={input}
                        onChange={e => setInput(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={addTodo} sx={{marginRight: '15px'}}>Add Todo</Button>
                    <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
                </form>
                <Stack spacing={4}>
                    {todos.map((item: any) => <Todo key={item.id} arr={item} />)}
                </Stack>
            </>)}
            </Box>
        </Container>
    );
}

export default Todos