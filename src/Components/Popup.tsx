import { useState } from "react";
import {
  AiFillCode,
  AiOutlineLink,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { RiHistoryLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export default function Popup() {
  const [show, setShow] = useState(true);
  const contact = [
    {
      icon: <AiOutlineLink size={22} />,
      link: "https://new-portfolio-theta-jade.vercel.app/",
    },

    {
      icon: <AiOutlineMail size={22} />,
      link: "mailto:tusharbhatt0135@gmail.com",
    },
    {
      icon: <AiOutlineLinkedin size={22} />,
      link: "https://www.linkedin.com/in/tushar-bhatt-59b64623b",
    },
  ];
  const features = [
    {
      icon: <AiFillCode />,
      title: "Modern Tech Stacks",
      description: "React , Typescript , Zustand and Tailwind.",
    },
    {
      icon: <VscChecklist className="text-blue-500" />,
      title: "Reusable components",
      description: "Blocks , Input , Button and more.",
    },
    {
      icon: <RiHistoryLine className="text-green-500" />,
      title: "Clean code",
      description: "Efficient code and best practises.",
    },
  ];

  if (show) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 text-sm">
        <div className="bg-white flex  flex-col gap-4 rounded-lg shadow-lg p-6 max-w-md z-50">
          <div className="flex items-center justify-between  text-center">
            <h2 className="text-2xl font-bold mb-4">Key Highlights</h2>
            <button onClick={() => setShow(false)}>
              <IoMdClose size={22} />
            </button>
          </div>
          <ul className="list-disc pl-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center mb-3 gap-3">
                <span className="text-xl mr-2">{feature.icon}</span>
                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center py-2 flex flex-col items-center justify-center gap-4">
            <span className="text-gray-800 font-semibold">
              Crafted by <span className="text-lg">Tushar Bhatt</span>
            </span>
            <div className="flex gap-4">
              {contact.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className="hover:text-blue-500 transition duration-300"
                  target="_blank"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <h1 className="text-lg text-blue-500 font-bold">Answering the questions that were asked -</h1>
            <div>
              <h2>Three Things learned from this assignment :</h2>
              <p className="font-bold ml-4">Reading Docs , Debugging and better State management</p>
            </div>
            <div>
              <h2>Most difficult part of this assignment :</h2>
              <p className="font-bold ml-4">Styling the calendar.</p>
            </div>
            <div>
              <h2>If more time was alotted :</h2>
              <p className="font-bold ml-4">Would have encorporated search feature and better UI.</p>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 bg-black opacity-50"></div>
      </div>
    );
  }
}
