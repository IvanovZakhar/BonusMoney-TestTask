import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); 
    const request = useCallback( async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/x-www-form-urlencoded'}) => {
        setLoading(true);

        try {
          const response = await fetch(url, { method, body, headers });
      
          if (!response.ok) {  
            const errorResponseStatus = response.status 
            const statusText = response.statusText
            setError(errorResponseStatus);
            setErrorMessage(statusText)
            throw new Error(errorMessage);
          } 
          const data = await response.json(); 
          setLoading(false);
          setError(null);
          return data;
        } catch (e) {  
          setLoading(false); 
          throw e;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    const clearError = useCallback(() => {
        setError(null);
        setErrorMessage(null); // Сброс сообщения об ошибке
      }, []);
    
  

    return {loading, request, error, clearError, errorMessage}

}