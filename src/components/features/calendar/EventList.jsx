/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { toast } from "react-toastify";
import { MdDelete, MdOutlineTimer } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { TbUrgent } from "react-icons/tb";
import { PiHourglassLowFill } from "react-icons/pi";
import { HiOutlineStatusOffline, HiOutlineStatusOnline } from "react-icons/hi";
import { useTheme } from "../../../appContext/appContext";
import {
  updateEventAsync,
  refreshEvents,
  updateReminderAsync,
  deleteEventAsync,
} from "../../../redux/slices/calendarSlice";
import ReminderModal from "./ReminderModal";
import "./Calendar.css";

const EventList = ({ onEventSelect }) => {
  const { themeMode } = useTheme();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const checkReminders = useCallback(() => {
    const now = moment();
    events.forEach((event) => {
      if (event.reminder) {
        const reminderTime = moment(event.reminder);
        const eventStart = moment(event.start);
        if (now.isSameOrAfter(reminderTime) && now.isBefore(eventStart)) {
          const duration = moment.duration(eventStart.diff(now));
          const minutes = Math.round(duration.asMinutes());
          toast.info(
            `Reminder: "${event.title}" starts in ${minutes} minutes!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
      }
    });
  }, [events]);

  useEffect(() => {
    const reminderInterval = setInterval(checkReminders, 60000);
    return () => clearInterval(reminderInterval);
  }, [checkReminders]);

  const handleReminderClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowReminderModal(true);
  };

  const handleReminderSave = async (reminderTime) => {
    try {
      await dispatch(
        updateReminderAsync({ id: selectedEvent.$id, reminder: reminderTime })
      ).unwrap();
      dispatch(refreshEvents());
      setShowReminderModal(false);
      toast.success("Reminder set successfully!");
    } catch (error) {
      console.error("Failed to update reminder:", error);
      toast.error("Failed to set reminder. Please try again.");
    }
  };

  const formatDuration = (start, end) => {
    const duration = moment.duration(moment(end).diff(moment(start)));
    return `${duration.hours()}h ${duration.minutes()}m`;
  };

  const handleEventClick = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const toggleEventComplete = async (event) => {
    try {
      await dispatch(
        updateEventAsync({ id: event.$id, isCompleted: !event.isCompleted })
      ).unwrap();
      dispatch(refreshEvents());
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Failed to update event status. Please try again.");
    }
  };

  const toggleEventUrgent = async (event) => {
    try {
      await dispatch(
        updateEventAsync({ id: event.$id, isUrgent: !event.isUrgent })
      ).unwrap();
      dispatch(refreshEvents());
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Failed to update event urgency. Please try again.");
    }
  };

  const handleEventDelete = async (eventId) => {
    try {
      await dispatch(deleteEventAsync(eventId)).unwrap();
      dispatch(refreshEvents());
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const totalEvents = events.length;
  const completedEvents = events.filter((event) => event.isCompleted).length;
  const urgentEvents = events.filter((event) => event.isUrgent).length;
  const activeEvents = totalEvents - completedEvents;
  const completedPercentage =
    Math.round((completedEvents / totalEvents) * 100) || 0;

  const StatComponent = ({ icon: Icon, value, label, className }) => (
    <div className="stat-item">
      <Icon className={`stat-icon ${className}`} />
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );

  const StatComponents = () => (
    <div className="stats-container">
      <StatComponent
        icon={GoTasklist}
        value={totalEvents}
        label="Total"
        className="completed"
      />
      <StatComponent
        icon={FaRegCircle}
        value={activeEvents}
        label="Active"
        className="active"
      />
      <StatComponent
        icon={TbUrgent}
        value={urgentEvents}
        label="Urgent"
        className="urgent"
      />
      <div className="stat-bar">
        <div className="circular-progress-container">
          <div className="circular-progress">
            <svg viewBox="0 0 100 100" width="120" height="120">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * completedPercentage) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="percentage-text">
              <span className="percentage">{completedPercentage}%</span>
              <span className="performance">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EventItem = ({ event }) => {
    const isExpanded = expandedEvent === event.$id;

    return (
      <li
        className={`event-item ${isExpanded ? "expanded" : ""} ${
          event.isCompleted ? "completed" : ""
        } ${event.isUrgent ? "urgent" : ""} ${
          themeMode === "dark" ? "dark" : "light"
        }`}
        onClick={() => handleEventClick(event.$id)}
        style={{
          height: isExpanded ? "auto" : "4rem",
          overflow: "hidden",
          transition: "height 0.3s ease-in-out",
          opacity: event.isCompleted ? 0.6 : 1,
          borderLeft: event.isUrgent ? "4px solid red" : "none",
        }}>
        <EventHeader event={event} />
        {isExpanded && <ExpandedEventContent event={event} />}
      </li>
    );
  };

  const EventHeader = ({ event }) => (
    <div className="event-header">
      <h3
        className="event-title"
        style={{
          textDecoration: event.isCompleted ? "line-through" : "none",
        }}>
        {event.title}
      </h3>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="more-options-btn"
          aria-label="More options">
          {event.isUrgent ? (
            <TbUrgent className="text-red-500" />
          ) : (
            <PiHourglassLowFill />
          )}
        </button>
        <button type="button">
          {event.isCompleted
            ? event.status === "active" && (
                <HiOutlineStatusOffline className="text-gray-500" />
              )
            : event.status && (
                <HiOutlineStatusOnline className="text-green-500" />
              )}
        </button>
      </div>
    </div>
  );

  const ExpandedEventContent = ({ event }) => (
    <>
      <div className="event-category">
        <strong>{event.category}</strong>
      </div>
      <div className="event-description">
        <strong>Description:</strong>
        <p className="max-w-xs text-wrap">{event.description}</p>
      </div>
      <div className="event-time">
        <div>
          <strong>Start:</strong> {moment(event.start).format("LT")}
        </div>
        <div>
          <strong>End:</strong> {moment(event.end).format("LT")}
        </div>
      </div>
      <div className="event-location">
        <strong>Location:</strong> {event.location}
      </div>
      <div className="event-duration">
        <strong>Duration:</strong> {formatDuration(event.start, event.end)}
      </div>
      <div className="event-repeat">
        <strong>Repeats:</strong> {event.repeatOption}
      </div>
      <div className="event-timestamps">
        <p>Created: {moment(event.created_at).format("LL")}</p>
        <p>Reminder: {moment(event.reminder).format("hh:mm a") || "Not set"}</p>
      </div>
      <EventActions event={event} />
    </>
  );

  const EventActions = ({ event }) => (
    <div className="event-actions">
      <ActionButton
        icon={MdDelete}
        onClick={(e) => {
          e.stopPropagation();
          handleEventDelete(event.$id);
        }}
        ariaLabel="Delete event"
        className="delete"
      />
      <ActionButton
        icon={BiEdit}
        onClick={(e) => {
          e.stopPropagation();
          onEventSelect(event);
        }}
        ariaLabel="Edit event"
        className="edit"
      />
      <ActionButton
        icon={event.isCompleted ? FaCheckCircle : FaRegCircle}
        onClick={(e) => {
          e.stopPropagation();
          toggleEventComplete(event);
        }}
        ariaLabel={
          event.isCompleted ? "Mark as incomplete" : "Mark as complete"
        }
        className={`complete ${event.isCompleted ? "completed" : ""}`}
      />
      <ActionButton
        icon={MdOutlineTimer}
        onClick={(e) => handleReminderClick(event, e)}
        ariaLabel="Set reminder"
        className="reminder"
      />
      <ActionButton
        icon={event.isUrgent ? FaCheckCircle : FaRegCircle}
        onClick={(e) => {
          e.stopPropagation();
          toggleEventUrgent(event);
        }}
        ariaLabel={event.isUrgent ? "Remove urgent" : "Mark as urgent"}
        className={`urgent ${event.isUrgent ? "urgent" : ""}`}
      />
    </div>
  );

  const ActionButton = ({ icon: Icon, onClick, ariaLabel, className }) => (
    <button
      className={`action-btn ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}>
      <Icon />
    </button>
  );

  return (
    <>
      <ul className={`event--list ${themeMode}`}>
        <StatComponents />
        {events.map((event) => (
          <EventItem key={event.$id} event={event} />
        ))}
      </ul>
      {showReminderModal && (
        <ReminderModal
          event={selectedEvent}
          onSave={handleReminderSave}
          onClose={() => setShowReminderModal(false)}
        />
      )}
    </>
  );
};

EventList.propTypes = {
  onEventSelect: PropTypes.func.isRequired,
};

export default EventList;
