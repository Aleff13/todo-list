import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, IconButton, Typography, Badge } from '@mui/material';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where } from 'firebase/firestore';
import '../App.css';
import { db } from '../firebase';
import { User } from "firebase/auth";
import Auth from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Todo from '../components/Todo';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const docsRef = collection(db, 'todos')

const queryBuilder = (userId: string | null = null) => {
    if (!userId) { //early return
        return query(docsRef, orderBy('timestamp', 'desc'));
    }
    return query(docsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
}
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

export default function Todos() {
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
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: '36px',
                ...(true && { display: 'none' }),
              }}
            >
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Todo List
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={'!'} color="secondary">
                <ExitToAppIcon onClick={handleLogout}/>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <TextField margin="normal"
                    style={{width: '60vw'}}
                    name="todo"
                    label="Todo"
                    type="text"
                    id="todo"
                    autoComplete="make list"
                    value={input}
                    onChange={e => setInput(e.target.value)} />
                <Button variant="contained" color="primary" onClick={addTodo} sx={{marginLeft: '5vw', minWidth: '10vw', borderRadius: '40px', fontWeight: 'bold'}}>Add Todo</Button>
            </Box>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {todos.map((item: any) => <Todo key={item.id} arr={item} />)}
                </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}