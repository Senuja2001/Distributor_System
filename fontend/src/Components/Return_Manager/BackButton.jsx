import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-[#092142] text-[#E3E4FA] px-4 py-1 rounded-lg w-fit hover:bg-[#10538A] transition-colors'>
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
}

export default BackButton;
