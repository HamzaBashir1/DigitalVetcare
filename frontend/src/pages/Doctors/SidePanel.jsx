import { useContext } from "react";
import convertTime from "../../utils/convertTime";
import { Base_URL } from "../../config";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const { token } = useContext(AuthContext);
  const bookingHandler = async () => {
    try {
      const res = await fetch(`${Base_URL}/booking/checkout-session/${doctorId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} RS
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">Available Time Slots:</p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px leading-6 text-textColor font-semibold">
                {/* Sunday */}
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px leading-6 text-textColor font-semibold">
                {/* 4:00 PM - 9:30 PM */}
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}

          {/* <li className='flex items-center justify-between mb-2'>
                <p className='text-[15px leading-6 text-textColor font-semibold'>
                    Tuesday
                </p>
                <p className='text-[15px leading-6 text-textColor font-semibold'>
                    4:00 PM - 9:30 PM
                </p>
            </li>
            <li className='flex items-center justify-between mb-2'>
                <p className='text-[15px leading-6 text-textColor font-semibold'>
                    Wednesday
                </p>
                <p className='text-[15px leading-6 text-textColor font-semibold'>
                    4:00 PM - 9:30 PM
                </p>
            </li> */}
        </ul>
      </div>
      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
