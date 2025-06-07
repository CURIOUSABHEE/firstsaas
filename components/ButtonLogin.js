import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, children }) => {
  // function loginNow(props){
  //     props.isLoggedIn =! props.isLoggedIn
  // }
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Welcome {name} 👋🏽
        {children}
      </Link>
    );
  } else {
    return <button>Login Now !!</button>;
  }
};

export default ButtonLogin;
