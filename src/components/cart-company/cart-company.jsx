 
import  { ReactComponent as TrashIcon } from './../../res/img/eye_white.svg'
import { ReactComponent as  EyeIcon} from './../../res/img/trash_white.svg'
import './cart-company.css'


const CartCompany = ({company, setTextModal, setStateModal, i}) => {
    const {mobileAppDashboard, customerMarkParameters} = company;
    const {companyName, logo, cardBackgroundColor, highlightTextColor, textColor, mainColor, accentColor} = mobileAppDashboard
    const {mark, loyaltyLevel} = customerMarkParameters;
    const {name, cashToMark} = loyaltyLevel
    
    const onLookCompany = () => {
        setStateModal(true) 
        setTextModal(`Нажата клавиша 'Просмотра'. ID-компании: ${company.company.companyId}`)
    }

    const onDeleteCompany = () => {
        setStateModal(true) 
        setTextModal(`Нажата клавиша 'Удаления'. ID-компании: ${company.company.companyId}`)
    }

    const onAboutCompany = () => {
        setStateModal(true) 
        setTextModal(`Нажата клавиша 'Подробнее'. ID-компании: ${company.company.companyId}`)
    }
 
    return(
        <div className="cart-company" style={{backgroundColor: cardBackgroundColor}} key={i}>
            <div className="head">
                <h2 style={{color: highlightTextColor}} >
                    {companyName}
                </h2>
                <img src={logo} alt='logo-commpany' className='logo-company'/> 
            </div>
            <div className="number-points">
                <h4 style={{color: highlightTextColor}}>{mark}</h4> 
          
                <p className='number-points__item' style={{color: textColor}}>баллов</p>
            </div>
            <div className="other">
                <div className="other-item">
                    <p className='other-item__name' style={{color: textColor}}>
                        Кешбэк
                    </p>
                    <h5 >{cashToMark}%</h5>
                </div>
                <div className="other-item">
                    <p className='other-item__name' style={{color: textColor}}>
                        Уровень
                    </p>
                    <h5>{name}</h5>
                </div>
            </div>
            <div className="buttons">
                <button style={{backgroundColor: cardBackgroundColor}} onClick={onLookCompany}> 
                    <EyeIcon style={{ width: '50px', height: '50px', color: mainColor  }} />
                </button>
                <button style={{backgroundColor: cardBackgroundColor}}  onClick={onDeleteCompany}>  
                    <TrashIcon style={{ width: '50px', height: '50px', color: accentColor  }}/>
                </button>
                <button style={{color: mainColor}} className='last-btn__buttons__cart-company' onClick={onAboutCompany}> 
                    Подробнее 
                </button>
            </div>
        </div>
    )
}

export default CartCompany;