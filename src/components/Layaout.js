import { Navbar } from "./NavBar"
export const Layout = ({children}) =>{
    return(
        <>
        <Navbar/>
        {children}
        </>
    )
}