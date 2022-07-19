import styles from './Pagination.module.scss';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {IFilter, setCurrentPage} from '../../store/slices/filterSlice';
import {RootState} from '../../store/store';

function Pagination({pageCount}: { pageCount: number }) {
    const {currentPage} = useSelector<RootState, IFilter>(state => state.filter);
    const dispatch = useDispatch();
    const setPrevPage = () => {
        if (currentPage !== 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };
    const setNextPage = () => {
        if (currentPage !== pageCount) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };
    return (<>
        {currentPage !== 0 && (
            <ul className={styles.pagination}>
                <li className={cn({
                    [styles.disabled]: currentPage === 1,
                })} onClick={setPrevPage}>{'<'}</li>
                {[...Array(pageCount)].map((value, index) => (
                    <li key={index} className={cn({
                        [styles.active]: index + 1 === currentPage,
                    })}
                        onClick={() => {
                            dispatch(setCurrentPage(index + 1));
                        }}>{index + 1}</li>
                ))}
                <li className={cn({
                    [styles.disabled]: currentPage === pageCount,
                })} onClick={setNextPage}>{'>'}</li>
            </ul>
        )}
    </>);
}

export default Pagination;