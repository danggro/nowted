import SVGThreeDot from '../svg/SVGThreeDot'
import * as palette from 'assets/Variables'
import styled from 'styled-components'
import useComponentVisible from 'hooks/useComponentVisible'
import ThreeDotPopup from './Delete'

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px;
  border-radius: 150px;
  border: 1px solid ${palette.TEXT_SECONDARY};
  color: ${palette.TEXT_SECONDARY};
  display: grid;
  place-items: center;
  cursor: pointer;
  position: absolute;
  right: 50px;
`

const ThreeDotButton = () => {
  const { ref, open, setOpen } = useComponentVisible(false)

  return (
    <Container
      ref={ref}
      onClick={() => {
        setOpen(!open)
      }}
      id="3dot"
    >
      {open ? <ThreeDotPopup /> : null}
      <SVGThreeDot />
    </Container>
  )
}

export default ThreeDotButton
