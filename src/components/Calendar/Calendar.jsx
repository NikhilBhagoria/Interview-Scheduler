import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from 'date-fns';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUserTimeZone } from '../../utils/helpers';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarWrapper = styled.div`
  height: calc(100vh - 100px);
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TimeZoneHeader = styled.div`
  margin-bottom: 1.5rem;
  flex-shrink: 0;
  font-size: 1.1rem;
  color: #2c3e50;
  
  strong {
    color: #1a73e8;
  }
`;

const CalendarContainer = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;

  .rbc-calendar {
    height: 100% !important;
  }

  /* Header styling */
  .rbc-toolbar {
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 8px;

    .rbc-toolbar-label {
      font-weight: 600;
      font-size: 1.2rem;
      color: #2c3e50;
    }
  }

  /* Button styling */
  .rbc-btn-group {
    button {
      padding: 8px 16px;
      background: white;
      color: #1a73e8;
      border: 1px solid #1a73e8;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s ease;
      margin: 0 2px;

      &:hover {
        background: #1a73e8;
        color: white;
      }

      &.rbc-active {
        background: #1a73e8;
        color: white;
        box-shadow: none;
      }
    }
  }

  /* Event styling */
  .rbc-event {
    background-color: #1a73e8;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 0.9rem;
    border: none;

    &:hover {
      background-color: #1557b0;
    }
  }

  /* Calendar grid styling */
  .rbc-month-view {
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }

  .rbc-header {
    padding: 12px 4px;
    font-weight: 600;
    color: #2c3e50;
    background: #f8f9fa;
  }

  .rbc-date-cell {
    padding: 4px 8px;
    font-weight: 500;
    color: #2c3e50;
  }

  .rbc-today {
    background-color: #f0f7ff;
  }

  /* Week/Day view styling */
  .rbc-time-view {
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }

  .rbc-time-header {
    background: #f8f9fa;
  }

  .rbc-time-content {
    border-top: 1px solid #e0e0e0;
  }

  /* Agenda view styling */
  .rbc-agenda-view {
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    background: white;

    table.rbc-agenda-table {
      border: none;
      width: 100%;
      
      thead {
        background: #f0f7ff;

        tr {
          border-bottom: 2px solid #e0e0e0;
        }

        th {
          padding: 16px;
          font-weight: 600;
          color: #1a73e8;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          border-bottom: none;
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #e8eaed;
          transition: background-color 0.2s ease;
          background-color: white;

          &:hover {
            background-color: #f8f9fa;
          }

          &:last-child {
            border-bottom: none;
          }
        }

        td {
          padding: 16px;
          color: #3c4043;
          font-size: 0.95rem;

          &.rbc-agenda-date-cell {
            font-weight: 600;
            color: #1a73e8;
            width: 140px;
            background-color: #f8fafe;
          }

          &.rbc-agenda-time-cell {
            width: 160px;
            color: #5f6368;
            background-color: #fafafa;
          }

          &.rbc-agenda-event-cell {
            font-weight: 500;
            background-color: white;
            
            .rbc-event-content {
              display: flex;
              align-items: center;
              gap: 8px;
              color: #1a73e8;
            }
          }
        }
      }
    }

    .rbc-agenda-empty {
      padding: 24px;
      text-align: center;
      color: #5f6368;
      font-size: 1rem;
      background-color: #f8f9fa;
    }

    .rbc-event {
      background-color: transparent;
      color: inherit;
      border: none;
      padding: 0;
      
      &:hover {
        background-color: transparent;
      }
    }
  }

  @media (max-width: 768px) {
    .rbc-calendar {
      font-size: 14px;
    }

    /* Improve event display on mobile */
    .rbc-event {
      min-height: 20px;
      padding: 2px 4px;
      font-size: 12px;
      margin: 1px 0;
      
      /* Prevent text overflow */
      .rbc-event-content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }
    }

    /* Fix overlapping events in month view */
    .rbc-month-view {
      .rbc-row-segment {
        padding: 0 1px;
        
        .rbc-event-content {
          width: 100%;
          flex: none;
        }
      }

      .rbc-row {
        min-height: 30px;
      }

      /* Handle multiple events in a day cell */
      .rbc-events-container {
        margin-right: 0;
      }
    }

    /* Improve day/week view on mobile */
    .rbc-time-view {
      .rbc-time-content {
        .rbc-event {
          border-radius: 3px;
          
          .rbc-event-content {
            padding: 2px;
          }
        }
      }

      .rbc-time-header-content {
        .rbc-event {
          min-height: auto;
        }
      }
    }

    /* Fix agenda view on mobile */
    .rbc-agenda-view {
      table.rbc-agenda-table {
        tbody tr {
          td {
            padding: 8px;
            font-size: 12px;
            
            &.rbc-agenda-date-cell {
              width: 60px;
            }
            
            &.rbc-agenda-time-cell {
              width: 80px;
            }
            
            &.rbc-agenda-event-cell {
              .rbc-event-content {
                white-space: normal; /* Allow text wrapping */
                word-break: break-word;
              }
            }
          }
        }
      }
    }

    /* Improve toolbar responsiveness */
    .rbc-toolbar {
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px;
      
      .rbc-toolbar-label {
        width: 100%;
        text-align: center;
        order: -1;
      }
      
      .rbc-btn-group {
        flex: 1;
        justify-content: center;
        
        button {
          padding: 4px 8px;
          font-size: 12px;
        }
      }
    }
  }
`;

const Calendar = () => {
  const interviews = useSelector((state) => state.interviews.interviews);
  const userTimeZone = getUserTimeZone();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const events = interviews.map((interview) => {
    const start = new Date(interview.dateTime);
    const end = new Date(new Date(interview.dateTime).setHours(start.getHours() + 1));

    return {
      id: interview.id,
      title: `${interview.candidateName} - ${interview.type}`,
      start,
      end,
      tooltip: `Time Zone: ${interview.timeZone}`,
    };
  });

  const eventPropGetter = (event, start, end, isSelected) => ({
    style: {
      backgroundColor: currentView === 'agenda' ? 'transparent' : '#1a73e8',
      color: currentView === 'agenda' ? 'inherit' : 'white',
      fontSize: window.innerWidth <= 768 ? '12px' : '14px',
      padding: window.innerWidth <= 768 ? '2px 4px' : '4px 8px',
    },
  });

  const handleNavigate = (newDate, view, action) => {
    if (action === 'TODAY') {
      setCurrentDate(new Date());
    } else if (action === 'PREV') {
      setCurrentDate(new Date(newDate));
    } else if (action === 'NEXT') {
      setCurrentDate(new Date(newDate));
    } else {
      setCurrentDate(new Date(newDate));
    }
  };

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  return (
    <CalendarWrapper>
      <TimeZoneHeader>
        <strong>Your Time Zone: </strong> {userTimeZone}
      </TimeZoneHeader>
      <CalendarContainer>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          tooltipAccessor="tooltip"
          date={currentDate}
          view={currentView}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          views={['month', 'week', 'day', 'agenda']}
          popup
        />
      </CalendarContainer>
    </CalendarWrapper>
  );
};

export default Calendar; 