import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { addInterview, updateInterview } from '../../store/interviewSlice';
import { timeZones, formatToTimeZone, convertToUTC, getUserTimeZone } from '../../utils/helpers';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 32px auto;
  padding: 32px 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const FormTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;

  &:hover {
    background-color: #2c5282;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const InterviewForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const interviews = useSelector((state) => state.interviews.interviews);
    const interviewers = useSelector((state) => state.interviews.interviewers);
    const interviewTypes = useSelector((state) => state.interviews.interviewTypes);

    const [formData, setFormData] = useState({
        candidateName: '',
        interviewerId: '',
        dateTime: '',
        type: '',
        timeZone: getUserTimeZone(),
    });

    useEffect(() => {
        if (id) {
            const interview = interviews.find((i) => i.id === parseInt(id));
            if (interview) {
                setFormData({
                    ...interview,
                    dateTime: new Date(interview.dateTime).toISOString().slice(0, 16),
                });
            }
        }
    }, [id, interviews]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.candidateName || !formData.interviewerId || !formData.dateTime || !formData.type || !formData.timeZone) {
            toast.error('Please fill in all fields');
            return;
        }

        const utcDateTime = convertToUTC(formData.dateTime, formData.timeZone);

        const isConflict = interviews.some((interview) => {
            if (id && interview.id === parseInt(id)) return false;
            return (
                interview.interviewerId === formData.interviewerId &&
                new Date(interview.dateTime).getTime() === utcDateTime.getTime()
            );
        });

        if (isConflict) {
            toast.error('Interview time slot is already booked for this interviewer');
            return;
        }

        const interviewData = {
            ...formData,
            dateTime: utcDateTime.toISOString(),
        };

        if (id) {
            dispatch(updateInterview({ ...interviewData, id: parseInt(id) }));
            toast.success('Interview updated successfully');
        } else {
            dispatch(addInterview({ ...interviewData, id: Date.now() }));
            toast.success('Interview scheduled successfully');
        }

        navigate('/');
    };

    return (
        <FormWrapper>
            <FormTitle>{id ? 'Edit Interview' : 'Schedule Interview'}</FormTitle>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Candidate Name</Label>
                    <Input
                        type="text"
                        placeholder="Enter candidate's full name"
                        value={formData.candidateName}
                        onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Interviewer</Label>
                    <Select
                        value={formData.interviewerId}
                        onChange={(e) => setFormData({ ...formData, interviewerId: e.target.value })}
                    >
                        <option value="">Select Interviewer</option>
                        {interviewers.map((interviewer) => (
                            <option key={interviewer.id} value={interviewer.id}>
                                {interviewer.name}
                            </option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Date and Time</Label>
                    <Input
                        type="datetime-local"
                        value={formData.dateTime}
                        onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Interview Type</Label>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="">Select Interview Type</option>
                        {interviewTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Time Zone</Label>
                    <Select
                        value={formData.timeZone}
                        onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                    >
                        <option value="">Select Time Zone</option>
                        {timeZones.map((zone) => (
                            <option key={zone} value={zone}>
                                {zone}
                            </option>
                        ))}
                    </Select>
                </FormGroup>

                <Button type="submit">
                    {id ? 'Update Interview' : 'Schedule Interview'}
                </Button>
            </Form>
        </FormWrapper>
    );
};

export default InterviewForm; 