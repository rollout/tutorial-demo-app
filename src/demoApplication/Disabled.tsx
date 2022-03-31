import {ReactComponent as Logo} from '../assets/images/noallexperiments.svg'
import './DemoApplication.css'

export function Disabled() {
    return <div className='demoApplication-wrapper demoApplicationDisabled-wrapper'>
        <div className='demoApplicationDisabled'>
            <Logo className='demoApplicationDisabled-logo'/>
            <p className='demoApplicationDisabled-message'>
                Game coming soon...
            </p>
        </div>
    </div>
}