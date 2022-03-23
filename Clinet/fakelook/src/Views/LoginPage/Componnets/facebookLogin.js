import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

const facebookLogin = (props)=>{
const responseFacebook = (response) => {
  console.log(response);
}

return(
    <div>

   
  <FacebookLogin
    appId="374942954259057"
    autoLoad={true}
    fields="name,email,picture"
    //onClick={componentClicked}
    callback={responseFacebook} />
     </div>
  //document.getElementById('demo')
    );
}
export default facebookLogin

