export function GET() {
  return Response.json({ message: "U hava hit an API " });
}

export function POST() {
  // get the email and password from request body
  // create a connection to the DB
  // a. if the user exist, create a session
  // b. if the user doesnot exist, create a new user and session
  //return the session token
}
