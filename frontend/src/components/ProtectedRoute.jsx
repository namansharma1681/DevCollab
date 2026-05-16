import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
    //children is a built in keyword which knows what we have written inside the 
    //opening and closing tag of the component i.e. <protectedRoute> in the app.jsx
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login"/>
    }
    return children
}
export default ProtectedRoute