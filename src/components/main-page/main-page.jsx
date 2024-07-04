import { ClipLoader } from 'react-spinners'; 
import useBoonusMoneyService from './../../services/useBoonusMoneyService'
import { useEffect, useState } from 'react';  
import LogoIcon from './../../res/img/logo.png'
import CartCompany from '../cart-company/cart-company';   
import Modal from '../modal/modal';
import './main-page.css'




const MainPage = () => {
    const [companies, setCompanies] = useState([]);
    const [stateApp, setStateApp] = useState('SplashScreen')
    const [splashScreenShown, setSplashScreenShown] = useState(false);
    const [stateModal, setStateModal] = useState(false)
    const [textModal, setTextModal] = useState('Lorem, ipsum dolor.')
    const {getAllCompaniesIdeal, loading, errorMessage, error} = useBoonusMoneyService(); 

    useEffect(() => {
      const timer = setTimeout(() => {
        setSplashScreenShown(true);  
      }, 3000);
  
      return () => clearTimeout(timer); 
    }, []);

    const loadMoreCompanies = async () => {
      
        getAllCompaniesIdeal()
        .then(newCompanies => {
            setCompanies(prevCompanies => [...prevCompanies, ...newCompanies]);
        })
        .catch(e => {});
    
    };

    useEffect(() => {
        if(error){
            setInfoError(error, errorMessage) 
        }
       
    }, [error, errorMessage])

    // В первый раз подгружаем компании

    useEffect(() => {
        
        loadMoreCompanies();  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // Меняем состояние в зависимости от результатов загрузки

    useEffect(() => {
        if (splashScreenShown) {
            if (loading) {
                setStateApp('loading');
            }else if(!companies.length) {
                setStateApp('no card')
            } else {
                setStateApp('start');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, splashScreenShown])


    // Обработчик при скролле вниз
  
    useEffect(() => {
        const handleScroll = () => {
            const mainPageElement = document.querySelector('.main-page');
            if (mainPageElement) {
                const { scrollTop, scrollHeight, clientHeight } = mainPageElement;
                if (scrollTop + clientHeight >= scrollHeight - 1) { 
                    loadMoreCompanies()
                }
            }
        };

        const mainPageElement = document.querySelector('.main-page');
        if (mainPageElement) {
            mainPageElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (mainPageElement) {
                mainPageElement.removeEventListener('scroll', handleScroll);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const res = changeState(stateApp)
     
    function changeState (state) {
      switch(state) {
        case 'SplashScreen':  
          return <SplashScreen/>
      
        case 'loading':   
            return(
                <>
                    <div className='managing-maps'>
                        <h3>Управление картами</h3>
                    </div>
                    {companies.map(company => <CartCompany company={company} setStateModal={setStateModal} setTextModal={setTextModal}/>)} 
                    <LoadingComponent/>  
                </>
            )
        case 'start':   
            return(
                <>
                    <div className='managing-maps'>
                        <h3>Управление картами</h3>
                    </div>
                    {companies.map((company, i) => <CartCompany company={company} setStateModal={setStateModal} setTextModal={setTextModal} key={i}  i={i}/>)} 
                </>
            )
        case 'no card': 
            return (
                <>
                    <div className='managing-maps'>
                        <h3>Управление картами</h3>
                    </div>
                    <p>Нет компаний</p>
                </>
            )    
      
        default:
         
      }
    }

    function setInfoError (error, errorMessage) {
        switch(error) {
            case 500:  
                setTextModal('Все упало');
                setStateModal(true);
                break;
            case 400:   
                setTextModal(`${errorMessage}`);
                setStateModal(true);
                break;
            case 401:   
                setTextModal('Ошибка авторизации');
                setStateModal(true);
                break;
            default:
                setTextModal('Произошла непредвиденная ошибка');
                setStateModal(true);
        }
    }
     

    return(
        <div className="main-page">
             {res}
             <Modal stateModal={stateModal} setStateModal={setStateModal} textModal={textModal}/>
        </div>
    )
}

export default MainPage


const LoadingComponent = () => {
    return (
        <div className='loading-component'>
            <ClipLoader color="#000"   cssOverride={{
                                width: '70px',
                                height: '70px', 
                            }} />
            <p style={{marginBottom: '20px'}}>Подгрузка компаний</p>
        </div>
    )
  }
  
  
  const SplashScreen = () =>{
    return(
      <div className='splash-screen'>
         <img src={LogoIcon} alt="logo-icon" className="logo-icon" />
      </div>
        
    )
  }