import {useHttp} from '../hooks/http.hooks';
import { useState} from 'react';

const useBoonusMoneyService = () => {
    const { loading, request, error, clearError, successfull, errorMessage } = useHttp();
    const _url = "http://devapp.bonusmoney.pro/mobileapp";
    const [offset, setOffset] = useState(0); // Начальное значение offset
    const limit = 5; // Фиксированное значение limit

    const getAllCompaniesIdeal = async () => {
        const body = {
            "offset": offset,
            "limit": limit
        };

        const res = await request(
           ` ${_url}/getAllCompanies`,
            'POST',
            JSON.stringify(body),
            { 'TOKEN': '123' }
        );

        setOffset(prevOffset => prevOffset + limit); // Обновляем offset после успешного запроса
        return res.companies;
    };

    return { 
        getAllCompaniesIdeal, 
        loading, 
        error, 
        clearError, 
        successfull, 
        errorMessage 
    };
};

export default useBoonusMoneyService;