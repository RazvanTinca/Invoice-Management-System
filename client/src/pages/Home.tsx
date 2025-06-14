import InvoiceTable from "../components/InvoiceTable.tsx";
import {FaOutdent} from "react-icons/fa6";
import {FaChevronRight, FaRegBell, FaRegMoon, FaSearch} from "react-icons/fa";
import {useState} from "react";
import {GoGear} from "react-icons/go";

export default function Home() {

    const [searchValue, setSearchValue] = useState("");

    return (
        <div className={"w-full bg-gradient-to-t from-gray-800 to-gray-950 p-6 flex "}>
            <aside className={" w-[20%] h-full"}>
                <div className={"flex flex-col gap-5 items-center justify-center"}>

                    <div className={"w-[80%] aspect-video rounded-xl text-center items-center justify-center flex h-full  mt-12 bg-gray-600 text-white text-5xl"}>
                        LOGO HERE
                    </div>

                    <div className="flex flex-col w-full p-5">
                        <div>Menu</div>
                        <ul className="flex flex-col gap-3 mt-5">
                            <li className="text-gray-400 hover:text-white cursor-pointer flex items-center gap-2 ml-6">Home</li>
                            <li className="text-gray-300 hover:text-white cursor-pointer font-bold flex items-center gap-2">
                                <FaChevronRight className="text-gray-400" />
                                Invoices
                            </li>
                            <li className="text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
                                <FaChevronRight className="text-gray-400" />
                                Bills
                            </li>
                            <li className="text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
                                <FaChevronRight className="text-gray-400" />
                                Expenses
                            </li>
                            <li className="text-gray-400 hover:text-white cursor-pointer flex items-center gap-2">
                                <FaChevronRight className="text-gray-400" />
                                Reports
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
            <div className={"w-[80%] bg-gray-600 mx-6 rounded-xl flex flex-col gap-5 p-5 "}>
                <div className="flex py-8 px-5 text-white items-center">
                    <FaOutdent size={20}/>
                    <div className={"flex items-center gap-2 ml-2"}>
                        <span className={"text-gray-400"}>Home</span>
                        <span className={"text-gray-300"}> / </span>
                        <span><a href="#">Invoices</a></span>
                    </div>
                    <div className="flex grow"></div>
                    <div className="flex gap-5 items-center">
                        <div className="relative w-80">
                            <input
                                type="text"
                                className="bg-gray-700 rounded-full w-full h-10 pl-10 focus:outline-none text-white"
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                id="search-input"
                                autoComplete="off"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {!searchValue && (
                                <label
                                    htmlFor="search-input"
                                    className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-opacity duration-200 peer-focus:opacity-0"
                                >
                                    Search
                                </label>
                            )}
                        </div>
                        <FaRegBell size={20}/>
                        <GoGear size={20}/>
                        <FaRegMoon size={20}/>
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                        />
                    </div>
                </div>
                <InvoiceTable/>
            </div>
        </div>
    )
}