import { LuPlus, LuTrash2 } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { Icon } from "@/enums";
import { FaAlignLeft, FaAlignRight } from "react-icons/fa";

export const IconElement = ({ icon }: { icon: Icon }) => {
  switch (icon) {
    case Icon.Add:
      return <LuPlus />;
    case Icon.Edit:
      return <CiEdit />;
    case Icon.Delete:
      return <LuTrash2 />;
    case Icon.Filter:
      return <FiFilter />;
    case Icon.Collapse:
      return <IoIosArrowForward />;
    case Icon.Hide:
      return <IoIosArrowBack />;
    case Icon.Show:
      return <IoIosArrowDown />;
    case Icon.FaAlignRight:
      return <FaAlignRight />;
    case Icon.FaAlignLeft:
      return <FaAlignLeft />;
    case Icon.IndentRight:
      return (
        <img
          src="/IndentRight.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.IndentLeft:
      return (
        <img
          src="/IndentLeft.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.Auto:
      return (
        <img src="/Auto.svg" className="w-full h-full object-contain" alt="" />
      );
    case Icon.DownIcon:
      return (
        <img
          src="/DownIcon.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.UpIcon:
      return (
        <img
          src="/UpIcon.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.Group:
      return (
        <img src="/Group.svg" className="w-full h-full object-contain" alt="" />
      );
    case Icon.Merge:
      return (
        <img src="/Merge.svg" className="w-full h-full object-contain" alt="" />
      );
    case Icon.PlusIcon:
      return (
        <img
          src="/PlusIcon.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.Progress0:
      return (
        <img
          src="/Progress0.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.Progress25:
      return (
        <img
          src="/Progress25.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.Progress50:
      return (
        <img
          src="/Progress50.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.Progress75:
      return (
        <img
          src="/Progress75.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    case Icon.Progress100:
      return (
        <img
          src="/Progress100.svg"
          className="w-full h-full object-contain"
          alt=""
        />
      );
    default:
      return null;
  }
};
