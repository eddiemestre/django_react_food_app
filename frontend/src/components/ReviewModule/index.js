import React, {useState, Component} from "react";
import { DetailsContainer, Head, AddSpot, Save, InputTitle, InputText, DateText, LargeInputText, FieldDetailText, DatePick, InsideContainer } from './Styles.js';

import "react-datepicker/dist/react-datepicker.css";
import ToggleSwitch from "../ToggleSwitch/index.js";
import './datepicker.scss';


const ReviewModule = () => {
    const [showDateModule, setShowDateModule] = useState(false)
    const [writeReviewModal, setWriteReviewModal] = useState(false)
    const [dateValue, setDateValue] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [startDate, setStartDate] = useState(null);
    
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

    return (
        <DetailsContainer>
            <Head>
                <AddSpot>Add A Spot</AddSpot>
                <Save>Save</Save>
            </Head>
            <InputTitle>I Went To</InputTitle>
            <InputText placeholder="restaurant, cafe, bar..." type="text" name="uname" required />
            <InputTitle>On</InputTitle>
            <DatePick
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                maxDate={(new Date())}
                locale="en-US"
                dateFormat="MMM d, yyyy"
                isClearable
                placeholderText="enter date..."
                calendarClassName="datepicker"
            />
            {/* <DateText type="date" name="udate" placeholder="enter date..." /> */}
            {/* <DateText type="text" name="udate" placeholder="enter date..."  value={dateValue} readOnly="readOnly" inputMode="none" onClick={() => setVals()} onBlur={() => setShowDateModule(false)} /> */}
            {/* <DatePickerModule showModule={showDateModule}/> */}
            <InputTitle>My Thoughts</InputTitle>
            <LargeInputText placeholder= "add review..." type="text" name="review" onClick={() => setWriteReviewModal(true)}/>
            <FieldDetailText>Last edited on March 26th, 2022</FieldDetailText>
            <InputTitle>Make Private?</InputTitle>
            <ToggleSwitch label="label" setIsPrivate={setIsPrivate}/>
            <FieldDetailText>{checkPrivate()}</FieldDetailText>
        </DetailsContainer>
    );
};

export default ReviewModule;