import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Coin App
            </Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/users">Users</CustomLink>
                <CustomLink to="/coins">Coins</CustomLink>
                <CustomLink to="/billing">Billing</CustomLink>
                <CustomLink to="/purchase">Purchase</CustomLink>
                <CustomLink to="/about">About</CustomLink>

            </ul>


        </nav>
    )
}

//active hover show krne k liye
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }