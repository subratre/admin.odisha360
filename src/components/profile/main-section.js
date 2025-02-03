"use client";
import React, { useEffect, useState } from "react";
import NewTopic from "../topics/NewTopic";
import Courses from "./Courses";

const MainSection = ({ activeTab }) => {
  const [courseContent, setCourseContent] = useState({});
  const [selectedCourseTopic, setSelectedCourseTopic] = useState([]);
  const [courses, setCourses] = useState([
    { id: 1, name: "Web Development" },
    { id: 2, name: "Python" },
    { id: 3, name: "Java Development" },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [editId, setEditId] = useState(null);

  const [topics, setTopics] = useState([]);
  const [topicName, setTopicName] = useState("");

  const handleCoureChange = (evt) => {
    const { name, value } = evt.target;

    setTopicName(value);
  };

  const handleAddContent = () => {
    let newtopic = {};

    newtopic.id = crypto.randomUUID();
    newtopic.name = topicName;
    newtopic.courseId = selectedCourse;

    setTopics((state) => {
      return [...state, newtopic];
    });

    setTopicName("");
  };

  const selecteRelatedCourseTopic = (selectedCourse) => {
    const topicscopy = [...topics];
    console.log(topicscopy, 4657987987);

    if (topicscopy.length && selectedCourse) {
      const individualTopic = topicscopy.filter(
        (ite) => ite.courseId == selectedCourse
      );
      console.log(individualTopic);
      setSelectedCourseTopic(individualTopic);
    }
  };

  useEffect(() => {
    selecteRelatedCourseTopic(selectedCourse);
  }, [selectedCourse, topics]);

  //rename the topic name by this function // edit

  const handleEditTopicName = (id) => {
    console.log(id, 543564654);
    setEditId(id);
    const topicsAll = [...topics];

    const findTopics = topicsAll.find((it) => it.id === id);
    console.log(findTopics, 2343546465);

    setTopicName(findTopics?.name);
  };

  // update the topic name by setEditId

  const handleUpdateHandler = () => {
    const topicsAll = [...topics];

    const findTopics = topicsAll.map((it) =>
      it.id === editId ? { ...it, name: topicName } : it
    );
    setTopics(findTopics);
  };

  // remove the topics by delete function

  const handleDeleteTopic = (id) => {
    const topicsAll = [...topics];
    const newalltopics = topicsAll.filter((it) => it.id !== id);

    setTopics(newalltopics);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {activeTab === "content" ? (
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
                    name="topic"
                    value={topicName}
                    onChange={handleCoureChange}
                  />

                  {editId ? (
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
                      disabled={selectedCourse ? false : true}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
              {console.log(topics)}
              {selectedCourse && (
                <div className="space-y-4">
                  {selectedCourseTopic.length &&
                    selectedCourseTopic.map((topic, index) => (
                      <NewTopic
                        {...topic}
                        index={index}
                        handleEditTopic={handleEditTopicName}
                        handleDeleteTopic={handleDeleteTopic}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : activeTab === "courses" ? (
        <Courses />
      ) : (
        ""
      )}
    </main>
  );
};

export default MainSection;
