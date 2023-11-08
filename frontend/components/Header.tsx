import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full">
      <nav>
        <ul className="flex items-center justify-between ml-5 mb-3">
          <li>
            <Link
              legacyBehavior
              className="pointer-events-none flex place-items-center"
              href={{
                pathname: "/",
              }}
            >
              <a className="gap-2 border text-xl px-2 py-1 md:text-2xl  md:px-3 md:py-1  border-white rounded-3xl font-light bg-transparent ">
                ZuAstro
              </a>
            </Link>
          </li>
          <li className="flex flex-row p-4"></li>
        </ul>
      </nav>
    </header>
  );
};
