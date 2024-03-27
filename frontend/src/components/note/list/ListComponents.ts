import styled from 'styled-components'
import * as palette from 'assets/Variables'

export const ContainerList = styled.div`
  display: flex;
  flex-direction: column;
  color: ${palette.TEXT_SECONDARY};
  span {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }
`
export const HeaderList = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
  }
  button:hover {
    color: ${palette.WHITE};
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
`
