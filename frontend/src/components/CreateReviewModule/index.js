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
    // const [showDateModule, setShowDateModule] = useState(false);
    const [writeReviewModal, setWriteReviewModal] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    // const [editReview, setEditReview] = useState(false)
    // const { params } = useParams();
    // const location = useLocation();

    // const { auth } = useAuth();
    // const { reviews, setReviews } = useOutletContext();
    // const [showDateModule, setShowDateModule] = useState(false);
    // const [writeReviewModal, setWriteReviewModal] = useState(false);
    // const [dateValue, setDateValue] = useState(selectedReview.date || '');
    // const [isPrivate, setIsPrivate] = useState(selectedReview.private || false);
    // const [startDate, setStartDate] = useState(selectedReview.date);
    // const [reviewContent, setReviewContent] = useState(selectedReview.review || '');
    // const [reviewTitle, setReviewTitle] = useState(selectedReview.title || '');
    // const [editReview, setEditReview] = useState(false)
    // const [originalPrivateValue, setOriginalPrivateValue] = useState(selectedReview.private)
    // const [originalReviewTitle, setOriginalReviewTitle] = useState(selectedReview.title || '')
    // const [originalReviewContent, setOriginalReviewContent] = useState(selectedReview.review || '')
    // const [originalDate, setOriginalDate] = useState(selectedReview.date || '')
    // const { params } = useParams();
    // const location = useLocation();

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // const setVals = () => {
    //     setShowDateModule(!showDateModule);
    //     setDateValue("May 7, 2022");
    // }

    // const onChan = () => {
    //     console.log(isPrivate)
    // }

    const checkPrivate = () => {
        if (isPrivate) {
            return "Visible only to you";
        } else {
            return "Visible to all";
        }
    }

    const onChange = () => {
        setInputHasChanged(true)
        // console.log("input has changed set to true")
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

    // short lived, will be replaced by the new modal
    const onThoughtsClick = () => {
        setWriteReviewModal(true);
        // console.log("write review modal", writeReviewModal)
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
                console.log("has date")
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
                console.log("no date")
                response = await axiosPrivate.post('/reviews/review/', 
                JSON.stringify(reviewToSave),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                    }
                );
            }

            // console.log("in response post review", response)

            // sort reviews by date and alphabetical order
            const allReviews = [...reviews, response.data];
            allReviews.sort((a, b) =>  (a.date===null)-(b.date===null) || new Date(b.date) - new Date(a.date) || a.title.localeCompare(b.title))
            setReviews(allReviews)
            console.log(allReviews)
            
        } catch (err) {
            // console.log("in error review module")
            console.log(err);
        }
    }

    // const UpdateReview = async () => {
    //     console.log("update review")
    //     var data = {}
    //     if (originalReviewTitle !== reviewTitle) {
    //         // console.log("title is different")
    //         data["title"] = reviewTitle
    //     }
    //     if (originalDate !== dateValue) {
    //         // console.log("date is different")
    //         data["date"] = dateValue
    //     }
    //     if (originalReviewContent !== reviewContent) {
    //         // console.log("content is different")
    //         data["review"] = reviewContent
    //     }
    //     if (originalPrivateValue !== isPrivate) {
    //         // console.log("private is different")
    //         data["private"] = isPrivate
    //     }

    //     // console.log("data", data)
    //     // can send title, date, review, private
    //     try {
    //         let response;
    //             // post review with all fields
    //             response = await axiosPrivate.patch(`/reviews/auth_reviews/${props.urlParams["id"]}/`, 
    //                 JSON.stringify(data),
    //                 {
    //                     headers: {'Content-Type': 'application/json'},
    //                     withCredentials: true,
    //                 }
    //             );
    //         // console.log("edited", response?.data)

    //         // setSelectedReview(prevState => ({
    //         //     ...prevState,
    //         //     "title": response?.data?.title,
    //         //     "date": response?.data?.date,
    //         //     "private": response?.data?.private,
    //         //     "review": response?.data?.review,
    //         //     "date_modified": response?.data?.date_modified
    //         // }))



    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // const fetchReviewData = async (id) => {
    //     // console.log("fetch review data for review:", id)

    //     try {
    //         let response = await axiosPrivate.get(`/reviews/auth_reviews/${id}/`,
    //             {
    //                 headers: {'Content-Type': 'application/json'},
    //                 withCredentials: true,
    //             }
    //         );

    //         // console.log("response", response?.data.date)
    //         // setSelectedReview(response?.data)
            
    //         // // set values
    //         setDateValue(response?.data?.date || '');
    //         setIsPrivate(response?.data?.private || '');
    //         setStartDate(response?.data?.date || '');
    //         setReviewContent(response?.data?.review || '');
    //         setReviewTitle(response?.data?.title || '');

    //         // set comparison values
    //         // setOriginalPrivateValue(response?.data?.private || '')
    //         // setOriginalReviewTitle(response?.data?.title || '')
    //         // setOriginalReviewContent(response?.data?.review || '')
    //         // setOriginalDate(response?.data?.date || '')




    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const CleanUpVariables = () => {
        // props.setSaved(true);
        setReviewModuleActive(false);
        setInputHasChanged(false)
        toggleReviewOff()
        // if (!editReview) {
        //     toggleReviewOff();
        // }
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

        // if (!editReview) {   // this is a new review
        //     SaveNewReview();
        //     CleanUpVariables();
        //     navigate(`/user/${JSON.parse(localStorage.getItem('username'))}`)
        // } else {    // this is an edited review
        //     if (props.changed) {
        //         console.log("changes made")
        //         UpdateReview()
        //         CleanUpVariables();
        //         // setSelectedReview(prevState => ({
        //         //     ...prevState,
        //         //     "title": reviewTitle,
        //         //     "date": dateValue,
        //         //     "private": isPrivate,
        //         //     "review": reviewContent
        //         // }))
        //     }
            
        //     navigate(`/user/${props.urlParams["username"]}/${props.urlParams["id"]}`)
        // }

    //   try {
    //     let response;
    //     if (startDate) {
    //         // post review with all fields
    //         response = await axiosPrivate.post('/reviews/review/', 
    //             JSON.stringify({title: reviewTitle, date: dateValue, review: reviewContent, private: isPrivate, user: JSON.parse(localStorage.getItem('user_id'))}),
    //             {
    //                 headers: {'Content-Type': 'application/json'},
    //                 withCredentials: true,
    //             }
    //         );
    //     } else {
    //         // start date is empty
    //         response = await axiosPrivate.post('/reviews/review/', 
    //         JSON.stringify({title: reviewTitle, review: reviewContent, private: isPrivate, user: JSON.parse(localStorage.getItem('user_id'))}),
    //         {
    //             headers: {'Content-Type': 'application/json'},
    //             withCredentials: true,
    //         }
    //         );
    //     }

    //     // console.log(response);
    //     // props.setSaved(true);
    //     // props.setModuleActive(false);
    //     // props.hasChanged(false)
    //     // props.setToggle();
    //     // setDateValue('');
    //     // setIsPrivate(false);
    //     // setStartDate(null);
    //     // setReviewContent('');
    //     // setReviewTitle('');
    //     navigate(`/user/${JSON.parse(localStorage.getItem('username'))}`)

        
    //   } catch (err) {
    //     console.log(err);
    //     //   if(!err?.response) {
    //     //     setErrorMessages({name: "server", message: errors.server});
    //     //   } else if (err.response?.status === 400) {
    //     //     setErrorMessages({name: "missing", message: errors.missing});
    //     //   } else if (err.response?.status === 401) {
    //     //     setErrorMessages({name: "emailPass", message: errors.emailPass});
    //     //   } else {
    //     //     setErrorMessages({name: "failed", message: errors.failed});
    //     //   }
    //     }
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

    // useEffect(() => {
        // console.log("params in useeffect", props.urlParams)
        // console.log(location.pathname)
        // if (location.pathname === "/create-review") {
        //     setEditReview(false)
        // }
        // } else {
        //     if (selectedReview.title) { // review loaded into memory
        //         setEditReview(true)
        //         // console.log("edit review", editReview)
        //         // const date = new Date(selectedReview.date)
        //         // const tester = new Date()
        //         // console.log("test date", tester)
        //         // const test = new Date("Wed Jun 29 2022 00:00:00 GMT-0700")
        //         // console.log("test", test)
        //         // setStartDate(test.toISOString())
        //         // console.log("date", date.toISOString())
        //         // console.log("title", selectedReview.title)
        //         // setReviewTitle(selectedReview.title)
        //     } else if (props.urlParams["id"]) { // no review loaded into memory, fetch it
        //         setEditReview(true)
        //         fetchReviewData(props.urlParams["id"]);
        //     } 
        // }
        // if (selectedReview.title) { // review loaded into memory
        //     setEditReview(true)
        //     // console.log("edit review", editReview)
        //     // const date = new Date(selectedReview.date)
        //     // const tester = new Date()
        //     // console.log("test date", tester)
        //     // const test = new Date("Wed Jun 29 2022 00:00:00 GMT-0700")
        //     // console.log("test", test)
        //     // setStartDate(test.toISOString())
        //     // console.log("date", date.toISOString())
        //     // console.log("title", selectedReview.title)
        //     // setReviewTitle(selectedReview.title)
        // } else if (props.urlParams["id"]) { // no review loaded into memory, fetch it
        //     setEditReview(true)
        //     fetchReviewData(props.urlParams["id"]);
        // }  else {   // we are creating a new review
        //     setEditReview(false)
        //     // console.log("edit review", editReview)
        // }
        // console.log("review module opened")
        // props.setSaved(false);
    // }, [])

    // useEffect(() => {
    //     // console.log(startDate)
    // }, [startDate])

    // const ClickToDelete = () => {
    //     props.setDiscardType("delete")
    //     props.setDiscardModal(true)
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
                    {/* <FieldDetailText>Last edited on March 26th, 2022</FieldDetailText> */}
                    <InputTitle>Make Private?</InputTitle>
                    <SwitchContainer>
                        <ToggleSwitch label="label" isPrivate={isPrivate} setIsPrivate={setIsPrivate} setInputHasChanged={setInputHasChanged}/>
                    </SwitchContainer>
                    <VisibilityToggle>{checkPrivate()}</VisibilityToggle>
                    <br/>
                    {/* {editReview && <DeleteReview onClick={() => ClickToDelete()}>Delete this review</DeleteReview>} */}
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