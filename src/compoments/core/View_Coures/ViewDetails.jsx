import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { markLectureAsCompleted } from '../../../services/operations/courseDetailsAPI';
import ReactPlayer from 'react-player'
import IconBtn from '../../comman/iconBtn';
import { VideoSectionNavbar } from './VideoSectionNavbar';

export const ViewDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const playerRef = useRef(null);
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData, courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);

  // state Variable for video Data4
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState("");

  // /video to be shown on first render
  useEffect(() => {
    const setVideoSpeciificationDetails = async () => {

      console.log("Course Setrion Data in useEffect", courseSectionData);
      // validation of th data
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses")
      } else {
        // /if all the data is present

        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        // console.log("Filter Data", filteredData);
        // subSection
        const filterVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )

        setVideoData(filterVideoData[0]);
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false);
      }
    }
    setVideoSpeciificationDetails();
  }, [courseSectionData, courseEntireData, location.pathname])


  const handleLectureComplition = async () => {
    setLoading(true);
    const res = await markLectureAsCompleted({
      courseId: courseId, subSectionId: subSectionId
    }, token);

    console.log("T");
    // update State
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false);
  }

  // const youtube = {
  //   playerVars: { showinfo: 0 }
  // }
  return (
    <div className='text-white flex flex-col h-full '>
      <div className='w-full h-12'>
        <VideoSectionNavbar
          handleLectureComplete={handleLectureComplition}
          loading={loading}
        />
        <div className='w-full h-[2px] bg-richblack-700 shadow-2xl shadow-white'></div>
      </div>
      {
        !videoData ? (
          <img
            src={previewSource}
            className="h-full w-full rounded-md object-cover"
            alt='Preview'
          />
        ) : (
          <div className='w-[95%] mx-auto border-2 border-richblack-50 shadow-lg shadow-richblack-100 rounded-lg mt-2 '>
            <ReactPlayer url={videoData?.videoUrl} controls={true}  config={{ file: { attributes: { controlsList: 'nodownload' } } }} height="78vh" width="100%" playsinline={true}  />
          </div>
        )
      }

      {/* for now not able to add Rewatch Functionality due to player */}
      {/* <div className='flex justify-end mt-5 ml-4'>
        {
          videoEnded && (
            <IconBtn
              disabled={loading}
              onClick={() => {
                if (playerRef?.current) {
                  // set the current  time to 0
                  playerRef?.current?.onSeek(0);
                  setVideoEnded(false)
                }
              }}

              text="Re-watch"
            />
          )
        }
      </div> */}
      <div className='p-4 ml-4 mt-6 '>
        <h2 className='text-3xl font-semibold text-yellow-50'>{videoData?.title}</h2>
        <p className='pt-2 pb-6'>{videoData?.description}</p>
      </div>
    </div>
  )
}
