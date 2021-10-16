import { useCallback, useEffect, useRef, useState } from "react";
import { getDataMovie } from "../../api/Api";
import styles from './HomePage.module.css';

const HomePage = (props) => {
    const [title, setTitle] = useState('');
    const [countPage, setCountPage] = useState(1);
    const [data, setData] = useState([]);
    const [loadMore, setLoadMore] = useState();
    const [showModalImg, setShowModalImg] = useState(false);
    const [img, setImg] = useState();
    const [message, setMessage] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const getData = useCallback(async () => {
        setMessage('Loading Guys Tunggu yak! :)');
        if (isSearch) {
            const resp = await getDataMovie(`s=${title}&page=1`);
            if (resp.data.Search) {
                setMessage('');
                setData(resp.data.Search);
            }
            else if (resp.Response) {
                setMessage(resp.Response.Error);
            }
        }
        if (loadMore) {
            const resp = await getDataMovie(`s=${title}&page=${countPage.toString()}`);
            if (resp.data.Search) {
                setData(prev => {
                    return [...new Set([...prev, ...resp.data.Search])];
                });
                setLoadMore(resp.data.Search.length > 0);
            }
            else if (resp.Response) {
                setMessage(resp.Response.Error);
            }
        }
    }, [countPage, isSearch, title, loadMore]);

    useEffect(() => {
        getData();
    }, [getData]);

    const observer = useRef(null);
    const lastRef = useCallback(char => {
        if (observer.current) observer.current.disconnect();
        // setLoadMore(true);
        observer.current = new IntersectionObserver(entry => {
            if (entry[0].isIntersecting) {
                setLoadMore(true);
                setCountPage(prevIndex => prevIndex + 1);
            }
        });
        if (char) {
            observer.current.observe(char);
        }
    }, []
    );

    const handleClickDetail = (props) => {
        window.location.href = `/detail-page/id=${props}`;
    }

    const popupModal = (
        <div className={styles['modal']}>
            <span data-test-id="close-btn" className={styles['close']} onClick={() => setShowModalImg(false)}>&times;</span>
            <img className={styles['modal-content']} alt='img' src={img} />
        </div>
    );

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        setIsSearch(true);
    }

    return (
        <>
            {showModalImg ? popupModal : ''}
            <h1 data-testid="title">OMDb MOVIE</h1>
            <div >
                <p>Search Your Movie</p>
                <div>
                    <label>Title</label>
                    <input data-test-id="test-search" value={title} onChange={(e) => handleChangeTitle(e)} onKeyUp={() => setIsSearch(false)} />
                </div>
                {data ? data.map((data, i) => {
                    return (
                        <div data-test-id={`check-data-${i}`} key={i} className={styles['box-list']} ref={lastRef}>
                            <img data-test-id={`check-img-${data.Title}`} alt='img' src={data.Poster} onClick={() => { setShowModalImg(true); setImg(data.Poster) }} className={styles['imgClick']} />
                            <div>
                                <h3>Title: {data.Title}</h3>
                                <h3>Type: {data.Type}</h3>
                                <h3>Year: {data.Year}</h3>
                                <h3>imdbID: {data.imdbID}</h3>
                                <button data-test-id={`button-test-${i}`} onClick={() => handleClickDetail(data.imdbID)}>Detail</button>
                            </div>
                        </div>
                    )
                }) : 'Not Found'}
                <h2 style={{ color: 'ButtonText' }}>{loadMore && message}</h2>
            </div>
        </>
    )
}

export default HomePage;