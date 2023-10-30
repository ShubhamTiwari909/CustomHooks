import React, { useEffect, useState } from 'react';
import useArray from '../CustomHooks/useArray';

const userData = [
    { id: Math.floor(Math.random() * 999999), name: 'Alice' },
    { id: Math.floor(Math.random() * 999999), name: 'Bob' },
    { id: Math.floor(Math.random() * 999999), name: 'Charlie' },
    { id: Math.floor(Math.random() * 999999), name: 'David' },
    { id: Math.floor(Math.random() * 999999), name: 'Eve' },
    { id: Math.floor(Math.random() * 999999), name: 'Martin' },
    { id: Math.floor(Math.random() * 999999), name: 'Kara' },
    { id: Math.floor(Math.random() * 999999), name: 'Dustin' },
    { id: Math.floor(Math.random() * 999999), name: 'Alex' },
    { id: Math.floor(Math.random() * 999999), name: 'John' },
]
interface filterArray {
    name: string;
}


interface ArrayFunctions {
    array: object[];
    activeItem: object | any;
    deleteElementByIndex: (index: number) => void;
    addElementToBeginning: (newElement: object) => void;
    addElementToEnd: (newElement: object) => void;
    addElementAtIndex: (newElement: object, index: number) => void | undefined;
    swapElements: (indexA: number, indexB: number) => void | undefined;
    shuffleArray: () => void;
    sortArray: (compareFunction: (a: object, b: object) => number) => void;
    updateElementAtIndex: (index: number, newElement: object) => void | undefined;
    findElement: <T>(criteriaFunction: (element: any) => boolean) => { foundElement: object | undefined; error: string };
    clearArray: () => void;
    reverseArray: () => void;
    getElementByIndex: (index: number) => void | null;
    countElements: () => number;
    countElementsPerPage: () => number;
    paginateArray: (page: number) => void;
    currentPage: number;
    pageCount: number;
}

