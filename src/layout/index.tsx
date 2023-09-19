import { Outlet } from 'react-router-dom';


const index = () => {
    return (
        <div className='bg-white dark:bg-black w-full h-full'>
            <Outlet />
        </div>
    );
}

export default index;
