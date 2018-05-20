import styled, { keyframes } from 'styled-components'

const EntryTransitionKeyframes = keyframes`
  0% {
        opacity: 0;
      transform: translateY(1vh)
    }
  100% {
        opacity: 1;
      transform: translateY(0)
    }
  `

export const EntryTransition = styled.div`
  animation: 0.5s ${EntryTransitionKeyframes} cubic-bezier(0.785, 0.135, 0.15, 0.86);
`
