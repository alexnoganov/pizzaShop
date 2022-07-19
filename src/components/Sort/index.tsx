import styles from './Sort.module.scss';
import React, {useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {setSort} from '../../store/slices/filterSlice';
import {RootState} from '../../store/store';

type ISortTypes = {
    [rating: string]: string;
    price: string;
    title: string;
}

function Sort() {
    const sortTypes: ISortTypes = {rating: 'популярности', price: 'цене', title: 'алфавиту'};
    const sortRef = useRef<HTMLDivElement>(null);

    const sort = useSelector<RootState,string>(state => state.filter.sort);
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const hidePopup = (e:MouseEvent) => {
            const event = e as MouseEvent & {path: Node[]}
            if (sortRef.current && !event.path.includes(sortRef.current)) {
                setIsVisible(false);
            }
        };
        document.body.addEventListener('click', hidePopup);
        return () => document.body.removeEventListener('click', hidePopup);
    }, []);
    // @ts-ignore
    return (
        <div ref={sortRef} className={styles.sort}>
            <div className={cn(styles.sortLabel, {
                [styles.active]: isVisible,
            })}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="#2C2C2C"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"/>
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisible(!isVisible)}>{sortTypes[sort]}</span>
            </div>
            {isVisible && <div className={styles.sortPopup}>
                <ul>
                    {Object.values(sortTypes).map(type => (
                        <li key={type}
                            className={cn({[styles.active]: sort === Object.keys(sortTypes).find(key => sortTypes[key] === type)})}
                            onClick={() => {
                                dispatch(setSort(Object.keys(sortTypes).find(key => sortTypes[key] === type)));
                                setIsVisible(false);
                            }}>{type}</li>
                    ))}
                </ul>
            </div>}
        </div>
    );
}

export default Sort;