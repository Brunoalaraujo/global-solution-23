import styled from 'styled-components';

export const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  transition: background 400ms;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.black};
  padding: 1rem 2rem;
  font-size: 1rem;
  outline: 0;
  border: 0;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-weight: 700;

  span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.7);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
