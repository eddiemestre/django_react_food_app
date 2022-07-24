import React, {useState, useContext, useEffect } from "react";
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
    GridContainer,
    DeleteReview,
    FieldDetailText } from './Styles.js';

import "react-datepicker/dist/react-datepicker.css";
import ToggleSwitch from "../ToggleSwitch/index.js";
import ReviewContent from "../ReviewContent/index.js";
import './datepicker.scss';
import { useTransition } from '@react-spring/web';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext.js";
import useAuth from "../../hooks/useAuth.js";
import { formatDate } from "../../utils/FormatDate.js";

const EditReviewModule = ({ setInputHasChanged, inputHasChanged, setDiscardModal, setDiscardType, review }) => {
    // hooks
    const { auth } = useAuth();
    const params = useParams();
    const { reviews, setReviews } = useContext(DataContext)
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // state
    const [writeReviewModal, setWriteReviewModal] = useState(false);

    const [dateValue, setDateValue] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');

    const [originalPrivateValue, setOriginalPrivateValue] = useState(false)
    const [originalReviewTitle, setOriginalReviewTitle] = useState('')
    const [originalReviewContent, setOriginalReviewContent] = useState('')
    const [originalDate, setOriginalDate] = useState('')


    useEffect(() => {
        console.log("this is teh review", review)
        if (review?.title) {
            setDateValue(review.date)
            setIsPrivate(review.private)
            setStartDate(review.date)
            setReviewContent(review.review)
            setReviewTitle(review.title)

            setOriginalPrivateValue(review.private)
            setOriginalDate(review.date)
            setOriginalReviewContent(review.review)
            setOriginalReviewTitle(review.title)
        }
    }, [review])

    const checkPrivate = () => {
        if (isPrivate) {
            return "Visible only to you";
        } else {
            return "Visible to all";
        }
    }

    const onChange = () => {
        setInputHasChanged(true)
    }

    const onChangeDate = (date) => {
        if (date) {
            const offset = date.getTimezoneOffset();
            let formattedDate = new Date(date.getTime() - (offset*60*1000))
            // formattedDate = formattedDate.toISOString().split('T')[0]

            // setDateValue(formattedDate)
            setDateValue(formattedDate)
            setStartDate(date)
            onChange()
        } else {
            setStartDate(null)
            setDateValue(null)
        }
    }

    const onThoughtsClick = () => {
        setWriteReviewModal(true);
        onChange();
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
        onChange()
    }


    const UpdateReview = async () => {
        console.log("update review")
        var data = {}
        if (originalReviewTitle !== reviewTitle) {
            console.log("title is different")
            data["title"] = reviewTitle
        }
        if (originalDate !== dateValue) {
            console.log("date is different")
            data["date"] = dateValue
        }
        if (originalReviewContent !== reviewContent) {
            console.log("content is different")
            data["review"] = reviewContent
        }
        if (originalPrivateValue !== isPrivate) {
            console.log("private is different")
            data["private"] = isPrivate
        }

        // if changes aren't different, return before patching
        if (Object.keys(data).length === 0) {
            console.log("no changes to commit");
            return;
        }

        // console.log("data", data)
        // can send title, date, review, private
        try {
            let response;
                // post review with all fields
                response = await axiosPrivate.patch(`/reviews/auth_reviews/${params.id}/`, 
                    JSON.stringify(data),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                    }
                );
            console.log("edited", response?.data)

            // update state with amended review data
            const updatedState = reviews.map(review => {
                if (review.id === response?.data?.id) {
                    return {...review,
                    title: response?.data?.title,
                    review: response?.data.review,
                    date: response?.data?.date,
                    date_modified: response?.data?.date_modified,
                    private: response?.data?.private
                    }
                }
                return review;
            });

            setReviews(updatedState)



        } catch (err) {
            console.log(err);
        }
    }

    const CleanUpVariables = () => {
        setInputHasChanged(false)

        setDateValue('');
        setIsPrivate(false);
        setStartDate(null);
        setReviewContent('');
        setReviewTitle('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (inputHasChanged) {
            console.log("changes made")
            UpdateReview()
        }

        CleanUpVariables();
        navigate(`/user/${auth?.username}/${params.id}`)
    }

    const formatUTC = (dateInt, addOffset = true) => {
        let date = (!dateInt || dateInt.length < 1) ? new Date() : new Date(dateInt);
        if (typeof dateInt === "string") {
            // console.log("formatUTC date", date)
            return date;
        } else {
            const offset = addOffset ? date.getTimezoneOffset() : -(date.getTimezoneOffset());
            const offsetDate = new Date();
            offsetDate.setTime(date.getTime() + offset * 60000)
            // console.log("formatUTC offset", offsetDate)
            return offsetDate;
        }
    }


    const ClickToDelete = () => {
        setDiscardType("delete")
        setDiscardModal(true)
    }

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
                        selected={startDate ? formatUTC(new Date(startDate)) : null}
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
                    <FieldDetailText>Last edited on {formatDate(review?.date_modified)}</FieldDetailText>
                    <InputTitle>Make Private?</InputTitle>
                    <SwitchContainer>
                        <ToggleSwitch label="label" isPrivate={isPrivate} setIsPrivate={setIsPrivate} setInputHasChanged={setInputHasChanged}/>
                    </SwitchContainer>
                    <VisibilityToggle>{checkPrivate()}</VisibilityToggle>
                    <br/>
                    <DeleteReview onClick={() => ClickToDelete()}>Delete this review</DeleteReview>
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

export default EditReviewModule;