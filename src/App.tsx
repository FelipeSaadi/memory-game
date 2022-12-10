import React, { useEffect, useState } from "react"
import * as C from './App.styles'

import { Button } from "./components/Button"
import { InfoItem } from "./components/InfoItem"
import { GridItem } from "./components/GridItem"

import { items } from "./data/items"

import LogoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from "./types/gridItemType"
import { formatTime } from "./helpers/formatTime"

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => {
    createItems()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true)

      if (opened.length === 2) {
        let newGrid = [...gridItems]

        if (opened[0].item === opened[1].item) {
          for (let i = 0; i < newGrid.length; i++) {
            if (newGrid[i].shown) {
              newGrid[i].shown = false;
              newGrid[i].permanentShown = true
            }
          }
          setGridItems(newGrid)
          setShownCount(0)

          setMoveCount(moveCount + 1)
        }
        else {
          setTimeout(() => {
            for (let i = 0; i < newGrid.length; i++) {
              if (newGrid[i].shown) {
                newGrid[i].shown = false;
              }
            }
            setGridItems(newGrid)
            setShownCount(0)

            setMoveCount(moveCount + 1)
          }, 500)
        }
      }
    }

  }, [shownCount, gridItems])

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false)
    }
  }, [moveCount, gridItems])

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

    setGridItems(newItems)
    setPlaying(true)
  }
  const resetGame = () => {
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)
    setGridItems([])
    createItems()
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let newGrid = [...gridItems]

      if (newGrid[index].permanentShown === false && newGrid[index].shown === false) {
        newGrid[index].shown = true;
        setShownCount(shownCount + 1)
      }
      setGridItems(newGrid)
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={LogoImage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTime(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetGame} />

      </C.Info>

      <C.GridArea>
        <C.Grid>
          {
            gridItems.map((item, index) => {
              return (
                <GridItem key={index} item={item} onClick={() => handleItemClick(index)} />
              )
            })
          }
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App