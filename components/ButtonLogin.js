import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, msg, children, extraStyle = "" }) => {
  // function loginNow(props){
  //     props.isLoggedIn =! props.isLoggedIn
  // }
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className={"btn btn-primary " + extraStyle}>
        {msg}
      </Link>
    );
  } else {
    return <button>Login Now !!</button>;
  }
};

export default ButtonLogin;
