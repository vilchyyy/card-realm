export default function DeckTile() {
  return (
    <div className="flex flex-col relative items-center justify-center h-[150px] w-[200px] rounded-xl">
      <img
        className="absolute z-10 h-full w-full object-cover rounded-xl"
        src="https://cards.scryfall.io/art_crop/front/6/d/6da045f8-6278-4c84-9d39-025adf0789c1.jpg?1562404626"
      />
      <p className="text-white z-30 font-bold text-2xl"> Nazwa talii </p>
      <p className="text-white z-30 text-md">MTG</p>
      <div className="absolute z-20 w-full h-full bottom-0 rounded-b-xl  bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
