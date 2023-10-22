import './GlobalStyle.scss';
import background from '../../assets/background.jpg'

function GlobalStyle( {children }) { 
  return <div className='body'>
    <div className='body-background'>
    </div>
    {children}
  </div>;
}

export default GlobalStyle;