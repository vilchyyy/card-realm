import DeckCard from '#models/deck_card'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/lib/components/ui/dialog'
import { ScrollArea } from '~/lib/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/lib/components/ui/table'

export default function DeckTile(props: { name: string; cards: DeckCard[] }) {
  const [img, setImg] = useState<string>('')

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-col relative items-center justify-center h-[150px] w-[200px] rounded-xl">
          <img
            className="absolute z-10 h-full w-full object-cover rounded-xl"
            src="https://cards.scryfall.io/art_crop/front/6/d/6da045f8-6278-4c84-9d39-025adf0789c1.jpg?1562404626"
          />
          <p className="text-white z-30 font-bold text-2xl"> {props.name} </p>
          <p className="text-white z-30 text-md">MTG</p>
          <div className="absolute z-20 w-full h-full bottom-0 rounded-b-xl  bg-gradient-to-t from-black to-transparent" />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogTitle>{props.name}</DialogTitle>
        <div className="flex w-[800px]  gap-y-4">
          <ScrollArea className="h-[700px] w-[1300px] mr-14 ">
            <Table className="w-[100%]">
              <TableBody>
                {props.cards.map((card) => (
                  <TableRow onMouseOver={() => setImg(card.baseCard.image)}>
                    <TableCell>{card.quantity}</TableCell>
                    <TableCell>{card.baseCard.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="w-[800px] ">
            <img src={img} className="  rounded-xl" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
