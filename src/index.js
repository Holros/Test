import React from "react";
import ReactDOM from "react-dom/client";
import style from "./css/index.module.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
import { useState } from "react";
function App() {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm();
  const onFormSubmit = (data) => {
    const formData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      destination: data.destination,
      payment_type: data.paymentType,
      date: "09/09/2026 to 12/12/2026",
      date_id: data.dateId,
      ...(data.message ? { message: data.message } : {}),
      ...(data.installmentType
        ? { installment_type: data.installmentType }
        : {}),
    };
    console.log(formData);
    const submitForm = async () => {
      const toastId = toast.loading("Loading");
      try {
        let response = await fetch(
          " https://app.visitingmyfriendtravels.com/booking/confirm/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token 1b10ffdb71789cf6fc8c62b2f6f12b288bad184f",
            },
            body: JSON.stringify(formData),
          }
        );
        console.log(response);
        let data = await response.json();
        console.log(data);
        if (response.ok) {
          setData(data);
          setShow(true);
          toast.dismiss(toastId);
          toast.success(data);
        }
        if (response.status === 400) {
          setData(data);
          setShow(true);
          toast.dismiss(toastId);
          toast.success(data.error);
        }
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Something Went Wrong");
      }
    };
    submitForm();
  };
  useEffect(() => {
    setValue("destination", "1");
  }, [setValue]);
  const checkOption = watch("paymentType");
  return (
    <div className={style.application}>
      <Toaster position="top-right" />
      <Modal data={data} show={show} setShow={setShow} />
      <div className={style.header}>
        <p>Booking</p>
        <h2>Time To Book Your Holiday</h2>
      </div>
      <form>
        <div className={style.half_input}>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
        </div>
        <div className={style.half_input}>
          <input type="email" placeholder="Your Email" {...register("email")} />
          <input type="number" placeholder="phone" {...register("phone")} />
        </div>
        <div className={style.half_input}>
          <select {...register("destination")} disabled>
            <option value="1">Nigeria</option>
          </select>
          <input
            type="text"
            value={"09/09/2026 to 12/12/2026"}
            placeholder="Date"
            {...register("date")}
            disabled
          />
        </div>
        <div className={style.submit}>
          <label>Payment Type</label>
        </div>
        <div className={style.full_input}>
          <select {...register("paymentType")}>
            <option value="full">Full</option>
            <option value="installment">Installment</option>
          </select>
        </div>
        {checkOption === "installment" ? (
          <>
            <div className={style.submit}>
              <label>Installment Type</label>
            </div>
            <div className={style.full_input}>
              <select {...register("installmentType")}>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </>
        ) : null}
        <div className={style.full_input}>
          <input type="hidden" value={3} {...register("dateId")} />
        </div>
        <div className={style.full_input}>
          <input
            placeholder="Your Message(Optional)"
            {...register("message")}
          />
        </div>
        <div className={style.submit}>
          <button onClick={handleSubmit(onFormSubmit)}>Book Now</button>
        </div>
      </form>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
