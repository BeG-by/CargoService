import React, {useState, useEffect} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles/calendar.css";
import {CALENDAR_URL, makeRequest, handleRequestError} from "../../parts/util/request-util";
import useToast from "../../parts/toast-notification/useToast";


export const CalendarTable = () => {

    const [events, setEvents] = useState([]);
    const [toast, openToast] = useToast();


    useEffect(() => {

        makeRequest("GET", CALENDAR_URL)
            .then(res => setEvents(transformInvoicesToEvents(res.data)))
            .catch(error => handleRequestError(error, openToast))

    }, []);


    const localizer = momentLocalizer(moment);


    return (
        <main>
            <div className="calendar-wrapper">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "day"]}
                />
            </div>
            {toast}
        </main>


    )

};


const transformInvoicesToEvents = (invoices) => {

    const events = [];

    invoices.forEach(i => {

        if (i.waybill !== null) {
            const title = i.number + " " + i.driver.name + " " + i.driver.patronymic;
            const departureArr = i.waybill.departureDate.split("-");
            const arrivalArr = i.waybill.arrivalDate.split("-");

            const event = {
                title: title,
                start: new Date(departureArr[0], departureArr[1] - 1, departureArr[2]),
                end: new Date(arrivalArr[0], arrivalArr[1] - 1, arrivalArr[2]),
                allDay: true
            };
            events.push(event);
        }
    });

    return events;

};
