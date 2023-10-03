import { useGetAllCryptosQuery, useGetCryptosMutation } from "../../services/cryptoAPI";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CoinType } from "../../common/types";
import Items from "../../components/Items";

const Home = () => {
    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<string>('10')
    const [name, setName] = useState('')
    const [getCryptos, { data: cryptos }] = useGetCryptosMutation()
    const { data } = useGetAllCryptosQuery()
    const pages = ['5', '10', '15', '20', '25', '30']

    useEffect(() => {
        const fetchCoinData = async () => {
            await getCryptos({ page, perPage })
        }
        fetchCoinData()
    }, [page, perPage])

    const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(e.target.value)
    }

    const searchedCoins = data?.filter((coin) => coin.name.toLowerCase().includes(name.toLowerCase()))
    return (
        <div className="max-w-screen-lg m-auto">
            <div>
            <div className="grid gap-4 ml-4 mb-6 md:grid-cols-3 mt-4 items-center justify-center">
                    <input
                        type="text"
                        id="search_crypto"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        placeholder="Search your favourite crypto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-row justify-between items-center bg-gray-900 rounded-lg font-bold mx-4 my-8 py-3 px-4 shadow-sm">
                    <p>#</p>
                    <p>Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p className="hide-mobile">Volume</p>
                    <p className="hide-mobile">Market Cap</p>
                </div>
                {!name ? (cryptos?.map((coin: CoinType) => (
                    <Link to={`/coin/${coin.id}`} key={coin.id}>
                        <Items coin={coin} />
                    </Link>
                ))) : (
                    (searchedCoins?.map((coin: CoinType) => (
                        <Link to={`/coin/${coin.id}`} key={coin.id}>
                            <Items coin={coin} />
                        </Link>
                    ))) 
                )}
                <div className="flex items-center justify-center" style={{ opacity: `${name ? 0 : 1}` }}>
                    <button
                        onClick={() => setPage((page) => page - 1)}
                        disabled={page === 1 ? true : false}
                        className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded m-2">
                        Prev
                    </button>
                    <p className="text-lg font-bold">{page}</p>
                    <button
                        onClick={() => setPage((page) => page + 1)}
                        className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded m-2">
                        Next
                    </button>
                    <div className="dropdown inline-block relative ml-8">
                        <span className="text-xl">Per Page: </span>
                        <select value={perPage} onChange={handlePage}>
                            {pages.map((page, index) => (
                                <option key={index}>{page}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;