import { useState } from 'react';
import styles from './App.module.css';

const getDate = (date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export const App = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    let isValueVaild = value.length >= 3;

    const onInputButtonClick = () => {
        const promptValue = prompt('Введите значение');
        if (promptValue.length <= 3) {
            setError('Введенное значение должно сожержать минимум 3 символа');
        } else {
            setError('');
            setValue(promptValue);
        }
    };

    const onAddButtonClick = () => {
        setList([...list, { id: Date.now(), value, date: getDate(new Date()) }]);
        setValue('');
        setError('');
    };

    return (
        <div className={styles.app}>
            <h1 className={styles['page-heading']}>Ввод значения</h1>
            <p className={styles['no-margin-text']}>
                Текущее значение <code>value</code>: "
                <output className={styles['current-value']}>{value}</output>"
            </p>
            {error !== '' && <div className={styles.error}>{error}</div>}
            <div className={styles['buttons-container']}>
                <button className={styles.button} onClick={onInputButtonClick}>
                    Ввести новое
                </button>
                <button
                    className={styles.button}
                    disabled={!isValueVaild}
                    onClick={onAddButtonClick}
                >
                    Добавить в список
                </button>
            </div>
            <div className={styles['list-container']}>
                <h2 className={styles['list-heading']}>Список:</h2>
                {list.length ? (
                    <ul className={styles.list}>
                        {list.map(({ id, value, date }) => (
                            <li className={styles['list-item']} key={id}>
                                {date} - {value}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles['no-margin-text']}>Нет добавленных элементов</p>
                )}
            </div>
        </div>
    );
};
