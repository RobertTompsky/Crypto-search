import {FaCoins} from 'react-icons/fa'

const Navbar = () => {
    return (
        <div className='flex justify-center text-center mt-8'>
            <FaCoins className='text-5xl text-purple-900 mx-3'/>
            <h1 className='text-5xl text-white-600 font-bold'>Crypto</h1>
            <span className='bg-purple text-cneter text-green-300 text-5xl font-bold'>Coin</span>
        </div>
    );
};

export default Navbar;