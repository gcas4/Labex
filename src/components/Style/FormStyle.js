import Styled from 'styled-components'
import Select from '@material-ui/core/Select'

export const SelectStyled = Styled(Select)`
  min-width: 200px;
`
export const Form = Styled.form`
  width: 90%;
  max-width: 400px;
  background-color: rgba(224, 251, 252, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;

  h2 {
    margin-bottom: 0;
    padding: 0 20px;
    font-weight: 300;
  }

  button {
    margin: 10px 0 20px;
  }
`
export const FormData = Styled.div`
  width: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: initial;
  text-align: left;
`
export const Label = Styled.label`
  color: #293241;
  margin-top: 10px;
`