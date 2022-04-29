const axios = require("axios");
const PORT = "http://localhost:5000/postComment/add";
const PORT2 = "http://localhost:5000/post/addCommentToPost";

const addCommentPostIdServic = async (comment, userId, PostId) => {
  console.log("in service");
  let body = { userId: userId, comment: comment };
  let result = await axios.post(PORT, body);
  if (result) {
    let comment = result.data;
    console.log(comment);
    let bodyPostRep = { PostId: PostId, commentId: comment._id };
    try {
      let result2 = await axios.post(PORT2, bodyPostRep);
      console.log(result2);

      window.location.reload();
      return "addedPost";
    } catch (err) {
      return err;
    }
  } else {
    return "Nothing Found";
  }
};
console.log("dddd");
export default addCommentPostIdServic;
