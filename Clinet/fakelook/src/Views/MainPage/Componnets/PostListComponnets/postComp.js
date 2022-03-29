import react from "react"
import {useState,useEffect} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import addCommentPostIdService from "../Services/addCommentPostIdService";
import getCommentModelService from "../Services/getCommentModelService";
import getNameForUserService from "../Services/getNameForUserService";
import getUserModelWithEmailService from "../Services/getUserModelWithEmailService";
import giveLikeService from "../Services/giveLikeService";

const PostCompEditView = ({props})=>{
    const location = useLocation();
    const [postModel,setPostModel] = useState(location.state.model)
    const [tags,setTags] = useState(postModel.tags);
    const [userUploaded,setUserUploaded] = useState(postModel.userUploaded);
    const [userLoaction,setUserLoaction] = useState(postModel.uploadedLocation);
    const [dateUploaded,setDateUploaded] = useState(postModel.dateUploaded);
    const [userRefrenses,setUserRefrenses] = useState(postModel.userRefrenses);
    const [userPicture,setUserPicture] = useState(postModel.picture);
    const [postLikes,setPostLikes] = useState(postModel.postLikes);
    const [postComments,setPostComments] = useState(postModel.postComments);
    const [userModel,setUserModel] = useState({})
    const [loadedComments,setLoadedComments] = useState([])
    const [commentInput,setCommentInput] = useState("");
    const [myUserModel,setMyUserModel] = useState({})
    // const [lng,setLng] = useState(props.post.uploadedLocation[1]);
    // const [lat,setLat] = useState(props.post.uploadedLocation[0]);


   const loadComments=async ()=>{
     let arr = []
     console.log(postComments);
     if(postComments != null)
     {
      //return await Promise.all(postComments.map(item => getCommentModelService(item)));

      for (let index = 0; index < postComments.length; index++) {
        const element = postComments[index];
        
        let com= await getCommentModelService(element);
        arr.push(com);
        
      }
      return arr;

      // const resultArray = await  Promise.all(postComments.map(async (i) => {
      //  let com= getCommentModelService(i);
      //  console.log(com);
      // }));
      // console.log(resultArray);

    //  const promis =  postComments.map(async (p)=>{
    //    console.log('inside');
    //    let com = await getCommentModelService(p);
    //    console.log(com);
    //    arr.push(com);
    //   // return com;
    //    return <div>{com.comment}</div>
    //  })
     
    //  return Promise.all(promis) 

    }
     else{
       console.log("no Comments Were Found");
       return <div> no Comments Were Found</div>
     }

   }
   const makeLogic=async ()=>{
     let res = await loadComments();
     console.log(res);
     setLoadedComments(res);
    //  return res.map((c)=>{
    //    console.log(c.props.children);
    //   return <div>{c.props.children}</div>
    //  })
     
   }
  //  const inputMessege = (e)=>{
  //   setCommentInput(e.target.value)
  //  }
   const addComment= async ()=>{
     console.log(myUserModel._id,);
     let res = await addCommentPostIdService(commentInput,myUserModel._id,postModel._id);

    console.log(res);
    loadComments();
     }
   const giveLike = async()=>{
     console.log(postModel._id);
    let result= await giveLikeService(postModel._id);
    console.log(result);

   }

    useEffect(async () => {
        console.log(postModel);
        let user =  await getNameForUserService(userUploaded);
        await makeLogic();
        console.log(userPicture);
        setUserModel(user)
        console.log(user);
        let local =localStorage.getItem("loginData");
        let obj = JSON.parse(local);
        console.log(obj.email);
        let user2 =  await getUserModelWithEmailService("yhoshoqqqqqqqqqa144@gmail.com");
        setMyUserModel(user2);

    },[setPostModel])

    const greatPlaceStyle = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
      }
    return(
            <div >
                <div>Post by :{userModel.userName}</div>
                <img src={userPicture} alt="image"/>
                <div>likes : {postLikes} <button onClick={giveLike}>like</button></div>
                <div>Comments</div>
                <div className="commentTable">
                  {loadedComments.map((c)=>  <div key={c._id}>{c.comment}</div>)}
                </div>
                <div className="postComment">
                  {/* <input type="text" onChange={(e)=>{}}> </input> */}
                  <input onChange={(e)=>{setCommentInput(e.target.value) ;console.log(e.target.value)}}></input>
                  <button onClick={addComment}>Comment</button>
                </div>
            </div>
            )
}
export default PostCompEditView;