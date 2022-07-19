import styles from './Categories.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory} from '../../store/slices/filterSlice';
import {RootState} from '../../store/store';

function Categories() {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const dispatch = useDispatch();
    const category = useSelector<RootState>(state => state.filter.category);
    return (
        <div className={styles.categories}>
            <ul>
                {categories.map((c, i) => (
                    <li key={i} className={category === i ? styles.active : ''}
                        onClick={() => dispatch(setCategory(i))}>{c}</li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;