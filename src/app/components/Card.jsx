import React from "react";

const categories = [
  "Phone charms", "Key chains", "Earrings", "Plushies", "Crochet",
  "Bouquet", "Fridge magnets", "Pouches", "Scrunchies", "Hairclips", "Cards"
];

const imageUrls = {
  "Phone charms": "https://i.pinimg.com/736x/1a/99/fa/1a99fa47050d8d1101998e3fd3592d82.jpg",
  "Key chains": "https://i.pinimg.com/736x/25/9e/99/259e9940378584c11eeb17bacccb2f2b.jpg",
  "Earrings": "https://i.pinimg.com/736x/0a/57/95/0a579583954b267943ffc0afea8b0976.jpg",
  "Crochet": "https://i.etsystatic.com/8375113/r/il/1ef2bd/3567850704/il_570xN.3567850704_cm4w.jpg"
};

const MainCard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
        >
          <div className="mx-4 mt-4 h-96 overflow-hidden rounded-xl">
            <img
              src={imageUrls[category] || "https://via.placeholder.com/300x400?text=No+Image"}
              className="h-full w-full object-cover"
              alt={category}
            />
          </div>
          <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-medium">{category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainCard;
