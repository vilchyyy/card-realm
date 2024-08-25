import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export function MainBoard(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'main_board',
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div className="bg-purple-700 h-80 w-full" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}
