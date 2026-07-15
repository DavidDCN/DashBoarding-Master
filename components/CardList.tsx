import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const latestTransactions = [
  {
    id: 1,
    title: "Subscription Renewal",
    badge: "Meow Zedong",
    image: "https://placecats.com/neo/200/200",
    count: 1400,
  },
  {
    id: 2,
    title: "Payment for Services",
    badge: "Meow Fasa",
    image: "https://placecats.com/millie/200/200",
    count: 2100,
  },
  {
    id: 3,
    title: "Subscription Renewal",
    badge: "Meowchael Jackson",
    image: "https://placecats.com/bella/200/200",
    count: 1300,
  },
  {
    id: 4,
    title: "Payment for Services",
    badge: "Meowdolf Kitler",
    image: "https://placecats.com/poppy/200/200",
    count: 2500,
  },
  {
    id: 5,
    title: "Subscription Renewal",
    badge: "Genghis Meow",
    image: "https://placecats.com/louie/200/200",
    count: 1400,
  },
];
// Replace the static popularContent array with a fetch, e.g. in a Server Component:
const res = await fetch("https://dev.to/api/articles?top=7", {
  next: { revalidate: 3600 }, // cache for 1 hour
});
const articles = await res.json();

const popularContent = articles.slice(0, 5).map((a: any) => ({
  id: a.id,
  title: a.title,
  badge: a.tag_list[0] ?? "Article",
  image: a.cover_image ?? a.social_image,
  count: a.public_reactions_count,
}));

const CardList = ({ title }: { title: string }) => {
  const list =
    title === "Popular Content" ? popularContent : latestTransactions;

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Badge variant="secondary">{item.badge}</Badge>
            </CardContent>
            <CardFooter className="p-0">{item.count / 1000}K</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;