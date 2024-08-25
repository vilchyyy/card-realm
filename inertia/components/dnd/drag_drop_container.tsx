import React, { act, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'

// Shared interfaces and types
interface CardItem {
  id: number
  content: string
  position: { x: number; y: number }
}

interface DraggableCardProps {
  item: CardItem
  isDragging?: boolean
  style?: any
}

// Draggable Card component
const DraggableCard: React.FC<DraggableCardProps> = ({ item, isDragging, style }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  })

  const newStyle = {
    transform: CSS.Translate.toString(transform),
    ...style,
  }

  return (
    <Card
      ref={setNodeRef}
      style={newStyle}
      className={`w-64 absolute cursor-move ${isDragging ? 'opacity-50' : ''}`}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-4">{item.content}</CardContent>
    </Card>
  )
}

// Sortable Card component (modified from previous example)
const SortableCard: React.FC<DraggableCardProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="w-64 mr-4 cursor-move"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-4">{item.content}</CardContent>
    </Card>
  )
}

// FreeMoveArea component
const FreeMoveArea: React.FC<{ items: CardItem[] }> = ({ items }) => {
  const { setNodeRef } = useDroppable({
    id: 'free-move-area',
  })

  return (
    <div ref={setNodeRef} className="w-full h-96 bg-gray-100 relative p-4">
      {items.map((item) => (
        <DraggableCard
          style={{
            position: 'absolute',
            left: items[item.id - 1]?.position?.x || 0,
            top: items[item.id - 1]?.position?.y || 0,
          }}
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}

// SortableHorizontalList component (modified from previous example)
const SortableHorizontalList: React.FC<{ items: CardItem[] }> = ({ items }) => {
  return (
    <div className="flex overflow-x-auto p-4">
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={horizontalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableCard key={item.id} item={item} />
        ))}
      </SortableContext>
    </div>
  )
}

// Parent component to manage state and drag-and-drop logic
const DragDropContainer: React.FC = () => {
  const [sortableItems, setSortableItems] = useState<CardItem[]>([
    { id: 1, content: 'Card 1', position: { x: 0, y: 0 } },
    { id: 2, content: 'Card 2', position: { x: 0, y: 0 } },
    { id: 3, content: 'Card 3', position: { x: 0, y: 0 } },
  ])
  const [freeItems, setFreeItems] = useState<CardItem[]>([])
  const [activeId, setActiveId] = useState<any>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over?.id === 'free-move-area') {
      console.log('tutaj')
      const sortableIndex = sortableItems.findIndex((item) => item.id === active.id)
      if (sortableIndex !== -1) {
        setSortableItems((items) => items.filter((item) => item.id !== active.id))
        setFreeItems((items) => [...items, sortableItems.find((item) => item.id === active.id)!])
      } else {
        const activeItem = allItems.find((item) => item.id === activeId)
        if (!activeItem) return
        console.log(activeItem)
        setFreeItems((items) => {
          const newitems = items.filter((item) => item.id !== activeItem.id)
          return [
            ...newitems,
            {
              id: activeItem.id,
              content: activeItem.content,
              position: {
                x: activeItem.position.x + event.delta.x,
                y: activeItem.position.y + event.delta.y,
              },
            },
          ]
        })
      }
    } else if (over?.id && over.id !== 'free-move-area') {
      setFreeItems((items) => items.filter((item) => item.id !== active.id))
      setSortableItems((items) => {
        const activeItem = [...items, ...freeItems].find((item) => item.id === active.id)!
        const overIndex = items.findIndex((item) => item.id === over.id)
        const newItems = items.filter((item) => item.id !== active.id)
        return arrayMove([...newItems, activeItem], newItems.length, overIndex)
      })
    }

    setActiveId(null)
  }

  const allItems = [...sortableItems, ...freeItems]
  const activeItem = allItems.find((item) => item.id === activeId)

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableHorizontalList items={sortableItems} />
      <FreeMoveArea items={freeItems} />
      <DragOverlay>
        {activeItem ? <DraggableCard item={activeItem} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default DragDropContainer
