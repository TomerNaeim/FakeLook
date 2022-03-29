import {useState,useEffect} from "react"
import PostComp from "./postComp";

const ListOfPosts = (props)=>{
    const [postList,setPostList] = useState(props.list);
    const [loadedList,setLoadedList] = useState([])

   const loadList=()=>{
        console.log(postList);
        
        // let res= <PostComp post={postList}  ></PostComp>
        // let loadedList = postList.foreach(item=>{
        //     console.log(item);
            
        //     <PostComp post = {item}></PostComp>
        // })
        // postList.map((result)=>{
        //     console.log(result);
        //     if(result.uploadedLocation == null)
        //     {

        //     }
        //     else{
        //         console.log(result.uploadedLocation[0]);
        //         loadedList.push(<PostComp key={result.id}></PostComp>);
        //     }
            
        // })
        // console.log(loadedList);
        // setLoadedList(loadedList);

    }
   const createMarkers=()=> {
        // if(this.state.render === false){
        //  this.createMarkers();
        // }

        return postList.slice(2).map((item ,index) => {
            console.log(item);
         return <PostComp
           lat= {item.uploadedLocation[0]} lng={item.uploadedLocation[1]}
           key={index}
          />
        })
       }
      

    useEffect(() => {
        
        console.log("in listComponnet",postList);
        //loadList();
    },[postList])

    const greatPlaceStyle = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
      }
    return(
            <div style={greatPlaceStyle}>
               {createMarkers()}
            </div>
            )
}
export default ListOfPosts;