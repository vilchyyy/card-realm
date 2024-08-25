import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export function Hand(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'hand',
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div className="bg-orange-700 h-40" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}
