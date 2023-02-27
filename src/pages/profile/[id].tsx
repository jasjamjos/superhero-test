import { FC } from 'react';
import Image from "next/image";
import { Superhero } from '..';
import { API_PATHS } from "@/constants/paths";

interface ProfileProps {
  hero: Superhero
}

const Profile: FC<ProfileProps> = ({ hero }) => {
  return (
    <main className="max-w-lg mx-auto pt-12 min-h-screen bg-slate-50 px-12">
      <div className="flex flex-col space-y-3 pb-8">
        <h1 className="text-xl text-center">Superhero Profile</h1>
        <div className="flex flex-col justify-center space-y-3">
          <div className="flex items-center space-x-6 mb-5">
            <div className="rounded-full h-16 w-16 overflow-hidden">
              <Image
                height={200}
                width={200}
                src={hero.image.url}
                alt={hero.name}
              />
            </div>
            <div className="text-xl">
              <div>{hero.name}</div>
              <div className="text-sm text-gray-400">
                {hero.biography["full-name"]}
              </div>
            </div>
          </div>
          <div>
            Biography
            <InfoBlock block={hero.biography} />
          </div>
          <div>
            Powerstats
            <InfoBlock block={hero.powerstats} />
          </div>
          <div>
            Appearance
            <InfoBlock block={hero.appearance} />
          </div>
          <div>
            Work
            <InfoBlock block={hero.work} />
          </div>
          <div>
            Connections
            <InfoBlock block={hero.connections} />
          </div>
        </div>
      </div>
    </main>
  );
};

interface InfoBlockProps {
  block: {
    [key:string]: string|string[]
  }
}

const InfoBlock:FC<InfoBlockProps> = ({ block }) => {
  return (
    <div className="text-sm text-gray-600 flex flex-col space-y-1 my-2">
      {Object.entries(block).map(([key, value]) => (
        <div key={key}>
          <span className="capitalize font-medium">
            {key.replaceAll("-", " ")}
          </span>
          :{" "}
          {Array.isArray(value) ? value.map((entry: string) => (
                <span key={entry}>{entry} </span>)) : value}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const res = await fetch(API_PATHS.GET_HERO_BY_ID(id));
  const data = await res.json();

  return { props: { hero: data } };
}

export default Profile;
