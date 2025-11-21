import { useState } from 'react';
import {styled} from 'styled-components'

 const controlDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7280;
`

const InputWrapper = styled.div` 
  position: relative;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: ${props => props.hasIcon ? '2.5rem' : '1rem'};
  line-height: 1.5;
  background-color: #d1d5db;
  color: #374151;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

const InputIcon = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: ${props => props.clickable ? 'auto' : 'none'};
  font-size: 1.25rem;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s ease;
  user-select: none;
  filter: brightness(0.3);
`

const Button = styled.button`
.button {
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border-radius: 6px;
  border: none;
}

.button:hover {
  background-color: #f0920e;
}

.text-button {
  color: #f0b322;
  border: none;
}

.text-button:hover {
  color: #f0920e;

`

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;
  const emailValid = submitted && enteredEmail.includes('@');
  const passwordValid = submitted && enteredPassword.trim().length > 6;
  return (
    <div id="auth-inputs">
      <controlDiv>
        <p className="auth-item">
          <Label className={`label ${passwordNotValid? 'invalid' : 'valid'}`}>Email</Label>
          <InputWrapper>
            <Input
              type="email"
              className={emailValid ? 'valid' : emailNotValid ? 'invalid' : ''}
              value={enteredEmail}
              hasIcon={false}
              onChange={(event) => handleInputChange('email', event.target.value)}
            />
          </InputWrapper>
        </p>
        <p className="auth-item">
          <Label className={`label ${passwordNotValid? 'invalid' : 'valid'}`}>Password</Label>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              className={passwordValid ? 'valid' : passwordNotValid ? 'invalid' : ''}
              value={enteredPassword}
              hasIcon={passwordFocused}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(event) =>
                handleInputChange('password', event.target.value)
              }
            />
            <InputIcon 
              visible={passwordFocused} 
              clickable={true}
              onMouseDown={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? '👁️' : '👁'}
            </InputIcon>
          </InputWrapper>
        </p>
      </controlDiv>
      <div className="actions">
        <Button type="button" className="text-button auth-item">
          Create a new account
        </Button>
        <Button className='button auth-item' onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
