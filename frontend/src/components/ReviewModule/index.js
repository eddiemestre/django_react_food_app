import React, {useState, Component} from "react";
import { DetailsContainer, 
    Head, 
    AddSpot, 
    Save, 
    InputTitle, 
    InputText, 
    VisibilityToggle, 
    LargeInputText, 
    FieldDetailText, 
    DatePick, 
    SwitchContainer, 
    InsideContainer,
    ContentContainer, 
    FadeText } from './Styles.js';

import "react-datepicker/dist/react-datepicker.css";
import ToggleSwitch from "../ToggleSwitch/index.js";
import ReviewContent from "../ReviewContent/index.js";
import './datepicker.scss';
import { useTransition, animated } from '@react-spring/web';


const ReviewModule = (props) => {
    const [showDateModule, setShowDateModule] = useState(false);
    const [writeReviewModal, setWriteReviewModal] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    
    const setVals = () => {
        setShowDateModule(!showDateModule);
        setDateValue("May 7, 2022");
    }

    const onChan = () => {
        console.log(isPrivate)
    }

    const checkPrivate = () => {
        if (isPrivate) {
            return "Visible only to you";
        } else {
            return "Visible to all";
        }
    }

    const onChange = () => {
        props.hasChanged(true)
        console.log("input has changed set to true")
    }

    const onChangeDate = (date) => {
        setStartDate(date)
        onChange()
    }

    // short lived, will be replaced by the new modal
    const onThoughtsClick = () => {
        setWriteReviewModal(true)
        console.log("write review modal", writeReviewModal)
        onChange()
    }

    const slideAnimation = useTransition(writeReviewModal,  {
        from: {y: 1000},
        enter: {y: 0},
        leave: {y: 1000},
    });

    const saveReview = () => {
        // save data
        setWriteReviewModal(false)
    }

    const onTitleChange = (event) => {
        setReviewTitle(event.target.value);
        console.log(reviewTitle);
    }

    return (
        <DetailsContainer>
            <Head>
                <AddSpot>Add A Spot</AddSpot>
                <Save>Save</Save>
            </Head>
            <InsideContainer>
                <InputTitle>I Went To</InputTitle>
                <InputText placeholder="restaurant, cafe, bar..." type="text" name="uname" onChange={onTitleChange} required />
                <InputTitle>On</InputTitle>
                <DatePick
                    selected={startDate}
                    onChange={(date) => onChangeDate(date)}
                    maxDate={(new Date())}
                    // locale="en-US"
                    dateFormat="MMM d, yyyy"
                    isClearable
                    placeholderText="enter date..."
                    calendarClassName="datepicker"
                />
                <InputTitle>My Thoughts</InputTitle>
                <LargeInputText placeholder= "add review..." type="text" name="review" value={reviewContent} onClick={onThoughtsClick} readOnly="readOnly">
                </LargeInputText>
                <FieldDetailText>Last edited on March 26th, 2022</FieldDetailText>
                <InputTitle>Make Private?</InputTitle>
                <SwitchContainer>
                    <ToggleSwitch label="label" setIsPrivate={setIsPrivate} change={props.hasChanged}/>
                </SwitchContainer>
                <VisibilityToggle>{checkPrivate()}</VisibilityToggle>
                <br/><br/><br/><br/><br/>
                </InsideContainer>
                {slideAnimation((style, item) => 
                item ? <ContentContainer style={style}><ReviewContent saveReview={saveReview} setReview={setReviewContent} title={reviewTitle} editTitle={onTitleChange} review={reviewContent}></ReviewContent></ContentContainer> : ''
        )}
        </DetailsContainer>

    );
};

export default ReviewModule;