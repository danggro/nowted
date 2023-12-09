import styled from 'styled-components'

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
`

const SomeText = styled.span`
  font-weight: 500;
  display: block;
  margin-top: -8px;
`

const TitleAuth = ({
  title,
  someText,
}: {
  title: string
  someText: string
}) => {
  return (
    <div>
      <Title>{title}</Title>
      <SomeText>{someText}</SomeText>
    </div>
  )
}
export default TitleAuth
