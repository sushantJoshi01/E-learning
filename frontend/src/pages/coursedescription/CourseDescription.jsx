import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [paymentOption, setPaymentOption] = useState("credit-card");

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        { name, paymentOption },
        {
          headers: {
            token,
          },
        }
      );

      await fetchUser();
      await fetchCourses();
      await fetchMyCourse();
      toast.success(data.message);
      setLoading(false);
      navigate(`/course/study/${params.id}`);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
              </div>

              <p>{course.description}</p>

              <p>Let's get started with course At ₹{course.price}</p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                  <select
                    value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value)}
                    className="form-select"
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="net-banking">Net Banking</option>
                  </select>
                  <button onClick={checkoutHandler} className="common-btn">
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
