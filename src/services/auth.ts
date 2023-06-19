import { GoogleAuthProvider, User, browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';

class Auth {
    private provider = new GoogleAuthProvider();
    private auth = getAuth(app);
    user: User | null;

    constructor() {
        this.user = this.auth.currentUser
    }
    
    async login(fn: (user: User) => void) {
        
        if (this.auth.currentUser) {
            return fn(this.auth.currentUser)
        }

        const result = await signInWithPopup(this.auth, this.provider)
        if (!result) return 
        
        await setPersistence(this.auth, browserSessionPersistence) //salva em sessao

        return fn(result.user)
    }

    async loginEmailPassword(username: string, password: string, fn: (user: User) => void) {
        
        if (this.auth.currentUser) {
            return fn(this.auth.currentUser)
        }

        const result = await signInWithEmailAndPassword(this.auth, username, password)
        if (!result) return 
        
        await setPersistence(this.auth, browserSessionPersistence) //salva em sessao

        return fn(result.user)
    }

    async logout() {

        await this.auth.signOut()
        
        await setPersistence(this.auth, browserSessionPersistence) //salva em sessao

        return
    }
}

export default Auth