/**
 * full screen control area
 */
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import {toggleFullScreen} from './unit/fullscreen'

type props = {
}

export const ControlArea = (props: props) => {
  const [isVisible, setVisible] = useState(false)
  const [timer, setTimer] = useState(0)
  const mouseMove = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (timer) {
      clearTimeout(timer)
    }

    const _timer = setTimeout(() => {
      setVisible(false)
      setTimer(0)
    }, 3000)
    
    setVisible(true)
    setTimer(_timer)
  }, [timer])

  return <Wrap onMouseMove={mouseMove} isVisible={isVisible}>
    <GrayBlock isVisible={isVisible}>
      <ToggleButton type="button" onClick={toggleFullScreen}>Toggle FullScreen</ToggleButton>
    </GrayBlock>
  </Wrap>

}

const Wrap = styled.div<{isVisible: boolean}>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  cursor: ${props => props.isVisible ? 'default' : 'none'};
`
const GrayBlock = styled.div<{isVisible: boolean}>`
  opacity: ${props => props.isVisible ? 1 : 0};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(hsl(0deg 0% 0% / 0%), black);
  font-size: 1.5em;
  transition: opacity 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ToggleButton = styled.button `
  padding: 1em;
  color: gray;
  border-radius: 10em;
  cursor: pointer;
  opacity: 0.8;
  border: none;
  &:hover {
    opacity: 1;
  }
`
