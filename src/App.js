import logo from './logo.svg';
import './App.css';
import Post from './Post.js';
import React,{ useState, useEffect} from 'react';
import {auth, db} from './firebase';
import {makeStyles, } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        console.log(authUser);
        setUser(authUser);
        if(authUser.displayName) {

        } else {
          return authUser.updateProfile({
            displayName: username,
          })
        }
      } else {
        setUser(null);
      }
    })


    return () => {
      unsubscribe();
    }

  },[user, username])

  useEffect(()=> {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => (
        {
        id : doc.id,
        post : doc.data()
        }
      )))
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .then(()=> {
      setUsername('');
      setPassword('');
      setEmail('');
    })
    .catch((error) => alert(error.message))
    setOpen(false);
  }

  const signIn = (event) =>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=> alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="App">
      
      




      <Modal
        open={open}
        onClose={() =>setOpen(false)}
        >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img 
            className="app__headerImage"
            src="https://image.shutterstock.com/image-photo/sad-woman-profile-silhouette-dark-260nw-245559184.jpg"
            alt=""
            ></img>
          </center>
          <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <Input 
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
      
    </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() =>setOpenSignIn(false)}
        >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img 
            className="app__headerImage"
            src="https://image.shutterstock.com/image-photo/sad-woman-profile-silhouette-dark-260nw-245559184.jpg"
            alt=""
            ></img>
          </center>
          <Input 
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
      
    </div>
      </Modal>

    <div className="app__header">
        {/* <img 
        alt=""
          className="app__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png">
          
        </img> */}
        <h1 className="vro">Vrogram</h1>
        {user ? (
        <Button onClick={()=> auth.signOut()}>LogOut</Button>
      ): (
        <div className = "app_loginContainer">
        <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={()=>setOpen(true)}>Sign Up</Button>
        </div>
      )
      }
      </div>
      
      
      <div className="app__posts">
      {
        posts.map(({id,post}) => {
          return <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        })
      }
        {/* <Post username='vg' caption="Wow it works" imageUrl="https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
        <Post username="hello" caption="welcome" imageUrl="https://image.shutterstock.com/image-photo/sad-woman-profile-silhouette-dark-260nw-245559184.jpg"/> */}
        </div>
        <InstagramEmbed
          url='https://www.instagram.com/p/CO10AkMNL5q/'
          clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      {/* Header */}
      {/* posts */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ): (
        <h3 className="sorry">Sorry you need to login to upload</h3>
      )}
      <div>
        <p>    </p>
      </div>

    </div>
    
  );
}

export default App;
