import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'

interface SortableCardProps {
  id: string
  children: React.ReactNode
}

const SortableCard: React.FC<SortableCardProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

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
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )
}

const SortableHorizontalList: React.FC = () => {
  const [cardItems, setCardItems] = useState<string[]>(['1', '2', '3', '4', '5'])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setCardItems((items) => {
        const oldIndex = items.indexOf(String(active.id))
        const newIndex = items.indexOf(String(over?.id))

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex overflow-x-auto p-4">
        <SortableContext items={cardItems} strategy={horizontalListSortingStrategy}>
          {cardItems.map((id) => (
            <SortableCard key={id} id={id}>
              Card {id}
            </SortableCard>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default SortableHorizontalList
