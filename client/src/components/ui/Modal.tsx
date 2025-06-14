import {IoMdClose} from "react-icons/io";
import { useClickAway } from "@uidotdev/usehooks";

type ModalProps = {
    title: string;
    id: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ title, isOpen, id,onClose, children }: ModalProps) {

    const refMod = useClickAway<HTMLDivElement>(() =>{
        onClose()
    })

    if (!isOpen) {
        return <></>;
    }

    return (
        <>
            <div id={id}  className="absolute flex justify-center items-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[rgba(0,0,0,0.7)]">
                <div ref={refMod} className="relative w-full max-w-2xl max-h-full">
                    <div className="relative rounded-lg shadow bg-gray-800">
                        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-700">
                            <h3 className="text-xl font-semibold text-white dark:text-white">
                                {title}
                            </h3>
                            <button type="button"
                                    className="text-gray-500 bg-transparent hover:text-gray-400 hover:text-bg-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                    onClick={() => onClose()}>
                            <IoMdClose className="w-5 h-5 " />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className={"text-white p-4"}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}