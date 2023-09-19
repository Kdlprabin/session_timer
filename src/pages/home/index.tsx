import { useNavigate } from 'react-router-dom';
const Index = () => {
    const navigate = useNavigate();

    const onClick = (id: string) => {
        navigate(`/clock/${id}`);
    }

    return (
        <div className='flex flex-col items-center text-white gap-2 p-5'>
            <div className='text-3xl uppercase font-semibold text-indigo-200 mb-5'>
                Saved Session List
            </div>
            <div
                onClick={() => onClick("workout")}
                className='w-full h-12 bg-slate-900 outline-none border-none rounded-sm text-xl justify-center flex items-center cursor-pointer hover:ring-1 hover:ring-indigo-300 hover:text-indigo-300 hover:bg-slate-900 transition-all font-bold'>
                Workout
            </div>
        </div>
    );
}

export default Index;
