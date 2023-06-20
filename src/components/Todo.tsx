import { Typography, Paper, styled, Chip } from "@mui/material";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Auth from '../services/auth';

const Todo = ({ arr }: any) => {
  const auth = new Auth()
  const handleLockUnlock = (e: any) => {
    if (arr.item.userId !== auth.user?.uid) {
      return
    }
    updateDoc(doc(db, 'todos', arr.id), {
      isLocked: !arr.item.isLocked
    })
  }
  return (
    <Item className="todo__list" elevation={3} style={{margin: '10px'}}>
        <Typography sx={{ mb: 1.5, textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '30vw' }} color="text.secondary" >
          {arr.item.todo}
        </Typography>
        <div>
          <Chip disabled={arr.item.userId !== auth.user?.uid} icon={arr.item.isLocked ? <LockIcon /> : <LockOpenIcon />} label={arr.item.isLocked ? "Unlock" : "Lock"} sx={{marginRight: '10px', maxWidth: '30vw'}} onClick={handleLockUnlock}/>
          <Chip label="Done"
          icon={<TaskAltIcon/>}
          disabled={arr.item.userId !== auth.user?.uid && arr.item.isLocked}
          onClick={
            () => {
            deleteDoc(doc(db, "todos", arr.id));
          }}
          sx={{maxWidth: '20vw'}}/>
        </div>
    </Item>
  );
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between'
  }));

export default Todo;