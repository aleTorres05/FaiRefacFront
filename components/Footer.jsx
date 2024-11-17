import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="border-t col-start-1 col-end-13 h-fit flex flex-col border-gray-700 pt-8 my-6">
        <div className="flex flex-col justify-evenly ">
          <div>
            <img
              className="h-[55px] w-[60%] md:w-[30%] lg:w-[25%] md:h-[65px] xl:w-[20%] 2xl:w-[15%]"
              src="https://fairefac-assets.s3.us-east-2.amazonaws.com/FR-Logo.png"
              alt="logo"
            />
          </div>
          <div className="flex flex-row justify-between flex-wrap my-4 md:justify-between xl:justify-evenly 2xl:justify-evenly">
            <div className="md:w-1/3 lg:w-[33%] xl:w-[33%] 2xl:w-[33%] ">
              <h3 className="font-chakra text-2xl border-b-2 w-fit border-[#D16527] font-bold mb-2 xl:text-2xl 2xl:text-3xl ">
                EQUIPO
              </h3>
              <ul className=" font-chakra w-[100%] md:w-[100%] md:text-xl font-semibold xl:text-2xl 2xl:text-3xl xl:font-medium">
                <li>
                  <a
                    href="https://www.linkedin.com/in/alejandro-torres-3ba72a179/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ALEJANDRO TORRES
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/gerardo-urias-gur/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GERARDO URIAS
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ZenCalderon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    KEVIN CALDERON
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/yair-guadarrama-732390301/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YAIR GUADARRAMA
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 lg:w-[33%] xl:w-[33%] 2xl:w-[33%] ">
              <h3 className="font-chakra text-2xl border-b-2 w-fit border-[#D16527] font-bold mb-2">
                GITHUB
              </h3>
              <ul className=" font-chakra w-[100%] md:w-[100%] md:text-xl font-semibold xl:text-2xl 2xl:text-3xl xl:font-medium">
                <li>
                  <a
                    href="https://github.com/aleTorres05"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ALETORRES05
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/gurdiny"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @GURDINY
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ZenCalderon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ZENCALDERON
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Yairgg95"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @YAIRGG95
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col mt-6 h-sreen  md:w-1/3 md:mt-0 lg:w-[33%] xl:w-[33%] 2xl:w-[33%] ">
              <h3 className="font-bold mb-2 font-chakra  text-2xl border-b-2 w-fit border-[#D16527]">
                UNETE A FAIREFAC
              </h3>
              <button className="bg-[#D16527] font-chakra w-[213px] text-white px-4 py-2 rounded mt-2">
                <Link href="/signup">REGISTRATE</Link>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
