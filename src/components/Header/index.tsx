import React, { useContext } from 'react'
import { Container, Img } from "./style"
import Switch from "react-switch";
import { shade } from 'polished'
import { ThemeContext } from 'styled-components';
import imgLogo from '../../assets/images/logo.svg'

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({toggleTheme}) => {
const { colors, title} = useContext(ThemeContext )

  return (
    <Container >
      <Img src={imgLogo} alt=""/>
        <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        onHandleColor={colors.secundary}
        offHandleColor={colors.primary}
        offColor={shade(0.15, colors.primary)}
        onColor={colors.secundary}
      />
    </Container>
  )

}

export default Header;