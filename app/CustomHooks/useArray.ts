import { useState } from 'react';


interface ArrayFunctions {
    array: object[];
    activeItem: object;
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

function useArray(initialArray: object[], itemsPerPage: number):ArrayFunctions {
    const copyArray: object[] = [...initialArray]
    const [array, setArray] = useState<object[]>(initialArray);
    const [activeItem, setActiveItem] = useState<object>({})
    const [pageCount, setPageCount] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);

    const deleteElementByIndex = (indexToDelete: number): void => {
        if (indexToDelete < 0 || indexToDelete >= array.length) {
            return; // Index out of range
        }

        setArray((prevArray: object[]): object[] => {
            const updatedArray: object[] = [...prevArray];
            updatedArray.splice(indexToDelete, 1);
            return updatedArray;
        });
    };


    const addElementToBeginning = (newElement: object): void => {
        setArray((prevArray: object[]) => [newElement, ...prevArray]);
    };

    const addElementToEnd = (newElement: object): void => {
        setArray((prevArray: object[]) => [...prevArray, newElement]);
    };

    const addElementAtIndex = (newElement: object, index: number): void | undefined => {
        if (index < 0 || index > array.length) {
            return; // Index out of range
        }

        setArray((prevArray: object[]): object[] => {
            const updatedArray: object[] = [...prevArray];
            updatedArray.splice(index, 0, newElement);
            return updatedArray;
        });
    };

    const swapElements = (indexA: number, indexB: number): void | undefined => {
        if (indexA < 0 || indexA >= array.length || indexB < 0 || indexB >= array.length) {
            return; // Indices out of range
        }

        setArray((prevArray: object[]): object[] => {
            const updatedArray: object[] = [...prevArray];
            const temp: object = updatedArray[indexA];
            updatedArray[indexA] = updatedArray[indexB];
            updatedArray[indexB] = temp;
            return updatedArray;
        });
    };

    const shuffleArray = (): void => {
        setArray((prevArray: object[]): object[] => {
            const shuffledArray: object[] = [...prevArray];
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j: number = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
        });
    };

    const sortArray = (compareFunction: (a: any, b: any) => number) => {
        setArray((prevArray) => [...prevArray].sort(compareFunction));
    };

    const updateElementAtIndex = (index: number, newElement: object): void | undefined => {
        if (index < 0 || index >= array.length) {
            return; // Index out of range
        }

        setArray((prevArray: object[]):object[] => {
            const updatedArray: object[] = [...prevArray];
            updatedArray[index] = newElement;
            return updatedArray;
        });
    };


    const findElement = (criteriaFunction: (element: any) => boolean): { foundElement: object | undefined; error: string } => {
        let error: string = "";
        const foundElement: object | undefined = array.find(criteriaFunction);
        if (foundElement === undefined) {
            error = "Element not found";
        }
        return { foundElement, error };
    };


    const clearArray = (): void => {
        setArray([]);
    };

    const reverseArray = (): void => {
        setArray((prevArray: object[]) => [...prevArray].reverse());
    };

    const getElementByIndex = (index: number): void | null => {
        if (index < 0 || index >= array.length) {
            return null; // Index out of range
        }
        setActiveItem(array[index]);
    };

    const countElements = (): number => {
        return copyArray.length
    };

    const countElementsPerPage = (): number => {
        return array.length
    }

    const paginateArray = (page: number): void => {
        const start: number = (page - 1) * itemsPerPage;
        const end: number = start + itemsPerPage;
        setCurrentPage(page);
        setArray(initialArray.slice(start, end));

        const calculatePageCount = ():number => {
            return Math.ceil(copyArray.length / itemsPerPage);
        };
        setPageCount(calculatePageCount)
    };

    return {
        array,
        activeItem,
        deleteElementByIndex,
        addElementToBeginning,
        addElementToEnd,
        addElementAtIndex,
        swapElements,
        shuffleArray,
        sortArray,
        updateElementAtIndex,
        findElement,
        clearArray,
        reverseArray,
        getElementByIndex,
        countElements,
        countElementsPerPage,
        paginateArray,
        currentPage,
        pageCount
    };
}

export default useArray;
