import React, {useState, useEffect} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {CALENDAR_URL, makeRequest, handleRequestError, WAYBILL_URL} from "../../parts/util/request-util";
import useToast from "../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./styles/calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const eventStyle = {
    color: "black"
};


const inProcessStyle = {
    style: {
        ...eventStyle,
        backgroundColor: "#b0f7f7",
    }
};

const notStartedStyle = {
    style: {
        ...eventStyle,
        backgroundColor: "#f7daad"
    }
};

const completedStyle = {
    style: {
        ...eventStyle,
        backgroundColor: "#93faab"
    }

};

const selectedStyle = {
    style: {
        backgroundColor: "#4fa3f7"
    }
};


export const CalendarTable = () => {

    const [events, setEvents] = useState([]);
    const [toast, openToast] = useToast();

    const [requestEvents, setRequestEvents] = useState([]);
    const [initEvents, setInitEvents] = useState([]);


    useEffect(() => {
        getEvents()
    }, []);

    const getEvents = () => {
        makeRequest("GET", CALENDAR_URL)
            .then(res => {
                    let eventsFromServer = transformInvoicesToEvents(res.data);
                    setEvents(eventsFromServer);
                    setInitEvents(eventsFromServer);
                }
            )
            .catch(error => handleRequestError(error, openToast))
    };


    const onEventDropAndResize = (data) => {

        const {event, start, end} = data;
        const today = new Date().getTime();

        if (today > start || event.start < today) {
            return;
        }

        const index = events.indexOf(event);
        const updatedEvent = {...event, start: start, end: end}

        const copyEvents = [...events];
        copyEvents.splice(index, 1, updatedEvent);

        const copyRequestEvent = [...requestEvents];
        let isExist = false;

        copyRequestEvent.forEach(e => {
            if (e.id === event.resource) {
                e.start = new Date(start.getTime());
                e.end = new Date(end.getTime());
                isExist = true;
            }
        });

        if (!isExist) {
            copyRequestEvent.push({id: event.resource, start: new Date(start.getTime()), end: new Date(end.getTime())});
        }

        setRequestEvents(copyRequestEvent);
        setEvents(copyEvents);

    };

    const propEvent = (event, start, end, isSelected) => {

        const today = new Date().getTime();
        start = start.getTime();
        end = end.getTime();

        if (isSelected) {
            return selectedStyle;
        }

        if (today > start && today < end) {
            return inProcessStyle
        } else if (today < start) {
            return notStartedStyle
        } else if (today > end) {
            return completedStyle
        }

    };


    const onCancel = () => {
        setEvents(initEvents);
        setRequestEvents([]);
    };

    const onSave = () => {

        if (requestEvents.length === 0) {
            openToast("No changes", "info");
            return;
        }

        requestEvents.forEach(e => {
            e.start.setDate(e.start.getDate() + 1);
        });

        makeRequest("PUT", WAYBILL_URL, requestEvents)
            .then(res => {
                openToast("Waybills has been updated", "success");
                setInitEvents(events);
                setRequestEvents([])
            })
            .catch(error => handleRequestError(error, openToast));

    };


    return (
        <main>
            <div className="calendar-wrapper">
                <DnDCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "day"]}
                    onEventDrop={onEventDropAndResize}
                    onEventResize={onEventDropAndResize}
                    eventPropGetter={propEvent}
                    resizable
                    selectable
                    style={{fontFamily: "Roboto sans-serif"}}
                />
            </div>
            <div className={"direction-col"}>
                <div className={"notice"}>
                    <div className={"inline"}>
                        <div className={"not-started-ev"}/>
                        <span> - future waybill</span>
                    </div>
                    <div className={"inline"}>
                        <div className={"current-ev"}/>
                        <span> - current waybill</span>
                    </div>
                    <div className={"inline"}>
                        <div className={"completed-ev"}/>
                        <span> - completed waybill</span>
                    </div>
                </div>
                <div className={"btn-div"}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={onSave}
                        style={{fontSize: 18, textTransform: "none"}}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onCancel}
                        style={{fontSize: 18, textTransform: "none"}}
                    >
                        Cancel
                    </Button>
                </div>
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
                end: new Date(arrivalArr[0], arrivalArr[1] - 1, Number(arrivalArr[2]) + 1),
                allDay: true,
                resource: i.waybill.id
            };
            events.push(event);
        }
    });

    return events;

};
