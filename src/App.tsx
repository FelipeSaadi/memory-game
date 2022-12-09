import React, { useEffect, useState } from "react"
import * as C from './App.styles'
import { Button } from "./components/Button"
import { InfoItem } from "./components/InfoItem"

import { items } from "./data/items"

import LogoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from "./types/gridItemType"

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => {
    createItems()
  }, [])

  const createItems = () => {
    let newItems: GridItemType[] = []
    for (let i = 0; i < (items.length * 2); i++) {
      newItems.push({ item: null, shown: false, permanentShown: false })
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1
        while (pos < 0 || newItems[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        newItems[pos].item = i
      }
    }

    setPlaying(true)
  }
  const resetGame = () => {
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)
    setGridItems([])
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={LogoImage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00" />
          <InfoItem label="Movimentos" value="0" />
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetGame} />

      </C.Info>

      <C.GridArea>
        <C.Grid>
          ...
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App