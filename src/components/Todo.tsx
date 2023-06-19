import { Typography, Paper, styled, Chip } from "@mui/material";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
    console.log(1)
  }
  return (
    <Item className="todo__list" elevation={3} >
        <Typography sx={{ mb: 1.5, textTransform: 'capitalize' }} color="text.secondary" >
          {arr.item.todo}
        </Typography>
        <div>
          <Chip disabled={arr.item.userId !== auth.user?.uid} icon={arr.item.isLocked ? <LockIcon /> : <LockOpenIcon />} label={arr.item.isLocked ? "Unlock" : "Lock"} sx={{marginRight: '10px'}} onClick={handleLockUnlock} />
          <Chip label="Conclude"
          disabled={arr.item.userId !== auth.user?.uid && arr.item.isLocked}
          onDelete={
            () => {
            deleteDoc(doc(db, "todos", arr.id));
          }} />
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