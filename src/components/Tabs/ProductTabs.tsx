import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import img_tableSizesCloth from "../../../public/img_tableSizesCloth.jpg";
import img_tableSizesShoes from "../../../public/img_tableSizesShoes.jpg";

type Props = {
  category: string;
  description: string;
};

export default function ProductTabs({ category, description }: Props) {
  return (
    <Tabs.Root className="flex flex-col w-full mt-3" defaultValue="description">
      <Tabs.List className="flex justify-start items-center gap-4">
        <Tabs.Trigger
          className="uppercase pb-0.5 border-b-2 border-white data-[state=active]:text-[#FF9595] data-[state=active]:border-[#FF9595]"
          value="description"
        >
          Описание
        </Tabs.Trigger>
        <Tabs.Trigger
          className="uppercase pb-0.5 border-b-2 border-white data-[state=active]:text-[#FF9595] data-[state=active]:border-[#FF9595]"
          value="tableSizes"
        >
          Таблица размеров
        </Tabs.Trigger>
        <Tabs.Trigger
          className="uppercase pb-0.5 border-b-2 border-white data-[state=active]:text-[#FF9595] data-[state=active]:border-[#FF9595]"
          value="care"
        >
          Уход
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="mt-3" value="description">
        <p className="whitespace-pre-line text-base">{description}</p>
      </Tabs.Content>
      <Tabs.Content className="mt-3" value="tableSizes">
        <Image
          src={
            category === "одежда" ? img_tableSizesCloth : img_tableSizesShoes
          } //исправить
          alt="Таблица размеров"
        />
      </Tabs.Content>
      <Tabs.Content className="mt-1" value="care">
        <div className="text-base">
          <p className="mt-2">Главное правило ухода - не занашивать изделие</p>
          <p className="mt-2">
            <span className="italic">Одежда.</span> Стирать не менее 1 раза
            каждые 3-5 дней при регулярной носке
          </p>
          <p className="mt-2">
            <span className="italic">Обувь.</span> Давать отдыхать не менее 1
            суток каждые 5 дней при регулярной носке
          </p>
          <p className="mt-2">
            <span className="italic">Костюм и пальто.</span> Химчистка
            желательна каждые полгода при регулярной носке
          </p>
          <p className="mt-2">
            ! Изделия с принтами и из чистых натуральных тканей НЕ стирать на
            отжиме больше, чем 600-800 оборотов в минуту
          </p>
          <p className="mt-2">
            ! Изделия с ручными вышивками и нашивками НЕ стирать с изделиями с
            металлическими замками и другими элементами, которые могут повредить
          </p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
