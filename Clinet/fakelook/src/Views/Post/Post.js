import React from "react";

function Post() {
  return (
    <div>
      <form>
        <label>tags:</label>
        <input type="text" />
        <br />
        <label> image</label>
        <input type="file" />
      </form>
    </div>
  );
}

export default Post;
