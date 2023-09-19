import { useEffect, useState } from "react";
import { MdCopyAll } from "react-icons/md";

const getLocalStorage = () => {
  let links = localStorage.getItem("links");

  if (links) {
    return JSON.parse(localStorage.getItem("links"));
  } else {
    return [];
  }
};

export default function Scissor() {
  const [text, setText] = useState("");
  const [links, setLinks] = useState(getLocalStorage);
  const [copy, setCopy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidUrl = (text) => {
      // Regular expression pattern to validate URLs
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // IP address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator

      return pattern.test(text);
    };

    if (!isValidUrl(text)) {
      alert("Link is Incorrect");
    } else {
      const shortenLink = async () => {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${text}`);
        const data = await res.json();
        console.log(data.result);
        setLinks(data.result);
        setText("");
      };

      shortenLink();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(links.full_short_link);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  return (
    <>
      <section className="max-width shortener relative py-5  bg-[rgb(2,17,85)]">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row ">
            <input
              type="url"
              placeholder="Shorten a link here"
              className="w-full py-2 px-5 rounded-lg mb-2 md:mb-0 md:w-2/3"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="btn-cta rounded-lg w-full md:w-40 md:ml-5"
              onClick={handleSubmit}
            >
              Shorten It!
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center justify-center bg-white text-center md:flex-row md:justify-between p-3 mt-3 rounded-lg shadow">
          <article>
            <h6 className="mb-3 md:mb-0">{links.original_link}</h6>
          </article>

          <article>
            <ul className="md:flex md:items-center">
              <li className="md:mr-5 text-sm">
                <button className="text-cyan-500">
                  {links.full_short_link}
                </button>
              </li>
              <li className="md:mr-5 text-sm">
                <MdCopyAll
                  onClick={handleCopy}
                  className="cursor-pointer text-3xlg text-slate-500"
                />
                {copy && (
                  <p className="fixed top-[35%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
                    Link Copied
                  </p>
                )}
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
