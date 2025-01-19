"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const ProfileSection = ({ setActiveTab, activeTab }) => {
  const session = useSession();
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
      image: "/course-web.jpg",
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
      image: "/course-data.jpg",
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
      image: "/course-mobile.jpg",
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
    if (editingContent !== null) {
      const updatedCourses = courses.map((course) => {
        if (course.id === editingCourse.id) {
          const updatedContent = [...course.content];
          updatedContent[editingContent] = newContent;
          return { ...course, content: updatedContent };
        }
        return course;
      });
      setCourses(updatedCourses);
      setEditingContent(null);
    } else {
      const updatedCourses = courses.map((course) => {
        if (course.id === editingCourse.id) {
          return {
            ...course,
            content: [...course.content, newContent],
          };
        }
        return course;
      });
      setCourses(updatedCourses);
    }
    setNewContent("");
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
  console.log(session, 67576576565677);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-white shadow-sm mt-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={session?.data?.user?.image}
            alt="Mentor profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {session?.data?.user?.name}
          </h2>
          <p className="text-gray-600">{mentorProfile.designation}</p>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 ${
              activeTab === "courses"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-4 py-2 ${
              activeTab === "content"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Course Content
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 ${
              activeTab === "users"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("purchases")}
            className={`px-4 py-2 ${
              activeTab === "purchases"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Purchases
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 ${
              activeTab === "settings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSection;
