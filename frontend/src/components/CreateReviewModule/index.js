import React, {useState, useContext } from "react";
import { DetailsContainer, 
    Head, 
    AddSpot, 
    Save, 
    InputTitle, 
    InputText, 
    VisibilityToggle, 
    LargeInputText, 
    DatePick, 
    SwitchContainer, 
    InsideContainer,
    ContentContainer,
    GridContainer} from './Styles.js';

import "react-datepicker/dist/react-datepicker.css";
import ToggleSwitch from "../ToggleSwitch/index.js";
import ReviewContent from "../ReviewContent/index.js";
import './datepicker.scss';
import { useTransition } from '@react-spring/web';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext.js";
import useAuth from "../../hooks/useAuth.js";

const CreateReviewModule = ({ toggleReviewOff, setReviewModuleActive, setInputHasChanged }) => {

    const { auth } = useAuth();
    const { reviews, setReviews } = useContext(DataContext)
    const [writeReviewModal, setWriteReviewModal] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const checkPrivate = () => {
        if (isPrivate) {
            return "Visible only to you";
        } else {
            return "Visible to all";
        }
    }

    const onChange = () => {
        setInputHasChanged(true)
        // // console.log("input has changed set to true")
    }

    const onChangeDate = (date) => {

        // console.log("date", date)
        // we need this to always give us the user time zone date
        // do we need to ensure the time is sent to the backend as well?
        if (date) {
            setDateValue(date)
            setStartDate(date)
        } else {
            setDateValue(null)
            setStartDate(null)
        }
        onChange();
        // if (date) {
        //     const offset = date.getTimezoneOffset();
        //     let formattedDate = new Date(date.getTime() - (offset*60*1000))
        //     setDateValue(formattedDate)
        //     setStartDate(date)
        //     onChange()
        // } else {
        //     setStartDate(null)
        //     setDateValue(null)
        // }
    }

    const onThoughtsClick = () => {
        setWriteReviewModal(true);
        // // console.log("write review modal", writeReviewModal)
        onChange();
    }

    const slideAnimation = useTransition(writeReviewModal,  {
        from: {y: 1000},
        enter: {y: 0},
        leave: {y: 1000},
    });

    const saveReview = () => {
        setWriteReviewModal(false)
    }

    const onTitleChange = (event) => {
        setReviewTitle(event.target.value);
        // console.log(reviewTitle);
        onChange()
    }

    const SaveNewReview = async () => {
        try {
            let response;
            let reviewToSave = {
                title: reviewTitle,
                review: reviewContent,
                private: isPrivate,
                user: auth?.user_id
            }
            if (startDate) {
                // console.log("has date")
                reviewToSave['date'] = dateValue
                // post review with all fields
                // add review to reviews data context
                response = await axiosPrivate.post('/reviews/review/', 
                    JSON.stringify(reviewToSave),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                    }
                );
            } else {
                // start date is empty
                // console.log("no date")
                response = await axiosPrivate.post('/reviews/review/', 
                JSON.stringify(reviewToSave),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                    }
                );
            }

            // // console.log("in response post review", response)

            // sort reviews by date and alphabetical order
            const allReviews = [...reviews, response.data];
            allReviews.sort((a, b) =>  (a.date===null)-(b.date===null) || new Date(b.date) - new Date(a.date) || a.title.localeCompare(b.title))
            setReviews(allReviews)
            // console.log(allReviews)
            
        } catch (err) {
            // // console.log("in error review module")
            // console.log(err);
        }
    }


    const CleanUpVariables = () => {
        setReviewModuleActive(false);
        setInputHasChanged(false)
        toggleReviewOff()
        setDateValue('');
        setIsPrivate(false);
        setStartDate(null);
        setReviewContent('');
        setReviewTitle('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        SaveNewReview();
        CleanUpVariables();
        navigate(`/user/${auth?.username}`)
    }

    // const formatUTC = (dateInt, addOffset = true) => {
    //     let date = (!dateInt || dateInt.length < 1) ? new Date() : new Date(dateInt);
    //     if (typeof dateInt === "string") {
    //         // // console.log("formatUTC date", date)
    //         return date;
    //     } else {
    //         const offset = addOffset ? date.getTimezoneOffset() : -(date.getTimezoneOffset());
    //         const offsetDate = new Date();
    //         offsetDate.setTime(date.getTime() + offset * 60000)
    //         // // console.log("formatUTC offset", offsetDate)
    //         return offsetDate;
    //     }
    // }


    return (
        <DetailsContainer>
            <form onSubmit={handleSubmit}>
                <GridContainer>
                <Head>
                    <AddSpot>Add A Spot</AddSpot>
                    <Save>Save</Save>
                </Head>
                <InsideContainer>
                    <InputTitle>I Went To</InputTitle>
                    <InputText placeholder="restaurant, cafe, bar..." value={reviewTitle} type="text" name="uname" onChange={onTitleChange} required />
                    <InputTitle>On</InputTitle>
                    <DatePick
                        selected={startDate ? new Date(startDate) : null}
                        onChange={(date) => onChangeDate(date)}
                        maxDate={(new Date())}
                        dateFormat="MMM d, yyyy"
                        isClearable
                        placeholderText="enter date..."
                        calendarClassName="datepicker"
                    />
                    <InputTitle>My Thoughts</InputTitle>
                    <LargeInputText placeholder= "add review..." type="text" name="review" value={reviewContent} onClick={onThoughtsClick} readOnly="readOnly">
                    </LargeInputText>
                    <InputTitle>Make Private?</InputTitle>
                    <SwitchContainer>
                        <ToggleSwitch label="label" isPrivate={isPrivate} setIsPrivate={setIsPrivate} setInputHasChanged={setInputHasChanged}/>
                    </SwitchContainer>
                    <VisibilityToggle>{checkPrivate()}</VisibilityToggle>
                    <br/>
                    <br/><br/><br/><br/><br/><br/>
                </InsideContainer>
                {slideAnimation((style, item) => 
                    item ? <ContentContainer style={style}><ReviewContent saveReview={saveReview} setReview={setReviewContent} title={reviewTitle} editTitle={onTitleChange} review={reviewContent}></ReviewContent></ContentContainer> : ''
                )}
                </GridContainer>
            </form>
        </DetailsContainer>
    );
};

export default CreateReviewModule;