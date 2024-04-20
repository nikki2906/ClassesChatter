import { Outlet, Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <div className='navigation'>
                <Link to='/' className='nav_link'>ClassesChatter 🍎</Link>
                <Link to='/createPost'>
                    <h4 className='element'>📚 Create Post!</h4>
                </Link>
            </div>
            <Outlet/>
        </div>
    );
};
export default NavBar;