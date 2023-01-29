import styled from 'styled-components';

interface FlexProps {
  display?: string,
  flexDirection?: string,
  alignItems?: string,
  justifyContent?: string,
  gap?: string,
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  align-items: ${({alignItems = 'center'}) => alignItems};
  justify-content: ${({justifyContent = 'center'}) => justifyContent};
  gap: ${({gap = '0px'}) => gap};
`;

export default Flex;