function MyComponent() {
    const [searchName, setSearchName] = useState("")
    const itemsPerPage = 4; // Number of items to display per page
    const { array, activeItem, deleteElementByIndex, addElementToBeginning, addElementToEnd,
        swapElements, addElementAtIndex, shuffleArray, sortArray, updateElementAtIndex,
        findElement, clearArray, reverseArray, getElementByIndex, countElements,
        countElementsPerPage, paginateArray, currentPage, pageCount }: ArrayFunctions = useArray(userData, itemsPerPage);

    const handleAddToBeginning = () => {
        addElementToBeginning({ id: Math.floor(Math.random() * 999999), name: 'David' });
    };

    const handleAddToEnd = () => {
        addElementToEnd({ id: Math.floor(Math.random() * 999999), name: 'Eve' });
    };

    const handleAddAtIndex = (newElement: object, index: number) => {
        addElementAtIndex(newElement, index);
    };

    const handleSwap = (indexA: number, indexB: number) => {
        swapElements(indexA, indexB);
    };

    const handleShuffle = () => {
        shuffleArray();
    };

    const handleSort = () => {
        // Example: Sort the array by name in ascending order
        sortArray((a: any, b: any): number => a.name.localeCompare(b.name));
    };

    const handleUpdate = (index: number) => { // Index of the element to update
        const updatedElement = { id: Math.floor(Math.random() * 999999), name: `Data Updated at ${index}` };
        updateElementAtIndex(index, updatedElement);
    };

    // Find an element in the array based on a criterion
    const criteriaFunction = (element: any) => element.name === searchName;
    const { foundElement, error }: any = findElement(criteriaFunction);

    // Get an element by index
    const getElement = (index: number) => {
        getElementByIndex(index);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        paginateArray(page);
    };

    useEffect(() => {
        paginateArray(1);
    }, [])


    return (
        <div className='space-y-8 md:max-w-[1200px] px-4 py-8'>
            <ul className='space-y-8 h-72 overflow-auto'>
                {array.length === 0 ? <p className='text-red-400 text-xl text-center'>No Elements Found</p> :
                    array.filter((item: any) => {
                        if (foundElement === undefined) return item
                        return item.name === foundElement.name
                    })
                        .map((item:any, index) => (
                            <li className='flex gap-x-4 justify-evenly items-start' key={item.id}>
                                <p className={`border flex-1 w-fit p-2 rounded-xl ${item.id === activeItem.id as number ? "border-green-100" : "border-none"}`}>{item.name}</p>
                                {index > 0 ?
                                    <button className='flex-1 text-red-300 w-fit border border-red-500 px-4 py-2 rounded-full' onClick={() => { deleteElementByIndex(index) }}>Delete</button> : <div className='w-[184px]'></div>
                                }
                                {index > 0 ?
                                    <button className='flex-1 text-violet-300 w-fit border border-violet-500 px-4 py-2 rounded-full' onClick={() => handleSwap(index, index - 1)}>Swap with Previous</button> : <div className='w-[184px]'></div>
                                }
                                <button className='flex-1 text-purple-300 w-fit border border-purple-500 px-4 py-2 rounded-full' onClick={() => handleAddAtIndex({ id: Math.floor(Math.random() * 999999), name: 'Frank' }, index)}>Add at Index {index}</button>
                                <button className='flex-1 text-purple-300 w-fit border border-purple-500 px-4 py-2 rounded-full' onClick={() => handleUpdate(index)}>Update Element</button>
                                <button className='flex-1 text-lime-300 border border-lime-500 px-4 py-2 rounded-full' onClick={() => getElement(index)}>Get Element</button>
                            </li>
                        ))}
            </ul>
            <div className='px-4 py-8 border border-white rounded-xl'>
                <div className='flex flex-wrap justify-center gap-8 mb-4'>
                    <button className='text-blue-300 border border-blue-500 px-4 py-2 rounded-full' onClick={handleAddToBeginning}>Add to Beginning</button>
                    <button className='text-blue-300 border border-blue-500 px-4 py-2 rounded-full' onClick={handleAddToEnd}>Add to End</button>
                    <button className='text-pink-300 border border-pink-500 px-4 py-2 rounded-full' onClick={handleShuffle}>Shuffle Array</button>
                    <button className='text-yellow-300 border border-yellow-500 px-4 py-2 rounded-full' onClick={handleSort}>Sort Array</button>
                    <button className='text-green-300 border border-green-500 px-4 py-2 rounded-full' onClick={() => setSearchName("Alice")}>Find Alice</button>
                    <button className='text-green-300 border border-green-500 px-4 py-2 rounded-full' onClick={() => setSearchName("Bob")}>Find Bob</button>
                    <button className='text-red-300 border border-red-500 px-4 py-2 rounded-full' onClick={() => setSearchName("Shubham")}>Find Shubham</button>
                    <button className='text-green-300 border border-green-500 px-4 py-2 rounded-full' onClick={() => setSearchName("")}>All Items</button>
                    <button className='text-red-300 border border-red-500 px-4 py-2 rounded-full' onClick={clearArray}>Clear Array</button>
                    <button className='text-gray-300 border border-gray-500 px-4 py-2 rounded-full' onClick={reverseArray}>Reverse Array</button>
                </div>
                <p className='text-red-400 text-center mb-8'>{searchName !== "" && error}</p>
                <p className='text-blue-400 text-center mb-4'>Found {countElementsPerPage()} out of {countElements()}</p>

                <div className='flex justify-center gap-x-4 mb-4 p-4 border border-lime-400 rounded-xl w-fit mx-auto'>
                    {
                        Array.from({ length: pageCount }, (_, index) => (
                            <button key={index + 1} className={`${index + 1 === currentPage ? "text-white font-bold" : "text-slate-300"}`} onClick={() => handlePageChange(index + 1)}>
                                Page {index + 1}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default MyComponent;
