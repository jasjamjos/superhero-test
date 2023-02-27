import Link from 'next/link';
import {API_PATHS} from "@/constants/paths"
import { FormEvent, useState } from 'react';
import Image from 'next/image';

export type Superhero = {
  id: number;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    "group-affiliation": string;
    relatives: string;
  };
  image: {
    url: string;
  };
};


export default function Home() {
  const [query, setQuery] = useState("")
  const [superheroes, setSuperheroes] = useState<Superhero[]>([])

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      API_PATHS.SEARCH_HEROES(query),
    );

    const { results } = await response.json();
    setSuperheroes(results)
  };

  return (
    <>
      <main className="max-w-lg mx-auto pt-12 min-h-screen bg-slate-50 px-12">
        <div className="flex flex-col items-center space-y-3 mb-8">
          <h1 className="text-xl">Search Heroes</h1>
          <form
            className="flex flex-col space-y-2 items-center"
            onSubmit={handleSearch}
          >
            <input
              className="bg-slate-200 rounded text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-blue-300 rounded-lg px-2 py-1 w-fit"
              type="submit"
            >
              SEARCH
            </button>
          </form>
        </div>
        <div className='flex flex-col space-y-5 overflow-x-auto h-full pb-12'>
          {superheroes.length > 0 &&
            superheroes.map((hero: Superhero) => (
                <Link
                  href={`/profile/${hero.id}`}
                  key={hero.id}
                >
                  <div className="flex items-center space-x-5 hover:bg-slate-200 rounded-full">
                    <div className="rounded-full h-12 w-12 overflow-hidden">
                      <Image
                        height={50}
                        width={50}
                        src={hero.image.url}
                        alt={hero.name}
                      />
                    </div>
                    <div>{hero.name} <span className='text-sm text-gray-400'>{hero.biography.publisher}</span></div>
                  </div>
                </Link>
            ))}
        </div>
      </main>
    </>
  );
}
