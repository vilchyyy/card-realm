import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })
  const style = {
    transform: CSS.Translate.toString(transform),
  }
  return (
    <button
      className={props.className}
      ref={setNodeRef}
      style={style || props.style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  )
}
