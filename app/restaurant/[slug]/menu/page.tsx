import { PrismaClient } from "@prisma/client";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: 'Open Table | Menu',
  description: 'Welcome to open table',
}

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    notFound()
  }

  return restaurant.items;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchRestaurantMenu(params.slug);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu menu={menu} />
      </div>
    </>
  );
}
