import React, { useCallback, useEffect, useState } from 'react';
import { getDataMovie } from '../../api/Api';
import styles from './detailPage.module.css';

const DetailPage = ({ match }) => {
    console.log(match);
    const id = match.params.number;
    const [listKeys, setListKeys] = useState([]);
    const [listValues, setListValues] = useState([]);

    console.log(id);

    const getDetail = useCallback(async () => {
        const resp = await getDataMovie(`i=${id}`);
        setListKeys(Object.keys(resp.data));
        setListValues(Object.values(resp.data));
    }, [id]);

    useEffect(() => {
        getDetail();
    }, [getDetail]);

    const mergeTwoArrays = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

    console.log(mergeTwoArrays(listKeys, listValues));

    return (
        <div className={styles['container']}>
            <h1 data-test-id='title' className={styles['title']}>Detail Movie OMDb</h1>
            <div>
                {mergeTwoArrays(listKeys, listValues).map((data, i) => {
                    let keys = data[0];
                    let values = typeof (data[1]) === 'object' ? data[1].map((x, y) => (`${x.Source}: ${x.Value}`)) : data[1];
                    if (keys === 'Poster') {
                        return (
                            <img alt='img' key={i} src={values} />
                        )
                    }
                    return (
                        <h3 data-test-id={`check-detail-${i}`} key={i}>{`${keys}: ${values}`} </h3>
                    );
                })}
            </div>
        </div>
    );
}

export default DetailPage;