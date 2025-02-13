import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { deleteInterview } from '../../store/interviewSlice';
import { toast } from 'react-toastify';
import { formatToTimeZone, getUserTimeZone } from '../../utils/helpers';

const DashboardWrapper = styled.div`
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fd;
  min-height: 100vh;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  
  h1 {
    font-size: 1.8rem;
    color: #2d3748;
    margin: 0;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    h1 {
      font-size: 2.2rem;
    }
  }
`;

const InterviewCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  h3 {
    color: #2d3748;
    font-size: 1.15rem;
    margin: 0 0 8px 0;
    font-weight: 600;
  }

  p {
    color: #4a5568;
    margin: 6px 0;
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    margin-bottom: 20px;

    h3 {
      font-size: 1.25rem;
      margin: 0 0 12px 0;
    }

    p {
      margin: 8px 0;
      font-size: 0.95rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;

  @media (min-width: 768px) {
    width: auto;
    gap: 12px;
  }
`;

const ScheduleButton = styled.button`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  width: 100%;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
  }

  @media (min-width: 768px) {
    width: auto;
    padding: 12px 24px;
    font-size: 1rem;
  }
`;

const ActionButton = styled.button`
  background-color: ${({ variant }) =>
        variant === 'danger' ? '#FF5A5F' : '#4299e1'};
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    flex: none;
    padding: 8px 16px;
  }
`;

const InterviewType = styled.span`
  background: ${({ type }) => {
        switch (type.toLowerCase()) {
            case 'hr':
                return '#E6FFFA';
            case 'technical':
                return '#EBF8FF';
            case 'behavioral':
                return '#FEF3C7';
            default:
                return '#E2E8F0';
        }
    }};
  color: ${({ type }) => {
        switch (type.toLowerCase()) {
            case 'hr':
                return '#319795';
            case 'technical':
                return '#3182CE';
            case 'behavioral':
                return '#D97706';
            default:
                return '#4A5568';
        }
    }};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Dashboard = () => {
    const interviews = useSelector((state) => state.interviews.interviews);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userTimeZone = getUserTimeZone();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [interviewToDelete, setInterviewToDelete] = useState(null);

    const handleDeleteClick = (interview) => {
        setInterviewToDelete(interview);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (interviewToDelete) {
            dispatch(deleteInterview(interviewToDelete.id));
            toast.success('Interview deleted successfully');
        }
        setShowConfirmation(false);
        setInterviewToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setInterviewToDelete(null);
    };

    return (
        <DashboardWrapper>
            <Header>
                <h1>Interview Dashboard</h1>
                <ScheduleButton onClick={() => navigate('/schedule')}>
                    Schedule New Interview
                </ScheduleButton>
            </Header>

            {interviews.map((interview) => (
                <InterviewCard key={interview.id}>
                    <div>
                        <h3>{interview.candidateName}</h3>
                        <InterviewType type={interview.type}>
                            {interview.type}
                        </InterviewType>
                        <p>Date: {formatToTimeZone(interview.dateTime, userTimeZone)}</p>
                        <p>Time Zone: {interview.timeZone}</p>
                    </div>
                    <ButtonGroup>
                        <ActionButton onClick={() => navigate(`/edit/${interview.id}`)}>
                            Edit
                        </ActionButton>
                        <ActionButton
                            variant="danger"
                            onClick={() => handleDeleteClick(interview)}
                        >
                            Delete
                        </ActionButton>
                    </ButtonGroup>
                </InterviewCard>
            ))}

            {showConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-dialog">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this interview?</p>
                        <div className="confirmation-buttons">
                            <button
                                onClick={handleConfirmDelete}
                                className="confirm-btn"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardWrapper>
    );
};

export default Dashboard; 