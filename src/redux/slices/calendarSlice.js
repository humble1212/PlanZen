import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../appwrite/config";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const events = await service.getEvents();
      return events;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEventAsync = createAsyncThunk(
  "events/addEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const newEvent = await service.createEvent(eventData);
      return newEvent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventAsync = createAsyncThunk(
  "events/updateEvent",
  async ({ id, ...eventData }, { rejectWithValue }) => {
    try {
      const updatedEvent = await service.updateEvent(id, eventData);
      return updatedEvent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await service.deleteEvent(eventId);
      return eventId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a new async thunk for updating reminders
export const updateReminderAsync = createAsyncThunk(
  "events/updateReminder",
  async ({ id, reminder }, { rejectWithValue }) => {
    try {
      const updatedEvent = await service.updateEvent(id, { reminder });
      return updatedEvent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// In the extraReducers section, add a new case:

const eventSlice = createSlice({
  name: "events",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Add event
    addEvent: (state, action) => {
      state.items.push(action.payload);
    },
    refreshEvents: (state) => {
      state.lastUpdate = Date.now();
    },
    // Remove event
    removeEvent: (state, action) => {
      const index = state.items.findIndex(
        (event) => event.id === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    // Update event
    updateEvent: (state, action) => {
      const index = state.items.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    // Clear events
    clearEvents: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateReminderAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (event) => event.$id === action.payload.$id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const {
  addEvent,
  removeEvent,
  updateEvent,
  clearEvents,
  refreshEvents,
} = eventSlice.actions;

export default eventSlice.reducer;
