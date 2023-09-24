
import {
    Container,
    Content,
    ImageLogo,
}   from './styles';

import logoSvg from '../../assets/icons/logo.svg'
export function Header(){
    return(
        <Container>
            <Content>
                <ImageLogo src={logoSvg} alt='Logo StackX'/>
                <button>
                    <img src="https://github.com/Lgsantos1908.png"/>
                </button>
            </Content>
        </Container>
    )
}