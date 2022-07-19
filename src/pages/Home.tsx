import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import {useEffect, useRef} from 'react';
import Pagination from '../components/Pagination/Pagination';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import qs from 'qs';
import {FilterPayload, IFilter, setFilters} from '../store/slices/filterSlice';
import {fetchPizza, IPizza} from '../store/slices/pizzaSlice';
import Empty from '../components/Empty';
import {RootState, useAppDispatch} from '../store/store';

function Home() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isMounted = useRef(false);

    const {category, sort, search: searchValue, currentPage} = useSelector<RootState, IFilter>(state => state.filter);
    const {items, status} = useSelector<RootState, IPizza>(state => state.pizza);

    useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as FilterPayload;
            setFilters(params);
        }
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            let params;
            if (searchValue) {
                params = `?sortBy=${sort}&order=${sort === 'title' ? 'asc' : 'desc'}${category === 0 ? '' : '&category=' + category}${searchValue ? `&search=${searchValue}` : ''}`;
            } else {
                params = `?limit=4&page=${currentPage}&sortBy=${sort}&order=${sort === 'title' ? 'asc' : 'desc'}${category === 0 ? '' : '&category=' + category}`;
            }
            dispatch(fetchPizza(params));
            if (isMounted.current) {
                navigate(params);
            }
            isMounted.current = true;
            window.scrollTo(0, 0);
        })();
    }, [dispatch, navigate, category, sort, searchValue, currentPage]);

    const skeleton = [...Array(4)].map((v, i) => <Skeleton key={i}/>);
    const pizzas = items.map(item => <Card key={item.id} {...item}/>);

    return (
        <div className="container">
            {status === 'error'
                ? <div style={{textAlign: 'center'}}>
                    <Empty title="Произошла ошибка при запросе данных"
                           text="К сожалению, нам не удалось получить список товаров, попробуйте позже"/>
                </div>
                : <>
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
                    <Pagination pageCount={3}/>
                </>}
        </div>
    );
}

export default Home;