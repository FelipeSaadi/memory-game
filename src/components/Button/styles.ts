import styled from "styled-components"

export const Container = styled.div`
display: flex;
  width: 200px;
  height: 50px;
  background-color: #1550FF;
  border-radius: 10px;
  cursor: pointer;
  opacity: 1;
  transition: all ease .3s;

  &:hover {
    opacity: .8;
  }
`

export const IconArea = styled.div`
  display: flex;
  height: inherit;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, .2);
  padding: 0 15px;
`

export const Icon = styled.img`
  height: 20px;
`

export const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: inherit;
  color: #FFF;
  padding: 0 20px;
`