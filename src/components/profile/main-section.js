"use client";
import React, { useState } from "react";
import NewTopic from "../topics/NewTopic";

const MainSection = ({ activeTab }) => {
  const [isQAMode, setIsQAMode] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Computer Science",
      description: "Study of computers and computational systems",
      date: "2025-01-10",
    },
    {
      id: 2,
      name: "Mathematics",
      description: "Study of numbers, quantities, and shapes",
      date: "2025-01-15",
    },
  ]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
  });
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    publishDate: new Date().toISOString().split("T")[0],
    image: null,
    subjectId: "",
    isFree: false,
    offerDescription: "",
    content: ["Introduction", "Course Overview", "Getting Started"],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Web Development Fundamentals",
      description:
        "Learn the basics of web development including HTML, CSS, and JavaScript",
      price: 99.99,
      discountedPrice: 79.99,
      image: "/images/one.jpg",
      publishDate: "2025-01-15",
      published: false,
      subjectId: 1,
      isFree: false,
      offerDescription: "Limited time offer - 20% off",
      content: ["Introduction", "Course Overview", "Getting Started"],
      isContentVisible: false,
      moq: "",
      resources: {
        text: [],
        files: [],
        videos: [],
      },
    },
    {
      id: 2,
      name: "Data Science Essentials",
      description:
        "Master the fundamentals of data analysis and machine learning",
      price: 149.99,
      discountedPrice: 129.99,
      image: "/images/two.jpg",
      publishDate: "2025-01-20",
      published: true,
      subjectId: 1,
      isFree: false,
      offerDescription: "Early bird discount - Save ₹20",
      content: ["Introduction", "Course Overview", "Getting Started"],
      isContentVisible: false,
      moq: "",
      resources: {
        text: [],
        files: [],
        videos: [],
      },
    },
    {
      id: 3,
      name: "Mobile App Development",
      description: "Create iOS and Android apps from scratch",
      price: 199.99,
      discountedPrice: 159.99,
      image: "/images/three.jpg",
      publishDate: "2025-02-01",
      published: false,
      subjectId: 1,
      isFree: false,
      offerDescription: "Special launch price",
      content: ["Introduction", "Course Overview", "Getting Started"],
      isContentVisible: false,
      moq: "",
      resources: {
        text: [],
        files: [],
        videos: [],
      },
    },
  ]);
  //   const [upload, { loading }] = useUpload();
  const [editingCourse, setEditingCourse] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const [moqSections, setMoqSections] = useState({});
  const [newContent, setNewContent] = useState("");
  const [editingContent, setEditingContent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    answer: "",
  });
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [mentorProfile, setMentorProfile] = useState({
    name: "John Doe",
    designation: "Senior Computer Science Mentor",
    bio: "",
    image: "/mentor-avatar.jpg",
    linkedin: "",
    twitter: "",
    github: "",
  });
  const [newResource, setNewResource] = useState({
    type: "text",
    title: "",
    content: "",
    file: null,
    videoUrl: "",
  });
  const [topics, setTopics] = useState([]);
  const handleAddResource = async (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    let resourceToAdd = { title: newResource.title };

    if (newResource.type === "text") {
      resourceToAdd.content = newResource.content;
    } else if (newResource.type === "file" && newResource.file) {
      const { url, error } = await upload({ file: newResource.file });
      if (!error) {
        resourceToAdd.url = url;
      }
    } else if (newResource.type === "video") {
      resourceToAdd.url = newResource.videoUrl;
    }

    const updatedCourses = courses.map((c) => {
      if (c.id === courseId) {
        return {
          ...c,
          resources: {
            ...c.resources,
            [newResource.type]: [
              ...c.resources[newResource.type],
              resourceToAdd,
            ],
          },
        };
      }
      return c;
    });

    setCourses(updatedCourses);
    setNewResource({
      type: "text",
      title: "",
      content: "",
      file: null,
      videoUrl: "",
    });
  };
  const handleResourceFileChange = async (e) => {
    if (e.target.files) {
      setNewResource({
        ...newResource,
        file: e.target.files[0],
      });
    }
  };
  const handleDelete = () => {
    if (deleteType === "subject") {
      setSubjects(subjects.filter((subject) => subject.id !== itemToDelete));
    } else if (deleteType === "course") {
      setCourses(courses.filter((course) => course.id !== itemToDelete));
    } else if (deleteType === "content") {
      const updatedCourses = courses.map((course) => {
        if (course.id === editingCourse.id) {
          return {
            ...course,
            content: course.content.filter(
              (_, index) => index !== itemToDelete
            ),
          };
        }
        return course;
      });
      setCourses(updatedCourses);
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
    setDeleteType("");
  };
  const handleDeleteClick = (id, type) => {
    setItemToDelete(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };
  const handleAddSubject = () => {
    const subject = {
      id: subjects.length + 1,
      ...newSubject,
      date: new Date().toISOString().split("T")[0],
    };
    setSubjects([...subjects, subject]);
    setNewSubject({ name: "", description: "" });
    setShowSubjectModal(false);
  };
  const handleImageChange = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const { url, error } = await upload({ file });
      if (!error) {
        setNewCourse({ ...newCourse, image: url });
      }
    }
  };
  const handleProfileImageChange = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const { url, error } = await upload({ file });
      if (!error) {
        setMentorProfile({ ...mentorProfile, image: url });
      }
    }
  };
  const handleProfileChange = (e) => {
    setMentorProfile({ ...mentorProfile, [e.target.name]: e.target.value });
  };
  const handleSaveProfile = () => {
    // Profile save logic would go here
  };
  const handleAddCourse = () => {
    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id ? { ...course, ...newCourse } : course
        )
      );
      setEditingCourse(null);
    } else {
      const course = {
        id: courses.length + 1,
        ...newCourse,
        published: false,
        isContentVisible: false,
        moq: "",
        resources: {
          text: [],
          files: [],
          videos: [],
        },
      };
      setCourses([...courses, course]);
    }
    setNewCourse({
      name: "",
      description: "",
      price: "",
      discountedPrice: "",
      publishDate: new Date().toISOString().split("T")[0],
      image: null,
      subjectId: "",
      isFree: false,
      offerDescription: "",
      content: ["Introduction", "Course Overview", "Getting Started"],
    });
  };
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({
      name: course.name,
      description: course.description,
      price: course.price,
      discountedPrice: course.discountedPrice,
      publishDate: course.publishDate,
      image: course.image,
      subjectId: course.subjectId,
      isFree: course.isFree,
      offerDescription: course.offerDescription,
      content: course.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePublishCourse = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, published: true } : course
      )
    );
  };
  const calculateDiscount = (price, discountedPrice) => {
    if (!price || !discountedPrice) return 0;
    const discount = ((price - discountedPrice) / price) * 100;
    return Math.round(discount);
  };
  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setNewCourse({ ...newCourse, price, discountedPrice: price });
  };
  const handleDiscountedPriceChange = (e) => {
    const discountedPrice = parseFloat(e.target.value);
    setNewCourse({ ...newCourse, discountedPrice });
  };
  const handleFreeChange = (e) => {
    const isFree = e.target.checked;
    setNewCourse({
      ...newCourse,
      isFree,
      price: isFree ? 0 : "",
      discountedPrice: isFree ? 0 : "",
    });
  };
  const handleAddContent = () => {
    console.log(selectedCourse, newContent);
    const newtopics = [...topics];
    let newaddtopics = {};

    newaddtopics = {
      ...newaddtopics,
      id: Math.random().toString(36).substring(2, 9),
      subject: selectedCourse,
      content: newContent,
    };

    newtopics.push(newaddtopics);
    setTopics(newtopics);
    setNewContent("");
    // old code
    // if (editingContent !== null) {
    //   const updatedCourses = courses.map((course) => {
    //     if (course.id === editingCourse.id) {
    //       const updatedContent = [...course.content];
    //       updatedContent[editingContent] = newContent;
    //       return { ...course, content: updatedContent };
    //     }
    //     return course;
    //   });
    //   setCourses(updatedCourses);
    //   setEditingContent(null);
    // } else {
    //   const updatedCourses = courses.map((course) => {
    //     if (course.id === editingCourse.id) {
    //       return {
    //         ...course,
    //         content: [...course.content, newContent],
    //       };
    //     }
    //     return course;
    //   });
    //   setCourses(updatedCourses);
    // }
    // setNewContent("");
  };

  const handleUpdateHandler = () => {
    console.log(editIndex, newContent, 23324357453534);

    const topicsupdate = [...topics];
    const editTopic = topicsupdate.map((item) =>
      item.id === editIndex ? { ...item, content: newContent } : item
    );
    setTopics(editTopic);
  };
  const handleEditContent = (index) => {
    const course = courses.find((c) => c.id === editingCourse.id);
    if (course) {
      setNewContent(course.content[index]);
      setEditingContent(index);
    }
  };
  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const publishedCourses = courses.filter((course) => course.published);
  const unpublishedCourses = courses.filter((course) => !course.published);
  const getSubjectName = (subjectId) => {
    const subject = subjects.find((s) => s.id === Number(subjectId));
    return subject ? subject.name : "Unknown Subject";
  };
  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [moqContent, setMoqContent] = useState("");
  const [moqList, setMoqList] = useState([]);
  const toggleContentVisibility = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, isContentVisible: !course.isContentVisible }
          : course
      )
    );
  };
  const handleMoqChange = (courseId, value) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, moq: value } : course
      )
    );
  };
  const handleAddQuestion = () => {
    if (editingQuestion !== null) {
      setQuestions(
        questions.map((q, i) => (i === editingQuestion ? newQuestion : q))
      );
      setEditingQuestion(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      answer: "",
    });
  };
  const handleEditQuestion = (index) => {
    setEditingQuestion(index);
    setNewQuestion(questions[index]);
  };
  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      enrolledCourses: [1, 2],
      lastActive: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      enrolledCourses: [1],
      lastActive: "2024-01-14",
      status: "inactive",
    },
  ]);
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    message: "",
    type: "email",
    targetAudience: "all",
    courseId: "",
  });
  const [purchases, setPurchases] = useState([
    {
      id: "ORD001",
      courseId: 1,
      studentId: 1,
      amount: 79.99,
      date: "2024-01-15",
      paymentMethod: "credit_card",
      status: "completed",
      transactionId: "TXN001",
      refundStatus: null,
      invoiceUrl: "/invoice-001.pdf",
    },
    {
      id: "ORD002",
      courseId: 2,
      studentId: 2,
      amount: 129.99,
      date: "2024-01-14",
      paymentMethod: "paypal",
      status: "completed",
      transactionId: "TXN002",
      refundStatus: "pending",
      invoiceUrl: "/invoice-002.pdf",
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refundReason, setRefundReason] = useState("");
  const [editIndex, setEditIndex] = useState("");

  const handleEditTopic = (id) => {
    setEditIndex(id);
    let contentnew = topics.find((it) => it.id === id)?.content;
    setNewContent(contentnew);
  };

  const handleDeleteTopic = (id) => {
    let topicscopy = [...topics];
    const removeTopics = topicscopy.filter((item) => item.id !== id);

    setTopics(removeTopics);
  };
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {activeTab === "courses" ? (
        <>
          <div className="mb-8">
            <div className="max-w-7xl mx-auto bg-white shadow-sm mt-4 rounded-lg">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-bold">Add New Subject</h2>
                <button
                  onClick={() => setIsSubjectsExpanded(!isSubjectsExpanded)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i
                    className={`fa fa-chevron-${
                      isSubjectsExpanded ? "up" : "down"
                    }`}
                  ></i>
                </button>
              </div>
              {isSubjectsExpanded && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      className="w-full p-2 border rounded"
                      value={newSubject.name}
                      onChange={(e) =>
                        setNewSubject({
                          ...newSubject,
                          name: e.target.value,
                        })
                      }
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Subject Description"
                        className="w-full p-2 border rounded"
                        value={newSubject.description}
                        onChange={(e) =>
                          setNewSubject({
                            ...newSubject,
                            description: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={handleAddSubject}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center gap-2"
                      >
                        <i className="fa fa-plus-circle"></i>
                        Add Subject
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mb-4 mt-8">
              <h2 className="text-2xl font-bold">Subjects</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    className="pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setIsSubjectsExpanded(!isSubjectsExpanded)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i
                    className={`fa fa-chevron-${
                      isSubjectsExpanded ? "up" : "down"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            {isSubjectsExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold mb-2">
                        {subject.name}
                      </h3>
                      <button
                        onClick={() => handleDeleteClick(subject.id, "subject")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">{subject.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Added: {subject.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                  <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                  <p className="mb-6">
                    Are you sure you want to delete this {deleteType}?
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mb-8">
            <div className="max-w-7xl mx-auto bg-white shadow-sm mt-4 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Add New Course</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Course Name"
                  className="w-full p-2 border rounded"
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, name: e.target.value })
                  }
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                  />
                  {newCourse.image && (
                    <img
                      src={newCourse.image}
                      alt="Course preview"
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </div>
                <textarea
                  name="description"
                  placeholder="Course Description"
                  className="w-full p-2 border rounded"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
                <textarea
                  name="offerDescription"
                  placeholder="Offer Description"
                  className="w-full p-2 border rounded"
                  value={newCourse.offerDescription}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      offerDescription: e.target.value,
                    })
                  }
                  rows={3}
                />
                <div className="flex flex-col">
                  <input
                    type="date"
                    name="publishDate"
                    className="w-full p-2 border rounded"
                    value={newCourse.publishDate}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        publishDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      className="w-full p-2 border rounded"
                      value={newCourse.price}
                      onChange={handlePriceChange}
                      disabled={newCourse.isFree}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      name="discountedPrice"
                      placeholder="Discounted Price"
                      className="w-full p-2 border rounded"
                      value={newCourse.discountedPrice}
                      onChange={handleDiscountedPriceChange}
                      disabled={newCourse.isFree}
                    />
                  </div>
                  {newCourse.price && newCourse.discountedPrice && (
                    <span className="text-sm text-green-600 mt-2">
                      {calculateDiscount(
                        newCourse.price,
                        newCourse.discountedPrice
                      )}
                      % off
                    </span>
                  )}
                </div>
                <select
                  name="subjectId"
                  className="w-full p-2 border rounded"
                  value={newCourse.subjectId}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      subjectId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={newCourse.isFree}
                      onChange={handleFreeChange}
                      className="w-4 h-4"
                    />
                    <label>Free Course</label>
                  </div>
                  <button
                    onClick={handleAddCourse}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
                  >
                    <i className="fa fa-plus-circle"></i>
                    {editingCourse ? "Update Course" : "Add Course"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Published Courses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <i className="fa fa-edit text-gray-600"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course.id, "course")}
                      className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <i className="fa fa-trash text-red-500"></i>
                    </button>
                  </div>
                  <img
                    src={course.image}
                    alt={`Cover image for ${course.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {course.name}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {getSubjectName(course.subjectId)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-400 line-through">
                        ₹{course.price}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{course.discountedPrice}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                        {calculateDiscount(
                          course.price,
                          course.discountedPrice
                        )}
                        % off
                      </span>
                    </div>
                    {course.offerDescription && (
                      <p className="text-orange-600 text-sm mb-4">
                        🏷️ {course.offerDescription}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Published:{" "}
                        {new Date(course.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Unpublished Courses</h2>
                <button
                  onClick={() =>
                    unpublishedCourses.forEach((course) =>
                      handlePublishCourse(course.id)
                    )
                  }
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center gap-2"
                >
                  <i className="fa fa-globe"></i>
                  Publish All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unpublishedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <i className="fa fa-edit text-gray-600"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course.id, "course")}
                      className="p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <i className="fa fa-trash text-red-500"></i>
                    </button>
                  </div>
                  <img
                    src={course.image}
                    alt={`Cover image for ${course.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {course.name}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {getSubjectName(course.subjectId)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-400 line-through">
                        ₹{course.price}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{course.discountedPrice}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                        {calculateDiscount(
                          course.price,
                          course.discountedPrice
                        )}
                        % off
                      </span>
                    </div>
                    {course.offerDescription && (
                      <p className="text-orange-600 text-sm mb-4">
                        🏷️ {course.offerDescription}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Created:{" "}
                        {new Date(course.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handlePublishCourse(course.id)}
                        className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
                      >
                        <i className="fa fa-globe"></i>
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : activeTab === "content" ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Course Content</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex gap-4 mb-4">
                <select
                  className="w-1/3 p-2 border rounded"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    placeholder="Add new content item..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                  {console.log(editIndex)}
                  {editIndex ? (
                    <button
                      onClick={handleUpdateHandler}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={handleAddContent}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>

              {selectedCourse && (
                <div className="space-y-4">
                  {topics.map((topic, index) => (
                    <NewTopic
                      title={topic.content}
                      courseId={topic.selectedCourse}
                      index={index}
                      handleEditTopic={handleEditTopic}
                      handleDeleteTopic={handleDeleteTopic}
                      id={topic.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : activeTab === "settings" ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                {mentorProfile.image ? (
                  <img
                    src={
                      "https://avatars.githubusercontent.com/u/9919?s=280&v=4"
                    }
                    alt="Mentor profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fa fa-user text-4xl text-gray-400"></i>
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                  id="profile-image"
                />
                <label
                  htmlFor="profile-image"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Change Photo
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={mentorProfile.name}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={mentorProfile.designation}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                placeholder="Your role or title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={mentorProfile.bio}
                onChange={handleProfileChange}
                rows={4}
                className="w-full p-2 border rounded"
                placeholder="Tell us about yourself"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Links
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <i className="fa fa-linkedin text-blue-600"></i>
                  <input
                    type="url"
                    name="linkedin"
                    value={mentorProfile.linkedin}
                    onChange={handleProfileChange}
                    className="flex-1 p-2 border rounded"
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa fa-twitter text-blue-400"></i>
                  <input
                    type="url"
                    name="twitter"
                    value={mentorProfile.twitter}
                    onChange={handleProfileChange}
                    className="flex-1 p-2 border rounded"
                    placeholder="Twitter URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa fa-github text-gray-800"></i>
                  <input
                    type="url"
                    name="github"
                    value={mentorProfile.github}
                    onChange={handleProfileChange}
                    className="flex-1 p-2 border rounded"
                    placeholder="GitHub URL"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === "users" ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Courses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap group relative">
                        <div className="flex items-center gap-2 cursor-pointer">
                          <span>{student.enrolledCourses.length} courses</span>
                          <i className="fa fa-info-circle text-gray-400"></i>
                          <div className="invisible group-hover:visible absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-10 w-64">
                            <h4 className="font-semibold mb-2">
                              Enrolled Courses:
                            </h4>
                            <ul className="space-y-1">
                              {student.enrolledCourses.map((courseId) => {
                                const course = courses.find(
                                  (c) => c.id === courseId
                                );
                                return (
                                  <li
                                    key={courseId}
                                    className="text-sm text-gray-600"
                                  >
                                    {course ? course.name : "Unknown Course"}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            student.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Campaign Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Campaign Title"
                  className="w-full p-2 border rounded"
                  value={newCampaign.title}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      title: e.target.value,
                    })
                  }
                />
                <select
                  className="w-full p-2 border rounded"
                  value={newCampaign.type}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, type: e.target.value })
                  }
                >
                  <option value="email">Email</option>
                  <option value="notification">In-App Notification</option>
                </select>
                <textarea
                  placeholder="Message"
                  className="w-full p-2 border rounded md:col-span-2"
                  rows={4}
                  value={newCampaign.message}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      message: e.target.value,
                    })
                  }
                />
                <select
                  className="w-full p-2 border rounded"
                  value={newCampaign.targetAudience}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      targetAudience: e.target.value,
                    })
                  }
                >
                  <option value="all">All Students</option>
                  <option value="active">Active Students</option>
                  <option value="inactive">Inactive Students</option>
                </select>
                <select
                  className="w-full p-2 border rounded"
                  value={newCampaign.courseId}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      courseId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Course (Optional)</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <button className="md:col-span-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                  Send Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "purchases" ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Purchase Management</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {purchase.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {courses.find((c) => c.id === purchase.courseId)
                          ?.name || "Unknown Course"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${purchase.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {purchase.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            purchase.refundStatus
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {purchase.refundStatus || purchase.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedOrder(purchase)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Details
                        </button>
                        <a
                          href={purchase.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedOrder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Order Details</h3>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-medium">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transaction ID</p>
                      <p className="font-medium">
                        {selectedOrder.transactionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium capitalize">
                        {selectedOrder.paymentMethod.replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium">${selectedOrder.amount}</p>
                    </div>
                  </div>

                  {!selectedOrder.refundStatus && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Request Refund</h4>
                      <textarea
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                        placeholder="Enter reason for refund..."
                        className="w-full p-2 border rounded mb-4"
                        rows={3}
                      />
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                          const updatedPurchases = purchases.map((p) =>
                            p.id === selectedOrder.id
                              ? { ...p, refundStatus: "pending" }
                              : p
                          );
                          setPurchases(updatedPurchases);
                          setRefundReason("");
                          setSelectedOrder(null);
                        }}
                      >
                        Submit Refund Request
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default MainSection;
